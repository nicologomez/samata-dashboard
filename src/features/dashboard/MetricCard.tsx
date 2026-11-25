import type { Metric, Period } from "@/types/dashboard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatChange, formatMetric } from "@/lib/metrics";
import styles from "./MetricCard.module.css";

type Props = { metric: Metric; period: Period };
export function MetricCard({ metric, period }: Props) {
  const comparison = `vs previous ${period === "daily" ? "day" : period === "weekly" ? "week" : "month"}`;
  return (
    <Card surface="gradient" elevation="sm" className={styles.metric}>
      <div className={styles.top}>
        <h3 className="type-paragraph-medium">{metric.label}</h3>
        <div className={styles.valueGroup}>
          <strong className="type-heading-alt-medium-h1">
            {formatMetric(metric)}
          </strong>
          {metric.change !== undefined && (
            <div className={styles.comparison}>
              <Badge tone={metric.tone === "negative" ? "error" : "success"}>
                {formatChange(metric.change)}{" "}
                <Icon
                  name={
                    metric.tone === "negative"
                      ? "arrow-down-right"
                      : "arrow-up-right"
                  }
                  size={16}
                />
              </Badge>
              <span className="type-paragraph-xsmall">{comparison}</span>
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
        <small className="type-paragraph-small">{metric.note}</small>
      </div>
    </Card>
  );
}
