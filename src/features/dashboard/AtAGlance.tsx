"use client";

import { useState } from "react";
import type { Metric, Period } from "@/types/common";
import { getMetricsForPeriod } from "@/lib/trends";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { MetricStrip } from "@/components/patterns/MetricStrip";
import styles from "./AtAGlance.module.css";

type Props = {
  metricsByPeriod: Record<Period, readonly Metric[]>;
  title?: string;
};

/** Universal KPI summary strip with an independent period filter. */
export function AtAGlance({ metricsByPeriod, title = "At a Glance" }: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const metrics = getMetricsForPeriod(metricsByPeriod, period);

  return (
    <section aria-labelledby="glance-heading" className={styles.section}>
      <SectionHeader
        id="glance-heading"
        icon="sparkles"
        title={title}
        action={
          <PeriodSelect
            label={`${title} period`}
            value={period}
            onChange={setPeriod}
          />
        }
      />
      <MetricStrip metrics={metrics} period={period} />
    </section>
  );
}
