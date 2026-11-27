"use client";

import { useState } from "react";
import type { ConnectedIntegrationCardData } from "@/types/employerIntegrations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import styles from "./IntegrationConnectionCard.module.css";

type Props = {
  data: ConnectedIntegrationCardData;
  onViewLogs?: () => void;
};

/** Layered status card reused across Employee Roster Sync and Access & Security. */
export function IntegrationConnectionCard({ data, onViewLogs }: Props) {
  const [actionBusy, setActionBusy] = useState(false);

  function handlePrimaryAction() {
    setActionBusy(true);
    window.setTimeout(() => setActionBusy(false), 1600);
  }

  function handleViewLogs() {
    if (onViewLogs) {
      onViewLogs();
      return;
    }
    document
      .getElementById("activity-log")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const primaryText = actionBusy
    ? data.primaryActionLabel === "Sync Now"
      ? "Syncing..."
      : "Testing..."
    : data.primaryActionLabel;

  return (
    <section
      aria-labelledby={`connection-${data.id}`}
      className={styles.section}
    >
      <SectionHeader
        id={`connection-${data.id}`}
        icon={data.sectionIcon}
        title={data.sectionTitle}
      />

      <div className={styles.shelf} data-tone={data.shelfTone}>
        <div className={styles.innerCard}>
          <div className={styles.providerRow}>
            <div className={styles.providerIdentity}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.logoSrc}
                alt={`${data.providerName} logo`}
                width={54}
                height={54}
                className={styles.logo}
              />
              <div className={styles.providerCopy}>
                <h3 className={`${styles.providerName} type-heading-alt-medium-h4`}>
                  {data.providerName}
                </h3>
                <p className={`${styles.category} type-paragraph-xsmall`}>
                  {data.categorySubtitle}
                </p>
              </div>
            </div>

            <Button
              variant="basic"
              state="transparent"
              mode="icon"
              size="xs"
              leftIcon="three-dot"
              aria-label={`${data.providerName} options`}
              className={styles.menuButton}
            />
          </div>

          <div className={styles.statsGrid}>
            {data.stats.map((stat) => (
              <div key={stat.label} className={styles.statTile}>
                <strong
                  className={`${styles.statValue} type-heading-alt-medium-h4`}
                >
                  {stat.value}
                </strong>
                <span className={`${styles.statLabel} type-paragraph-xsmall`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.shelfFooter}>
          <Pill
            variant="display"
            tone="plain"
            leftIcon="dot-small"
            className={styles.connectedPill}
          >
            {data.statusLabel}
          </Pill>

          <div className={styles.actions}>
            <Button variant="white" size="xs" onClick={handleViewLogs}>
              {data.secondaryActionLabel}
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={handlePrimaryAction}
              disabled={actionBusy}
            >
              {primaryText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
