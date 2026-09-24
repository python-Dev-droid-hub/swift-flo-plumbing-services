import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
const bak = path.join(dir, "swift-flo-logo.original.webp");
const src = path.join(dir, "swift-flo-logo.webp");
const input = fs.existsSync(bak) ? bak : src;

async function makeTransparent(inputPath, outputPath, size) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const px = Buffer.from(data);
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const radius = Math.min(width, height) / 2 - 1;
  const n = width * height;

  const isPaleAt = (i) => {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    return Math.min(r, g, b) >= 205 && sat < 28;
  };

  const isInk = new Uint8Array(n);
  for (let idx = 0; idx < n; idx++) {
    const i = idx * channels;
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    if (lum < 200 || sat > 28) isInk[idx] = 1;
  }

  // Chamfer distance to ink
  const dist = new Float32Array(n);
  const INF = 1e6;
  for (let i = 0; i < n; i++) dist[i] = isInk[i] ? 0 : INF;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (dist[idx] === 0) continue;
      let d = dist[idx];
      if (x > 0) d = Math.min(d, dist[idx - 1] + 1);
      if (y > 0) d = Math.min(d, dist[idx - width] + 1);
      if (x > 0 && y > 0) d = Math.min(d, dist[idx - width - 1] + 1.414);
      if (x < width - 1 && y > 0) d = Math.min(d, dist[idx - width + 1] + 1.414);
      dist[idx] = d;
    }
  }
  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const idx = y * width + x;
      if (dist[idx] === 0) continue;
      let d = dist[idx];
      if (x < width - 1) d = Math.min(d, dist[idx + 1] + 1);
      if (y < height - 1) d = Math.min(d, dist[idx + width] + 1);
      if (x < width - 1 && y < height - 1)
        d = Math.min(d, dist[idx + width + 1] + 1.414);
      if (x > 0 && y < height - 1)
        d = Math.min(d, dist[idx + width - 1] + 1.414);
      dist[idx] = d;
    }
  }

  // Seed threshold: deeper than half a bold glyph stroke
  const seedDist = Math.max(14, size * 0.022);

  const bg = new Uint8Array(n); // 1 = punch transparent
  const queue = new Int32Array(n);
  let qh = 0;
  let qt = 0;

  const enqueue = (idx) => {
    if (bg[idx]) return;
    bg[idx] = 1;
    queue[qt++] = idx;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const dx = x - cx;
      const dy = y - cy;
      const outside = Math.sqrt(dx * dx + dy * dy) > radius;
      const i = idx * channels;
      if (outside) {
        enqueue(idx);
      } else if (isPaleAt(i) && dist[idx] >= seedDist) {
        // Centers of open white fill (not letter interiors)
        enqueue(idx);
      }
    }
  }

  while (qh < qt) {
    const idx = queue[qh++];
    const x = idx % width;
    const y = (idx / width) | 0;
    for (let oy = -1; oy <= 1; oy++) {
      for (let ox = -1; ox <= 1; ox++) {
        if (ox === 0 && oy === 0) continue;
        const nx = x + ox;
        const ny = y + oy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const nidx = ny * width + nx;
        if (bg[nidx]) continue;
        const ni = nidx * channels;
        const ndx = nx - cx;
        const ndy = ny - cy;
        const outside = Math.sqrt(ndx * ndx + ndy * ndy) > radius;
        if (outside || isPaleAt(ni)) enqueue(nidx);
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const i = idx * channels;
      if (bg[idx]) {
        px[i + 3] = 0;
        continue;
      }
      // Soft edge on pale pixels touching punched area
      if (isPaleAt(i)) {
        let touch = false;
        for (let oy = -1; oy <= 1 && !touch; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const nx = x + ox;
            const ny = y + oy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            if (bg[ny * width + nx]) touch = true;
          }
        }
        px[i + 3] = touch ? 140 : 255;
      } else {
        px[i + 3] = 255;
      }
    }
  }

  const pngPath = outputPath.replace(/\.webp$/i, ".png");
  await sharp(px, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(pngPath);

  await sharp(px, { raw: { width, height, channels: 4 } })
    .webp({ quality: 95, alphaQuality: 100 })
    .toFile(outputPath);

  console.log("Wrote", path.basename(pngPath), "+", path.basename(outputPath), `(${size}px)`);
}

if (!fs.existsSync(bak) && fs.existsSync(src)) {
  fs.copyFileSync(src, bak);
}

await makeTransparent(input, path.join(dir, "swift-flo-logo.webp"), 1024);
await makeTransparent(input, path.join(dir, "swift-flo-logo-mark.webp"), 256);
await makeTransparent(input, path.join(dir, "swift-flo-logo-hero.webp"), 1200);

// Stats on primary PNG
const { data, info } = await sharp(path.join(dir, "swift-flo-logo.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let opaque = 0;
let transparent = 0;
let whiteOpaque = 0;
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] < 16) transparent++;
  else {
    opaque++;
    if (data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230) whiteOpaque++;
  }
}
console.log({ opaque, transparent, whiteOpaque, size: info.width });
console.log("done");
