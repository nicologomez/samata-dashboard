import type {
  DashboardData,
  Metric,
  Period,
  TrendPoint,
} from "@/types/dashboard";

export function getTrendForPeriod(
  data: DashboardData,
  period: Period,
): readonly TrendPoint[] {
  return data.trendsByPeriod[period];
}

export function getMetricsForPeriod(
  data: DashboardData,
  period: Period,
): readonly Metric[] {
  return data.metricsByPeriod[period];
}

export function maxTrendValue(points: readonly TrendPoint[]): number {
  return Math.max(
    1,
    ...points.flatMap((point) => [point.participants, point.sessions]),
  );
}
