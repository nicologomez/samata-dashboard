"use client";

import { useState } from "react";
import Link from "next/link";
import {
  designSystemEntries,
  layerTabs,
  type HealthStatus,
  type LayerId,
  type PortalScope,
} from "./catalog";
import { AuditInventoryList } from "./AuditInventoryList";
import { FeaturesTemplatesSection } from "./FeaturesTemplatesSection";
import { PatternsSection } from "./PatternsSection";
import { PrimitivesSection } from "./PrimitivesSection";
import { TokensSection } from "./TokensSection";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import styles from "./DesignSystemHub.module.css";

type ScopeFilter = "all" | "universal" | "employer-exclusive" | "attention";

function matchesScope(
  scope: PortalScope,
  status: HealthStatus,
  filter: ScopeFilter,
): boolean {
  if (filter === "all") return true;
  if (filter === "universal") return scope === "universal";
  if (filter === "employer-exclusive") {
    return scope === "employer-exclusive" || scope === "shared-chrome";
  }
  return status === "needs-fix" || status === "refactor" || status === "unused";
}

/** Interactive Samata Design System source of truth organized by technical layers with sidebar category & scope filters. */
export function DesignSystemHub() {
  const [activeLayer, setActiveLayer] = useState<LayerId>("tokens");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [previewDark, setPreviewDark] = useState(false);

  const currentTab =
    layerTabs.find((tab) => tab.id === activeLayer) ?? layerTabs[0];

  function selectLayer(layerId: LayerId) {
    setActiveLayer(layerId);
    setActiveCategory(null);
  }

  const visibleEntries = designSystemEntries.filter((entry) => {
    if (entry.layer !== activeLayer) return false;
    if (activeCategory && entry.category !== activeCategory) return false;
    return matchesScope(entry.scope, entry.status, scopeFilter);
  });

  return (
    <div
      className={styles.hub}
      data-theme={previewDark ? "dark" : undefined}
    >
      <div className={styles.inner}>
        <header className={styles.topbar}>
          <div className={styles.brandTitle}>
            <div className={styles.titleLine}>
              <h1 className="type-heading-h3">Samata Design System</h1>
              <Pill variant="hash">SOURCE OF TRUTH</Pill>
            </div>
            <p className="type-paragraph-small">
              Technical frontend catalog mapped to Atomic Design — live
              specimens, ownership rules, and engineering health audit.
            </p>
          </div>

          <div className={styles.topbarActions}>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => setPreviewDark((d) => !d)}
            >
              {previewDark ? "Switch to Light Theme" : "Preview Dark Theme"}
            </Button>
            <Button variant="primary" size="xs" href="/">
              Back to Employer App
            </Button>
          </div>
        </header>

        {/* Top Technical Layer Switcher Tabs */}
        <nav
          aria-label="Architecture layers"
          role="tablist"
          className={styles.tabBar}
        >
          {layerTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              className={styles.layerTab}
              aria-selected={activeLayer === tab.id}
              onClick={() => selectLayer(tab.id)}
            >
              <strong className="type-label-medium-medium">
                {tab.technicalName}
              </strong>
              <small className="type-paragraph-xsmall">
                {tab.atomicEquiv} · {tab.folderPath}
              </small>
            </button>
          ))}
        </nav>

        <div className={styles.workspace}>
          {/* Left Sticky Category & Scope Sidebar */}
          <aside className={styles.sidebar} aria-label="Design system filters">
            <div className={styles.sideGroup}>
              <span
                className={`${styles.sideGroupTitle} type-overlines-small`}
              >
                Categories
              </span>
              <div className={styles.sideNavList}>
                <button
                  type="button"
                  className={`${styles.sideBtn} type-label-medium-small`}
                  data-active={activeCategory === null ? "true" : undefined}
                  onClick={() => setActiveCategory(null)}
                >
                  All in {currentTab.technicalName}
                </button>
                {currentTab.categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`${styles.sideBtn} type-label-medium-small`}
                    data-active={
                      activeCategory === category ? "true" : undefined
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sideGroup}>
              <span
                className={`${styles.sideGroupTitle} type-overlines-small`}
              >
                Portal Ownership Filter
              </span>
              <div className={styles.sideNavList}>
                {(
                  [
                    { id: "all", label: "All Scopes" },
                    { id: "universal", label: "Universal (All Portals)" },
                    { id: "employer-exclusive", label: "Employer-Exclusive" },
                    { id: "attention", label: "Needs Fix / Scrap" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.sideBtn} type-label-medium-small`}
                    data-active={scopeFilter === item.id ? "true" : undefined}
                    onClick={() => setScopeFilter(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sideGroup}>
              <span
                className={`${styles.sideGroupTitle} type-overlines-small`}
              >
                Live App Routes
              </span>
              <div className={styles.sideNavList}>
                <Link
                  href="/"
                  className={`${styles.sideBtn} type-label-medium-small`}
                >
                  / (Employer Home)
                </Link>
                <Link
                  href="/analytics"
                  className={`${styles.sideBtn} type-label-medium-small`}
                >
                  /analytics (Analytics)
                </Link>
                <Link
                  href="/employees"
                  className={`${styles.sideBtn} type-label-medium-small`}
                >
                  /employees (Employees)
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Stage */}
          <main className={styles.content}>
            <div className={styles.layerIntro}>
              <div className={styles.layerIntroText}>
                <h2 className="type-heading-h4">{currentTab.technicalName}</h2>
                <p className="type-paragraph-small">{currentTab.description}</p>
              </div>
              <Pill variant="hash">
                {currentTab.atomicEquiv} · {currentTab.folderPath}
              </Pill>
            </div>

            {activeLayer === "tokens" && (
              <TokensSection activeCategory={activeCategory} />
            )}

            {activeLayer === "primitives" && (
              <PrimitivesSection activeCategory={activeCategory} />
            )}

            {activeLayer === "patterns" && (
              <PatternsSection activeCategory={activeCategory} />
            )}

            {activeLayer === "templates" && (
              <FeaturesTemplatesSection activeCategory={activeCategory} />
            )}

            <AuditInventoryList entries={visibleEntries} />
          </main>
        </div>
      </div>
    </div>
  );
}
