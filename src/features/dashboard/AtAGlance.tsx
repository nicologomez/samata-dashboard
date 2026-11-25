"use client";

import { useState } from "react";
import type { DashboardData, Period } from "@/types/dashboard";
import { getMetricsForPeriod } from "@/lib/trends";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { MetricStrip } from "@/components/patterns/MetricStrip";
import styles from "./AtAGlance.module.css";

/** KPI summary cards with an independent period filter. */
export function AtAGlance({ data }: { data: DashboardData }) {
  const [period, setPeriod] = useState<Period>("monthly");
  const metrics = getMetricsForPeriod(data, period);

  return (
    <section aria-labelledby="glance-heading" className={styles.section}>
      <SectionHeader
        id="glance-heading"
        icon="sparkles"
        title="At a Glance"
        action={
          <PeriodSelect
            label="At a Glance period"
            value={period}
            onChange={setPeriod}
          />
        }
      />
      <MetricStrip metrics={metrics} period={period} />
    </section>
  );
}
