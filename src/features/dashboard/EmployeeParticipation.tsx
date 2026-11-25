"use client";

import { useState } from "react";
import type { Period, TrendPoint } from "@/types/common";
import { getTrendForPeriod } from "@/lib/trends";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { Icon } from "@/components/ui/Icon";
import {
  TrendChart,
  type TrendSeries,
} from "@/components/patterns/TrendChart";
import styles from "./EmployeeParticipation.module.css";

const participationSeries = [
  { key: "participants", label: "Active Participants", tone: "blue" },
  { key: "sessions", label: "Sessions Completed", tone: "brand" },
] as const satisfies readonly TrendSeries<TrendPoint>[];

type Props = {
  trendsByPeriod: Record<Period, readonly TrendPoint[]>;
  title?: string;
};

/** Participation trend chart and period totals with an independent period filter. */
export function EmployeeParticipation({
  trendsByPeriod,
  title = "Employee Participation",
}: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const trend = getTrendForPeriod(trendsByPeriod, period);
  const latest = trend.at(-1);

  return (
    <section
      aria-labelledby="participation-heading"
      className={styles.section}
    >
      <SectionHeader
        id="participation-heading"
        icon="bar-chart"
        title={title}
        action={
          <PeriodSelect
            label={`${title} period`}
            value={period}
            onChange={setPeriod}
          />
        }
      />
      <div className={styles.content}>
        <div className={styles.statRow}>
          <div className={styles.statItem}>
            <span className="type-label-medium-medium">
              <Icon
                name="dot"
                size={8}
                className={styles.participantsDot}
              />{" "}
              Active Participants
            </span>
            <strong className="type-heading-alt-medium-h4">
              {latest?.participants ?? 0}
            </strong>
          </div>
          <div className={styles.statItem}>
            <span className="type-label-medium-medium">
              <Icon name="dot" size={8} className={styles.sessionsDot} />{" "}
              Sessions Completed
            </span>
            <strong className="type-heading-alt-medium-h4">
              {latest?.sessions ?? 0}
            </strong>
          </div>
        </div>
        <TrendChart
          data={trend}
          labelKey="label"
          series={participationSeries}
          title={`${period} ${title.toLowerCase()}`}
          ariaLabel={`${period} active participants and completed sessions demonstration chart`}
          emptyMessage="No participation data for this period."
        />
      </div>
    </section>
  );
}
