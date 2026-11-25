"use client";

import { useState } from "react";
import type { DashboardData, Period } from "@/types/dashboard";
import { getTrendForPeriod } from "@/lib/trends";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { Icon } from "@/components/ui/Icon";
import { ParticipationChart } from "./ParticipationChart";
import styles from "./EmployeeParticipation.module.css";

/** Employee participation trend chart and totals with an independent period filter. */
export function EmployeeParticipation({ data }: { data: DashboardData }) {
  const [period, setPeriod] = useState<Period>("monthly");
  const trend = getTrendForPeriod(data, period);
  const latest = trend.at(-1);

  return (
    <section
      aria-labelledby="participation-heading"
      className={styles.section}
    >
      <SectionHeader
        id="participation-heading"
        icon="bar-chart"
        title="Employee Participation"
        action={
          <PeriodSelect
            label="Employee Participation period"
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
        <ParticipationChart data={trend} period={period} />
      </div>
    </section>
  );
}
