import type { Metric, Period, TrendPoint } from "@/types/common";

export function getTrendForPeriod(
  trendsByPeriod: Record<Period, readonly TrendPoint[]>,
  period: Period,
): readonly TrendPoint[] {
  return trendsByPeriod[period];
}

export function getMetricsForPeriod(
  metricsByPeriod: Record<Period, readonly Metric[]>,
  period: Period,
): readonly Metric[] {
  return metricsByPeriod[period];
}

export function maxSeriesValue<T extends object>(
  points: readonly T[],
  keys: readonly (keyof T & string)[],
): number {
  return Math.max(
    1,
    ...points.flatMap((point) => keys.map((key) => Number(point[key]) || 0)),
  );
}

export function maxTrendValue(points: readonly TrendPoint[]): number {
  return maxSeriesValue(points, ["participants", "sessions"]);
}
