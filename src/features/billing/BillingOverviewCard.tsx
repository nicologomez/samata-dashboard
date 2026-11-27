"use client";

import { useState } from "react";
import type { BillingOverviewData } from "@/types/employerBilling";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import styles from "./BillingOverviewCard.module.css";

type Props = {
  data: BillingOverviewData;
};

/** Right-rail agreement metadata card paired beside Billing At a Glance. */
export function BillingOverviewCard({ data }: Props) {
  const [contactSent, setContactSent] = useState(false);

  return (
    <section
      aria-labelledby="billing-overview-heading"
      className={styles.section}
    >
      <SectionHeader
        id="billing-overview-heading"
        icon="grid"
        title="Overview"
      />

      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <p className={`${styles.subtitle} type-paragraph-small`}>
          {data.subtitle}
        </p>

        <dl className={styles.rows}>
          {data.rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt className={`${styles.term} type-label-medium-small`}>
                {row.label}
              </dt>
              <dd className={`${styles.value} type-paragraph-xsmall`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            size="xs"
            href="/analytics"
            className={styles.actionBtn}
          >
            {data.secondaryActionLabel}
          </Button>
          <Button
            variant="primary"
            size="xs"
            onClick={() => setContactSent((prev) => !prev)}
            className={styles.actionBtn}
          >
            {contactSent ? "Requested" : data.primaryActionLabel}
          </Button>
        </div>
      </Card>
    </section>
  );
}
