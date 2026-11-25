"use client";

import { useState } from "react";
import type { Period } from "@/types/common";
import type { BookingSlotGrid } from "@/types/employerAnalytics";
import { Card } from "@/components/ui/Card";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./BookingPatterns.module.css";

/** Day-by-hour booking intensity heatmap card. */
export function BookingPatterns({
  patternsByPeriod,
}: {
  patternsByPeriod: Record<Period, BookingSlotGrid>;
}) {
  const [period, setPeriod] = useState<Period>("weekly");
  const grid = patternsByPeriod[period];

  return (
    <section aria-labelledby="booking-heading" className={styles.section}>
      <SectionHeader
        id="booking-heading"
        icon="grid"
        title="Booking Patterns"
        action={
          <PeriodSelect
            label="Booking Patterns period"
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <Card surface="default" padding="none" glow className={styles.card}>
        <div className={styles.summary}>
          <span className="type-paragraph-small">Demand Concentration</span>
          <strong className="type-heading-alt-medium-h4">
            {grid.peakLabel}
          </strong>
          <small className="type-paragraph-xsmall">{grid.caption}</small>
        </div>

        <div className={styles.heatmapWrap}>
          <div
            className={styles.heatmap}
            role="grid"
            aria-label="Booking intensity by weekday and hour"
          >
            <div className={styles.headerRow} role="row">
              <span aria-hidden="true" />
              {grid.days.map((day) => (
                <span
                  key={day}
                  role="columnheader"
                  className={`${styles.axisText} type-label-medium-xsmall`}
                >
                  {day}
                </span>
              ))}
            </div>

            {grid.hours.map((hour, rowIndex) => (
              <div className={styles.timeRow} role="row" key={hour}>
                <span
                  role="rowheader"
                  className={`${styles.axisText} type-label-medium-xsmall`}
                >
                  {hour}
                </span>
                {grid.days.map((day, colIndex) => {
                  const level = grid.intensities[rowIndex]?.[colIndex] ?? 0;
                  return (
                    <span
                      key={`${hour}-${day}`}
                      role="gridcell"
                      data-level={level}
                      aria-label={`${day} ${hour}: intensity ${level} of 4`}
                      className={styles.cell}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.legend}>
            <div className={styles.legendBar} />
            <div className={`${styles.legendLabels} type-label-medium-xsmall`}>
              <span>0</span>
              <span>{grid.maxLabel}</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
