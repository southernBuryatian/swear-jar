const MIN_SWEAR_INTERVAL_MS = 1_200;
const BASE_SWEAR_INTERVAL_MS = 15_000;

export function getRandomSwearDelayMs(coinsPerSecond: number) {
  const scaled = BASE_SWEAR_INTERVAL_MS / coinsPerSecond;
  const jitter = 0.6 + Math.random() * 0.8;

  return Math.max(MIN_SWEAR_INTERVAL_MS, scaled * jitter);
}

export function pickRandomSwearLine(lines: readonly string[]) {
  return lines[Math.floor(Math.random() * lines.length)];
}
