import type { SessionUtilizationPoint } from "@/types/employerAnalytics";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./SessionUtilization.module.css";

type Props = {
  currentMonthLabel: string;
  sessionsUsed: number;
  planAllocated: number;
  monthly: readonly SessionUtilizationPoint[];
};

const yTicks = [300, 240, 180, 120, 60, 0] as const;

/** Monthly session utilization bar chart compared against plan allocation. */
export function SessionUtilization({
  currentMonthLabel,
  sessionsUsed,
  planAllocated,
  monthly,
}: Props) {
  const maxAllocated = Math.max(
    1,
    planAllocated,
    ...monthly.map((item) => item.allocated),
  );

  return (
    <section
      aria-labelledby="utilization-heading"
      className={styles.section}
    >
      <SectionHeader
        id="utilization-heading"
        icon="bar-chart"
        title="Session Utilization"
      />

      <Card surface="default" elevation="sm" className={styles.card}>
        <div className={styles.summary}>
          <div className={styles.currentMonth}>
            <span className="type-paragraph-small">Current Month</span>
            <strong className="type-heading-h7">{currentMonthLabel}</strong>
          </div>

          <div className={styles.statItem}>
            <span className="type-label-medium-medium">
              <Icon name="dot" size={8} className={styles.usedDot} /> Sessions
              Used
            </span>
            <strong className="type-heading-alt-medium-h4">
              {sessionsUsed}
            </strong>
          </div>

          <div className={styles.statItem}>
            <span className="type-label-medium-medium">
              <Icon name="dot" size={8} className={styles.allocatedDot} /> Plan
              Allocated
            </span>
            <strong className="type-heading-alt-medium-h4">
              {planAllocated}
            </strong>
          </div>
        </div>

        <div className={styles.chartArea}>
          <div className={styles.plotWithY}>
            <div className={styles.gridlines} aria-hidden="true">
              {yTicks.map((tick) => (
                <div className={styles.gridRow} key={tick}>
                  <span className="type-paragraph-xsmall">{tick}</span>
                  <div className={styles.gridLine} />
                </div>
              ))}
            </div>

            <div
              className={styles.bars}
              role="img"
              aria-label="Monthly sessions used versus allocated plan capacity"
            >
              {monthly.map((item) => {
                const usedPct = Math.min(
                  100,
                  Math.round((item.used / maxAllocated) * 100),
                );
                const allocatedPct = Math.min(
                  100,
                  Math.round((item.allocated / maxAllocated) * 100),
                );

                return (
                  <div className={styles.barCol} key={item.month}>
                    <div className={styles.trackWrap}>
                      <div
                        className={styles.trackBar}
                        style={{ height: `${allocatedPct}%` }}
                      >
                        <div
                          className={styles.usedBar}
                          style={{ height: `${usedPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.xLabels}>
            {monthly.map((item) => (
              <span
                key={item.month}
                className="type-paragraph-xsmall"
              >
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
