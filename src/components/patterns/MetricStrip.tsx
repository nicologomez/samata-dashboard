import type { Metric, Period } from "@/types/common";
import { MetricCard } from "./MetricCard";
import styles from "./MetricStrip.module.css";

type Props = {
  metrics: readonly Metric[];
  period?: Period;
  comparisonLabel?: string;
  className?: string;
};

/** Responsive 3-column grid of MetricCard instances reusable across pages and portals. */
export function MetricStrip({
  metrics,
  period,
  comparisonLabel,
  className = "",
}: Props) {
  return (
    <div className={`${styles.strip} ${className}`}>
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          period={period}
          comparisonLabel={comparisonLabel}
        />
      ))}
    </div>
  );
}
