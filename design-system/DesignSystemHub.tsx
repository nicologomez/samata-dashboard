"use client";

import { useState } from "react";
import { tabSpecs, type SectionTabId } from "./registry";
import { FoundationsView } from "./FoundationsView";
import { OrganismsTemplatesView } from "./OrganismsTemplatesView";
import { OverviewSection } from "./OverviewSection";
import { PatternsView } from "./PatternsView";
import { PrimitivesView } from "./PrimitivesView";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import styles from "./DesignSystemHub.module.css";

/** IBM / Atlassian-inspired Design System Hub organizing Subatomic through Templates into single-focus pages. */
export function DesignSystemHub() {
  const [activeTab, setActiveTab] = useState<SectionTabId>("overview");
  const [activeItemId, setActiveItemId] = useState<string>(
    tabSpecs[0].items[0].id,
  );
  const [darkTheme, setDarkTheme] = useState(false);

  const currentTab =
    tabSpecs.find((t) => t.id === activeTab) ?? tabSpecs[0];
  const currentItem =
    currentTab.items.find((i) => i.id === activeItemId) ?? currentTab.items[0];

  function selectTab(tabId: SectionTabId) {
    const target = tabSpecs.find((t) => t.id === tabId);
    setActiveTab(tabId);
    if (target?.items[0]) {
      setActiveItemId(target.items[0].id);
    }
  }

  return (
    <div className={styles.shell} data-theme={darkTheme ? "dark" : undefined}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brandRow}>
            <div className={styles.brandCopy}>
              <h1 className="type-heading-h4">Samata Design System</h1>
              <Pill variant="hash">SOURCE OF TRUTH</Pill>
              <span className="type-paragraph-small">
                Organized by technical architecture layer
              </span>
            </div>

            <div className={styles.topActions}>
              <Button
                variant="secondary"
                size="xs"
                onClick={() => setDarkTheme((d) => !d)}
              >
                {darkTheme ? "Light Theme" : "Dark Theme"}
              </Button>
              <Button variant="primary" size="xs" href="/">
                Back to App
              </Button>
            </div>
          </div>

          <nav
            aria-label="Design system sections"
            role="tablist"
            className={styles.tabs}
          >
            {tabSpecs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={styles.tabBtn}
                onClick={() => selectTab(tab.id)}
              >
                <strong className="type-label-medium-medium">
                  {tab.label}
                </strong>
                <small className="type-paragraph-xsmall">{tab.subtitle}</small>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.rail} aria-label="Section navigation">
          <span className={`${styles.railHeading} type-overlines-small`}>
            {currentTab.label}
          </span>
          <nav className={styles.railNav}>
            {currentTab.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.railBtn} type-label-medium-small`}
                data-active={currentItem.id === item.id ? "true" : undefined}
                onClick={() => setActiveItemId(item.id)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.main}>
          <section className={styles.docHeader}>
            <div className={styles.docHeaderTop}>
              <div className={styles.docMeta}>
                <h2 className="type-heading-h3">{currentItem.label}</h2>
                <Pill variant="hash">{currentItem.atomic}</Pill>
                <Pill
                  variant="display"
                  tone={
                    currentItem.scope === "Universal (All Portals)"
                      ? "success"
                      : currentItem.scope === "Shared Portal Chrome"
                        ? "info"
                        : "warning"
                  }
                  showLeftIcon
                  showRightIcon={false}
                >
                  {currentItem.scope}
                </Pill>
              </div>
              <code className={`${styles.codePath} type-paragraph-xsmall`}>
                {currentItem.path}
              </code>
            </div>

            <p className={`${styles.docSummary} type-paragraph-small`}>
              {currentItem.summary}
            </p>

            <div className={`${styles.docRuleBox} type-paragraph-xsmall`}>
              <strong>When to use:</strong>
              {currentItem.whenToUse}
            </div>
          </section>

          {activeTab === "overview" && (
            <OverviewSection itemId={currentItem.id} />
          )}
          {activeTab === "foundations" && (
            <FoundationsView itemId={currentItem.id} />
          )}
          {activeTab === "primitives" && (
            <PrimitivesView itemId={currentItem.id} />
          )}
          {activeTab === "patterns" && (
            <PatternsView itemId={currentItem.id} />
          )}
          {(activeTab === "organisms" || activeTab === "templates") && (
            <OrganismsTemplatesView itemId={currentItem.id} />
          )}
        </main>
      </div>
    </div>
  );
}
