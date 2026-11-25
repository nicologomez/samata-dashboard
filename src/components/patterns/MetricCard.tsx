import type { Metric, Period } from "@/types/common";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatChange, formatMetric } from "@/lib/metrics";
import styles from "./MetricCard.module.css";

const periodUnit: Record<Period, string> = {
  daily: "day",
  weekly: "week",
  monthly: "month",
};

type Props = {
  metric: Metric;
  period?: Period;
  comparisonLabel?: string;
};

/** Reusable KPI card composing Card, Badge, Icon, and ProgressBar. */
export function MetricCard({ metric, period, comparisonLabel }: Props) {
  const comparison =
    comparisonLabel ?? (period ? `vs previous ${periodUnit[period]}` : undefined);

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
              <Pill
                variant="action"
                tone={metric.tone === "negative" ? "error" : "success"}
                showLeftIcon={false}
                showRightIcon
                rightIcon={
                  metric.tone === "negative"
                    ? "arrow-down-right"
                    : "arrow-up-right"
                }
              >
                {formatChange(metric.change)}
              </Pill>
              {comparison && (
                <span className="type-paragraph-xsmall">{comparison}</span>
              )}
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
