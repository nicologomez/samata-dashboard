import type { Metric, Period } from "@/types/dashboard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatChange, formatMetric } from "@/lib/metrics";
import styles from "./MetricCard.module.css";

type Props = { metric: Metric; period: Period };
export function MetricCard({ metric, period }: Props) {
  const comparison = `vs previous ${period === "daily" ? "day" : period === "weekly" ? "week" : "month"}`;
  return (
    <Card className={styles.metric}>
      <div className={styles.top}>
        <h3>{metric.label}</h3>
        <div className={styles.valueGroup}>
          <strong>{formatMetric(metric)}</strong>
          {metric.change !== undefined && (
            <div className={styles.comparison}>
              <Badge tone={metric.tone === "negative" ? "error" : "success"}>
                {formatChange(metric.change)}{" "}
                {metric.tone === "negative" ? "↘" : "↗"}
              </Badge>
              <span>{comparison}</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        {metric.progress !== undefined && (
          <ProgressBar
            label={`${metric.label} enrollment progress`}
            value={metric.progress}
          />
        )}
        <small>{metric.note}</small>
      </div>
    </Card>
  );
}
