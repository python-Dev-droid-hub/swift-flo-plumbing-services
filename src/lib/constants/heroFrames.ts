/** Droplet stills in public/frames. 66, 69, and 70 were never exported. */
const MISSING_FRAMES = new Set([66, 69, 70]);

export const HERO_FRAME_SRCS: readonly string[] = Array.from(
  { length: 73 },
  (_, index) => index + 1,
)
  .filter((frame) => !MISSING_FRAMES.has(frame))
  .map(
    (frame) =>
      `/frames/frame_${String(frame).padStart(3, "0")}.jpg`,
  );

export const HERO_FRAME_POSTER = HERO_FRAME_SRCS[0];
