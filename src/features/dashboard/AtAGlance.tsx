"use client";

import { useState } from "react";
import type { Metric, Period } from "@/types/common";
import { getMetricsForPeriod } from "@/lib/trends";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { MetricStrip } from "@/components/patterns/MetricStrip";
import { MetricWideBlock } from "@/components/patterns/MetricWideBlock";
import styles from "./AtAGlance.module.css";

type Props = {
  metricsByPeriod: Record<Period, readonly Metric[]>;
  title?: string;
  layout?: "strip" | "wide";
  heading?: string;
  subtitle?: string;
};

/** Universal KPI summary block supporting multi-card strip or wide banner layouts. */
export function AtAGlance({
  metricsByPeriod,
  title = "At a Glance",
  layout = "strip",
  heading = "Benefit Analytics",
  subtitle,
}: Props) {
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
      {layout === "wide" ? (
        <MetricWideBlock
          heading={heading}
          subtitle={subtitle}
          metrics={metrics}
        />
      ) : (
        <MetricStrip metrics={metrics} period={period} />
      )}
    </section>
  );
}
