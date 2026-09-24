"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { HERO_FRAME_SRCS } from "@/lib/constants/heroFrames";

const DECODE_WINDOW = 12;
const MAX_DPR = 2;

export type HeroFramesHandle = {
  setProgress: (progress: number) => void;
  snapProgress: (progress: number) => void;
};

/**
 * Scroll-scrubbed droplet sequence. Decodes a small window of frames
 * around the playhead and draws them cover-fit on a canvas.
 */
export const HeroFrames = forwardRef<HeroFramesHandle>(function HeroFrames(
  _,
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seekRef = useRef<(progress: number) => void>(() => {});
  const pendingRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setProgress: (progress) => {
      pendingRef.current = progress;
      seekRef.current(progress);
    },
    snapProgress: (progress) => {
      pendingRef.current = progress;
      seekRef.current(progress);
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const bitmaps = new Map<number, ImageBitmap>();
    const inflight = new Map<number, AbortController>();
    let currentIndex = -1;
    let targetIndex = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const drawIndex = (index: number) => {
      const bitmap = bitmaps.get(index);
      if (!bitmap || width <= 0 || height <= 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const scale = Math.max(width / bitmap.width, height / bitmap.height);
      const dw = bitmap.width * scale;
      const dh = bitmap.height * scale;
      ctx.drawImage(bitmap, (width - dw) / 2, (height - dh) / 2, dw, dh);
      currentIndex = index;
    };

    const drawClosest = (index: number) => {
      let closest = -1;
      let best = Number.POSITIVE_INFINITY;
      for (const key of bitmaps.keys()) {
        const distance = Math.abs(key - index);
        if (distance < best) {
          best = distance;
          closest = key;
        }
      }
      if (closest >= 0) drawIndex(closest);
    };

    const evictOutside = (center: number) => {
      const keepFrom = Math.max(0, center - DECODE_WINDOW);
      const keepTo = Math.min(HERO_FRAME_SRCS.length - 1, center + DECODE_WINDOW);

      for (const [index, bitmap] of bitmaps) {
        if (index < keepFrom || index > keepTo) {
          bitmap.close();
          bitmaps.delete(index);
        }
      }

      for (const [index, controller] of inflight) {
        if (index < keepFrom || index > keepTo) {
          controller.abort();
          inflight.delete(index);
        }
      }
    };

    const ensure = (index: number) => {
      if (
        index < 0 ||
        index >= HERO_FRAME_SRCS.length ||
        bitmaps.has(index) ||
        inflight.has(index)
      ) {
        return;
      }

      const controller = new AbortController();
      inflight.set(index, controller);
      const src = HERO_FRAME_SRCS[index];

      void (async () => {
        try {
          const response = await fetch(src, { signal: controller.signal });
          if (!response.ok) throw new Error(`Frame ${index} failed`);
          const blob = await response.blob();
          if (controller.signal.aborted) return;
          const bitmap = await createImageBitmap(blob);
          if (controller.signal.aborted) {
            bitmap.close();
            return;
          }
          inflight.delete(index);
          bitmaps.set(index, bitmap);
          if (targetIndex === index) drawIndex(index);
        } catch {
          inflight.delete(index);
        }
      })();
    };

    const warm = (center: number) => {
      evictOutside(center);
      const from = Math.max(0, center - 2);
      const to = Math.min(HERO_FRAME_SRCS.length - 1, center + DECODE_WINDOW);
      for (let index = from; index <= to; index += 1) ensure(index);
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      currentIndex = -1;
      if (bitmaps.has(targetIndex)) drawIndex(targetIndex);
      else drawClosest(targetIndex);
    };

    seekRef.current = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const index = Math.round(clamped * (HERO_FRAME_SRCS.length - 1));
      const changed = index !== targetIndex;
      targetIndex = index;

      if (bitmaps.has(index)) {
        if (currentIndex !== index) drawIndex(index);
      } else {
        drawClosest(index);
        ensure(index);
      }

      if (changed) warm(index);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    seekRef.current(pendingRef.current);

    return () => {
      seekRef.current = () => {};
      observer.disconnect();
      inflight.forEach((controller) => controller.abort());
      inflight.clear();
      bitmaps.forEach((bitmap) => bitmap.close());
      bitmaps.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
});
