import type { Metric } from "@/types/common";
import { formatChange, formatMetric } from "@/lib/metrics";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import styles from "./MetricWideBlock.module.css";

type Props = {
  heading: string;
  subtitle?: string;
  metrics: readonly Metric[];
};

/** Wide 4-column KPI summary banner composing Card, Badge, and Icon. */
export function MetricWideBlock({ heading, subtitle, metrics }: Props) {
  return (
    <Card surface="gradient" elevation="sm" className={styles.block}>
      <div className={styles.header}>
        <h3 className="type-heading-h5">{heading}</h3>
        {subtitle && (
          <p className={`${styles.subtitle} type-paragraph-xsmall`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className={styles.columns}>
        {metrics.map((metric) => (
          <div className={styles.column} key={metric.id}>
            <span className={`${styles.label} type-paragraph-small`}>
              {metric.label}
            </span>
            <div className={styles.bottom}>
              <div className={styles.valueRow}>
                <strong className="type-heading-alt-medium-h3">
                  {formatMetric(metric)}
                </strong>
                {metric.change !== undefined && (
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
                )}
              </div>
              <small className="type-paragraph-xsmall">{metric.note}</small>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
