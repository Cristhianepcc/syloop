import { createSeededRandom } from '../lib/seededRandom';

const rand = createSeededRandom(42);

const DAYS_SINCE_DEMANDA = 108;

export const progressBars: number[] = Array.from({ length: DAYS_SINCE_DEMANDA }, (_, i) => {
  const base = 18 + (i / DAYS_SINCE_DEMANDA) * 55;
  const noise = rand() * 30;
  return Math.max(4, Math.min(100, Math.round(base + noise - 15)));
});

export const courtAverageCurve: number[] = Array.from({ length: DAYS_SINCE_DEMANDA }, (_, i) => {
  return Math.round(22 + (i / DAYS_SINCE_DEMANDA) * 40);
});

export const currentProgressPercent = 42;
