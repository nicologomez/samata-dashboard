"use client";

import { useMemo, useState } from "react";
import type {
  AvailableIntegrationItem,
  IntegrationCatalogCategory,
} from "@/types/employerIntegrations";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HorizontalTabs } from "@/components/ui/HorizontalTabs";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import styles from "./AvailableIntegrations.module.css";

const categoryTabs: readonly {
  id: IntegrationCatalogCategory;
  label: string;
}[] = [
  { id: "hris", label: "HRIS Platform" },
  { id: "sso", label: "Identity & SSO" },
  { id: "api", label: "Custom API" },
];

type Props = {
  items: readonly AvailableIntegrationItem[];
};

/** Tabbed 3-column integration catalog directory. */
export function AvailableIntegrations({ items }: Props) {
  const [activeTab, setActiveTab] =
    useState<IntegrationCatalogCategory>("hris");
  const [connectedOverrides, setConnectedOverrides] = useState<
    Record<string, boolean>
  >({});

  const visibleItems = useMemo(
    () => items.filter((item) => item.category === activeTab),
    [items, activeTab],
  );

  function toggleConnection(item: AvailableIntegrationItem) {
    const current = connectedOverrides[item.id] ?? item.connected;
    setConnectedOverrides((prev) => ({
      ...prev,
      [item.id]: !current,
    }));
  }

  return (
    <section
      aria-labelledby="available-integrations-heading"
      className={styles.section}
    >
      <SectionHeader
        id="available-integrations-heading"
        icon="doc-fill"
        title="Available Integrations"
      />

      <HorizontalTabs
        tabs={categoryTabs}
        value={activeTab}
        onChange={(id) => setActiveTab(id as IntegrationCatalogCategory)}
      />

      <div className={styles.grid}>
        {visibleItems.map((item) => {
          const isConnected = connectedOverrides[item.id] ?? item.connected;
          return (
            <Card
              key={item.id}
              surface="default"
              padding="none"
              elevation="xs"
              className={styles.card}
            >
              <div className={styles.cardBody}>
                <div className={styles.header}>
                  <div className={styles.logoFrame}>
                    {item.logoSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.logoSrc}
                        alt={`${item.name} logo`}
                        className={styles.logoImg}
                        data-size={item.logoSize ?? "sm"}
                      />
                    ) : (
                      <span
                        className={`${styles.monogram} type-label-semibold-medium`}
                      >
                        {item.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className={styles.headerMeta}>
                    <h3 className={`${styles.title} type-heading-h6`}>
                      {item.name}
                    </h3>
                    <span
                      className={`${styles.subtitle} type-label-medium-small`}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                <p className={`${styles.description} type-paragraph-small`}>
                  {item.description}
                </p>
              </div>

              <div className={styles.footer}>
                <Button variant="secondary" size="xs" onClick={() => {}}>
                  Details
                </Button>

                {isConnected ? (
                  <Pill
                    variant="display"
                    tone="plain"
                    leftIcon="dot-small"
                    className={styles.connectedPill}
                    onClick={() => toggleConnection(item)}
                  >
                    Connected
                  </Pill>
                ) : (
                  <Button
                    variant="primary"
                    size="xs"
                    showRightIcon
                    rightIcon="chevron-right"
                    onClick={() => toggleConnection(item)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
