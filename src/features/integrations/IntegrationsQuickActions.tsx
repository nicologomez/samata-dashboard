"use client";

import { useState } from "react";
import type { QuickActionsPanelData } from "@/types/employerIntegrations";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import styles from "./IntegrationsQuickActions.module.css";

type Props = {
  data: QuickActionsPanelData;
  onViewActivity?: () => void;
};

/** Right-rail Quick Actions status and instant controls card for Integrations. */
export function IntegrationsQuickActions({ data, onViewActivity }: Props) {
  const [autoSync, setAutoSync] = useState(data.autoSyncDefaultEnabled);
  const [testLabel, setTestLabel] = useState(data.testActionLabel);
  const [contactNotice, setContactNotice] = useState(false);

  function handleTestConnection() {
    setTestLabel("Verified");
    window.setTimeout(() => setTestLabel(data.testActionLabel), 1800);
  }

  function handleViewActivity() {
    if (onViewActivity) {
      onViewActivity();
      return;
    }
    document
      .getElementById("activity-log")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      aria-labelledby="integrations-quick-actions"
      className={styles.section}
    >
      <SectionHeader
        id="integrations-quick-actions"
        icon="grid"
        title="Quick Actions"
      />
      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <div className={styles.statusRow}>
          <span className="type-label-medium-small">{data.statusMessage}</span>
          <Icon
            name="check-circle"
            size={16}
            className={styles.statusIcon}
          />
        </div>

        <div className={styles.controls}>
          <div className={styles.controlRow}>
            <div className={styles.controlMeta}>
              <span className="type-label-medium-medium">
                {data.autoSyncTitle}
              </span>
              <span className={`${styles.subtitle} type-paragraph-xsmall`}>
                {autoSync ? data.autoSyncSubtitle : "AutoSync paused"}
              </span>
            </div>
            <Toggle
              checked={autoSync}
              onCheckedChange={setAutoSync}
              label={`${data.autoSyncTitle} ${data.autoSyncSubtitle}`}
            />
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlMeta}>
              <span className="type-label-medium-medium">{data.testTitle}</span>
              <span className={`${styles.subtitle} type-paragraph-xsmall`}>
                {data.testSubtitle}
              </span>
            </div>
            <Button
              variant="secondary"
              size="xs"
              onClick={handleTestConnection}
            >
              {testLabel}
            </Button>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            size="xs"
            onClick={handleViewActivity}
          >
            {data.viewActivityLabel}
          </Button>
          <Button
            variant="primary"
            size="xs"
            onClick={() => setContactNotice((prev) => !prev)}
          >
            {contactNotice ? "Requested" : data.contactUsLabel}
          </Button>
        </div>
      </Card>
    </section>
  );
}
