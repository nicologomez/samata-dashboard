"use client";

import { useMemo, useState } from "react";
import type {
  SpendTrendData,
  SpendTrendRange,
} from "@/types/employerBilling";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import styles from "./SpendTrendSection.module.css";

type Props = {
  data: SpendTrendData;
};

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

/** Interactive monthly billing vs. budget limit column chart for /billing. */
export function SpendTrendSection({ data }: Props) {
  const [range, setRange] = useState<SpendTrendRange>("12m");

  const visiblePoints = useMemo(
    () => (range === "6m" ? data.points.slice(-6) : data.points),
    [data.points, range],
  );

  const scaleSpan = Math.max(1, data.maxScale - data.minScale);

  return (
    <section
      aria-labelledby="spend-trend-heading"
      className={styles.section}
    >
      <SectionHeader
        id="spend-trend-heading"
        icon="bar-chart"
        title="Spend Trend"
      />

      <div className={styles.canvas}>
        <div className={styles.topRow}>
          <div className={styles.legends}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendLabel} type-label-medium-medium`}>
                <Icon name="dot" size={8} className={styles.billingDot} />
                {data.monthlyBillingLabel}
              </span>
              <strong
                className={`${styles.legendValue} type-heading-alt-medium-h4`}
              >
                {data.monthlyBillingAmount}
              </strong>
            </div>

            <div className={styles.legendItem}>
              <span className={`${styles.legendLabel} type-label-medium-medium`}>
                <Icon name="dot" size={8} className={styles.budgetDot} />
                {data.budgetLimitLabel}
              </span>
              <strong
                className={`${styles.legendValue} type-heading-alt-medium-h4`}
              >
                {data.budgetLimitAmount}
              </strong>
            </div>
          </div>

          <Select
            label="Spend trend period"
            variant="pill"
            value={range}
            options={data.rangeOptions}
            onChange={(value) => setRange(value as SpendTrendRange)}
          />
        </div>

        <div className={styles.chartArea}>
          <div className={styles.plotWithY}>
            <div className={styles.gridlines} aria-hidden="true">
              {data.yTicks.map((tick) => (
                <div key={tick} className={styles.gridRow}>
                  <span className="type-paragraph-xsmall">
                    {formatCurrency(tick)}
                  </span>
                  <div className={styles.gridLine} />
                </div>
              ))}
            </div>

            <div
              className={styles.bars}
              role="img"
              aria-label="Monthly billing spend versus budget limit bar chart"
              style={{
                gridTemplateColumns: `repeat(${visiblePoints.length}, minmax(0, 1fr))`,
              }}
            >
              {visiblePoints.map((point) => {
                const trackPct = Math.max(
                  10,
                  Math.min(
                    100,
                    Math.round(((point.budget - data.minScale) / scaleSpan) * 100),
                  ),
                );
                const spendPct = Math.max(
                  8,
                  Math.min(
                    100,
                    Math.round(((point.spend - data.minScale) / scaleSpan) * 100),
                  ),
                );
                const innerRatio = Math.min(
                  100,
                  Math.round((spendPct / trackPct) * 100),
                );

                return (
                  <div
                    key={point.month}
                    className={styles.barCol}
                    title={`${point.month}: Spend ${formatCurrency(point.spend)} · Budget ${formatCurrency(point.budget)}`}
                  >
                    <div className={styles.trackWrap}>
                      <div
                        className={styles.trackBar}
                        style={{ height: `${trackPct}%` }}
                      >
                        <div
                          className={styles.spendBar}
                          style={{ height: `${innerRatio}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={styles.xLabels}
            style={{
              gridTemplateColumns: `repeat(${visiblePoints.length}, minmax(0, 1fr))`,
            }}
          >
            {visiblePoints.map((point) => (
              <span key={point.month} className="type-paragraph-xsmall">
                {point.month}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.bottomMetrics}>
          {data.bottomStats.map((stat) => (
            <div key={stat.label} className={styles.bottomItem}>
              <span className={`${styles.bottomLabel} type-label-medium-small`}>
                {stat.label}
              </span>
              <strong
                className={`${styles.bottomValue} type-heading-alt-medium-h5`}
              >
                {stat.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
