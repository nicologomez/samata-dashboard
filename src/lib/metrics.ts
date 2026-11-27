import type { Metric } from "@/types/common";

export function formatMetric(metric: Metric): string {
  if (metric.displayValue !== undefined) return metric.displayValue;
  return `${metric.value.toLocaleString("en-US")}${metric.unit ?? ""}`;
}

export function formatChange(change?: number): string {
  if (change === undefined) return "";
  return `${Math.abs(change).toLocaleString("en-US")}%`;
}
