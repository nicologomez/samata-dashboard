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
  metricsByPeriod?: Record<Period, readonly Metric[]>;
  metrics?: readonly Metric[];
  title?: string;
  layout?: "strip" | "wide";
  heading?: string;
  subtitle?: string;
  showPeriodSelect?: boolean;
};

/** Universal KPI summary block supporting multi-card strip or wide banner layouts. */
export function AtAGlance({
  metricsByPeriod,
  metrics: staticMetrics,
  title = "At a Glance",
  layout = "strip",
  heading = "Benefit Analytics",
  subtitle,
  showPeriodSelect = true,
}: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const metrics =
    staticMetrics ??
    (metricsByPeriod ? getMetricsForPeriod(metricsByPeriod, period) : []);

  return (
    <section aria-labelledby="glance-heading" className={styles.section}>
      <SectionHeader
        id="glance-heading"
        icon="sparkles"
        title={title}
        action={
          showPeriodSelect && metricsByPeriod ? (
            <PeriodSelect
              label={`${title} period`}
              value={period}
              onChange={setPeriod}
            />
          ) : undefined
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
