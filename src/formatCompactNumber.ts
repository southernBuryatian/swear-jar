const UNITS = [
  { threshold: 1_000_000_000_000, suffix: 'Tril' },
  { threshold: 1_000_000_000, suffix: 'Bil' },
  { threshold: 1_000_000, suffix: 'M' },
  { threshold: 1_000, suffix: 'k' },
] as const;

function trimTrailingZeros(value: string) {
  return value.replace(/\.0+$/, '').replace(/(\.[0-9]*?)0+$/, '$1');
}

export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return '0';
  }

  const abs = Math.abs(value);
  if (abs < 1_000) {
    return String(Math.floor(value));
  }

  for (const { threshold, suffix } of UNITS) {
    if (abs >= threshold) {
      const scaled = value / threshold;
      const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
      const formatted = trimTrailingZeros(scaled.toFixed(digits));
      return `${formatted}${suffix}`;
    }
  }

  return String(Math.floor(value));
}
