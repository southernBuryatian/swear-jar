const BASE_DROP_GAP_MS = 3_500;
const MIN_DROP_GAP_MS = 450;
const BASE_FALL_DURATION_MS = 2_200;
const MIN_FALL_DURATION_MS = 700;

export function getLeakDropGapMs(leakCount: number) {
  return Math.max(MIN_DROP_GAP_MS, BASE_DROP_GAP_MS / leakCount);
}

export function getLeakFallDurationMs(leakCount: number) {
  return Math.max(
    MIN_FALL_DURATION_MS,
    BASE_FALL_DURATION_MS / Math.sqrt(leakCount),
  );
}

export function randomLeakDropX() {
  return 12 + Math.random() * 76;
}
