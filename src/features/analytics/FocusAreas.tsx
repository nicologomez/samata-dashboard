"use client";

import { useState } from "react";
import type { DonutSlice, Period } from "@/types/common";
import { Card } from "@/components/ui/Card";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./FocusAreas.module.css";

const radius = 74;
const circumference = 2 * Math.PI * radius;

/** Aggregated focus areas donut chart and category legend. */
export function FocusAreas({
  byPeriod,
}: {
  byPeriod: Record<Period, readonly DonutSlice[]>;
}) {
  const [period, setPeriod] = useState<Period>("weekly");
  const slices = byPeriod[period];

  const arcs = slices.reduce<
    { slice: DonutSlice; dashArray: string; dashOffset: number }[]
  >((acc, slice, index) => {
    const prevSum = slices
      .slice(0, index)
      .reduce((sum, item) => sum + item.percentage, 0);
    const length = (slice.percentage / 100) * circumference;
    const offset = -((prevSum / 100) * circumference);

    acc.push({
      slice,
      dashArray: `${length} ${circumference - length}`,
      dashOffset: offset,
    });
    return acc;
  }, []);

  return (
    <section aria-labelledby="focus-areas-heading" className={styles.section}>
      <SectionHeader
        id="focus-areas-heading"
        icon="pie"
        title="Focus Areas"
        action={
          <PeriodSelect
            label="Focus Areas period"
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <Card surface="default" padding="none" glow className={styles.card}>
        <div className={styles.donutWrap}>
          <svg
            viewBox="0 0 200 200"
            className={styles.donut}
            role="img"
            aria-label="Focus areas distribution donut chart"
          >
            <g transform="rotate(-90 100 100)">
              {arcs.map(({ slice, dashArray, dashOffset }) => (
                <circle
                  key={slice.label}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  strokeWidth="26"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  className={styles[`tone-${slice.tone}`]}
                />
              ))}
            </g>
          </svg>
          <span className={`${styles.centerLabel} type-heading-alt-medium-h7`}>
            Aggregate Categories
          </span>
        </div>

        <ul className={styles.legend}>
          {slices.map((slice) => (
            <li key={slice.label}>
              <span className={styles.legendLeft}>
                <span
                  aria-hidden="true"
                  className={`${styles.dot} ${styles[`dot-${slice.tone}`]}`}
                />
                <span className="type-label-medium-medium">{slice.label}</span>
              </span>
              <span className={`${styles.pct} type-paragraph-small`}>
                {slice.percentage}%
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
