"use client";

import { useState } from "react";
import type { ProgramSignalView } from "@/types/employerAnalytics";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import styles from "./ProgramSignals.module.css";

/** Modality breakdown card with switchable signal lens. */
export function ProgramSignals({
  signals,
}: {
  signals: readonly ProgramSignalView[];
}) {
  const [selectedId, setSelectedId] = useState(signals[0]?.id ?? "");
  const active =
    signals.find((signal) => signal.id === selectedId) ?? signals[0];

  if (!active) return null;

  const totalValue = Math.max(
    1,
    active.segments.reduce((sum, seg) => sum + seg.value, 0),
  );

  return (
    <section aria-labelledby="signals-heading" className={styles.section}>
      <SectionHeader id="signals-heading" icon="signal" title="Program Signals" />
      <Card surface="default" padding="md" glow className={styles.card}>
        <div className={styles.top}>
          <Select
            label="Program signal view"
            value={active.id}
            options={signals.map((item) => ({
              value: item.id,
              label: item.label,
            }))}
            onChange={setSelectedId}
          />
          <div className={styles.summary}>
            <strong className="type-heading-alt-medium-h4">
              {active.total}
            </strong>
            <span className="type-paragraph-xsmall">{active.caption}</span>
          </div>
        </div>

        <div className={styles.breakdown}>
          <div className={styles.bar}>
            {active.segments.map((segment) => (
              <div
                key={segment.label}
                style={{ flexGrow: Math.max(1, (segment.value / totalValue) * 100) }}
                className={`${styles.segment} ${styles[`tone-${segment.tone}`]}`}
              >
                <span className="type-label-medium-small">{segment.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.labels}>
            {active.segments.map((segment) => (
              <span
                key={segment.label}
                style={{ flexGrow: Math.max(1, (segment.value / totalValue) * 100) }}
                className={`${styles.segmentLabel} type-label-medium-xsmall`}
              >
                {segment.label}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
