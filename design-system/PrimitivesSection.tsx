"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Icon, iconNames } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import { TileButton } from "@/components/ui/TileButton";
import styles from "./DesignSystemHub.module.css";

type Props = {
  activeCategory: string | null;
};

/** Interactive showcase of universal UI Primitives (Atoms) rendered directly from src/components/ui/. */
export function PrimitivesSection({ activeCategory }: Props) {
  const [selectVal, setSelectVal] = useState("all");
  const [showL, setShowL] = useState(true);
  const [showR, setShowR] = useState(false);
  const [checkOne, setCheckOne] = useState(true);
  const [iconQuery, setIconQuery] = useState("");

  const show = (category: string) =>
    !activeCategory || activeCategory === category;

  const filteredIcons = iconNames.filter((name) =>
    name.includes(iconQuery.trim().toLowerCase()),
  );

  return (
    <div className={styles.sectionStack}>
      {show("Actions & Indicators") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Buttons, Pills & Avatars</h2>
            <p className="type-paragraph-small">
              Universal interactive triggers and Figma Pill specimens. Toggle
              Pill left/right icons below to inspect the balanced 2px inner text
              padding.
            </p>
          </div>

          <div className={styles.specimenGroup}>
            <h3 className="type-label-medium-medium">Button Variants</h3>
            <div className={styles.flexWrapRow}>
              <Button variant="primary" size="xs" showLeftIcon leftIcon="plus">
                Add Employee
              </Button>
              <Button
                variant="secondary"
                size="xs"
                showLeftIcon
                leftIcon="settings-04"
              >
                Filter
              </Button>
              <Button variant="white" size="sm">
                White
              </Button>
              <Button variant="action" size="sm">
                Action
              </Button>
              <Button variant="pills" size="xs">
                Pills
              </Button>
              <Button variant="basic" size="xs">
                Basic
              </Button>
              <Button
                variant="basic"
                state="transparent"
                size="xl"
                mode="icon"
                leftIcon="three-dot"
                aria-label="Sample row actions"
              />
            </div>
          </div>

          <div className={styles.specimenGroup}>
            <div className={styles.inlineControls}>
              <h3 className="type-label-medium-medium">
                Pill Matrix (Figma Display / Action / Hash)
              </h3>
              <div className={styles.flexWrapRow}>
                <label className={styles.miniToggle}>
                  <Checkbox
                    size="sm"
                    checked={showL}
                    onChange={(e) => setShowL(e.target.checked)}
                    label="Toggle Left Icon"
                  />
                  <span className="type-paragraph-xsmall">Left Icon</span>
                </label>
                <label className={styles.miniToggle}>
                  <Checkbox
                    size="sm"
                    checked={showR}
                    onChange={(e) => setShowR(e.target.checked)}
                    label="Toggle Right Icon"
                  />
                  <span className="type-paragraph-xsmall">Right Icon</span>
                </label>
              </div>
            </div>

            <div className={styles.flexWrapRow}>
              <Pill
                variant="display"
                tone="success"
                showLeftIcon={showL}
                showRightIcon={showR}
              >
                Active
              </Pill>
              <Pill
                variant="display"
                tone="info"
                showLeftIcon={showL}
                showRightIcon={showR}
              >
                Pending
              </Pill>
              <Pill
                variant="display"
                tone="warning"
                showLeftIcon={showL}
                showRightIcon={showR}
              >
                Grace Period
              </Pill>
              <Pill
                variant="display"
                tone="error"
                showLeftIcon={showL}
                showRightIcon={showR}
              >
                Error
              </Pill>
              <Pill
                variant="display"
                tone="plain"
                showLeftIcon={showL}
                showRightIcon={showR}
              >
                Deactivated
              </Pill>
              <Pill
                variant="action"
                tone="success"
                showLeftIcon={false}
                showRightIcon
                rightIcon="arrow-up-right"
              >
                12%
              </Pill>
              <Pill
                variant="action"
                tone="error"
                showLeftIcon={false}
                showRightIcon
                rightIcon="arrow-down-right"
              >
                1.25%
              </Pill>
              <Pill variant="hash">HASH</Pill>
            </div>
          </div>

          <div className={styles.specimenGroup}>
            <h3 className="type-label-medium-medium">Avatar Sizes (32 / 36 / 40)</h3>
            <div className={styles.flexWrapRow}>
              <Avatar name="Kiley Nicholson" size={32} />
              <Avatar name="Brigitte Rath" size={36} />
              <Avatar name="Isabela Castillo" size={40} />
            </div>
          </div>
        </section>
      )}

      {show("Inputs & Selection") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Checkbox, SearchInput & Select</h2>
            <p className="type-paragraph-small">
              Figma Checkbox matrix (sm 16px &amp; md 20px, off / check / dash /
              focused / disabled) alongside toolbar SearchInput and Select.
            </p>
          </div>

          <div className={styles.specimenGroup}>
            <h3 className="type-label-medium-medium">
              Checkbox Variants (sm &amp; md)
            </h3>
            <div className={styles.flexWrapRow}>
              <Checkbox
                size="sm"
                checked={checkOne}
                onChange={(e) => setCheckOne(e.target.checked)}
                label="Interactive small checkbox"
              />
              <Checkbox size="sm" checked={false} readOnly label="Small off" />
              <Checkbox size="sm" checked indeterminate readOnly label="Small dash" />
              <Checkbox size="sm" checked state="focused" readOnly label="Small focused" />
              <Checkbox size="sm" checked disabled readOnly label="Small disabled" />
              <Checkbox size="md" checked readOnly label="Medium checked" />
              <Checkbox size="md" indeterminate readOnly label="Medium dash" />
              <Checkbox size="md" checked state="focused" readOnly label="Medium focused" />
              <Checkbox size="md" checked={false} disabled readOnly label="Medium disabled" />
            </div>
          </div>

          <div className={styles.specimenGroup}>
            <h3 className="type-label-medium-medium">Search & Select</h3>
            <div className={styles.flexWrapRow}>
              <SearchInput
                label="Demo table search"
                placeholder="Search"
                style={{ width: 180 }}
              />
              <Select
                label="Department filter"
                variant="pill"
                value={selectVal}
                options={[
                  { value: "all", label: "All Departments" },
                  { value: "eng", label: "Engineering" },
                  { value: "ops", label: "Operations" },
                ]}
                onChange={setSelectVal}
              />
              <Select
                label="Period filter"
                value={selectVal}
                options={[
                  { value: "all", label: "Monthly" },
                  { value: "eng", label: "Weekly" },
                  { value: "ops", label: "Daily" },
                ]}
                onChange={setSelectVal}
              />
            </div>
          </div>
        </section>
      )}

      {show("Layout & Surfaces") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">
              Card Surfaces, SectionHeader & TileButton
            </h2>
          </div>
          <div className={styles.cardDemoGrid}>
            <Card surface="default" elevation="xs">
              <SectionHeader icon="sparkles" title="Default Surface" />
              <p className="type-paragraph-xsmall">
                White container with default subtle border.
              </p>
            </Card>
            <Card surface="default" glow elevation="xs">
              <SectionHeader icon="gantt-chart" title="Glowing Default" />
              <p className="type-paragraph-xsmall">
                Used by Program Signals and Access Summary.
              </p>
            </Card>
            <Card surface="gradient" elevation="sm">
              <SectionHeader icon="team" title="Warm Gradient" />
              <p className="type-paragraph-xsmall">
                Used by MetricCard and MetricWideBlock.
              </p>
            </Card>
          </div>
          <div style={{ maxWidth: 340 }}>
            <TileButton
              icon="invite"
              title="Add employees"
              description="Invite new members to benefits"
              onClick={() => {}}
            />
          </div>
        </section>
      )}

      {show("Iconography & Feedback") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.inlineControls}>
              <div>
                <h2 className="type-heading-h5">
                  Registered Icons ({filteredIcons.length} / {iconNames.length})
                </h2>
                <p className="type-paragraph-small">
                  Rendered via CSS mask from <code>public/icons/*.svg</code>.
                </p>
              </div>
              <SearchInput
                label="Filter icons"
                placeholder="Filter icons..."
                value={iconQuery}
                onChange={(e) => setIconQuery(e.target.value)}
                style={{ width: 180 }}
              />
            </div>
          </div>
          <div className={styles.iconGrid}>
            {filteredIcons.map((name) => (
              <div key={name} className={styles.iconTile}>
                <Icon name={name} size={20} />
                <code className="type-paragraph-xsmall">{name}</code>
              </div>
            ))}
          </div>
          <div className={styles.specimenGroup}>
            <h3 className="type-label-medium-medium">ProgressBar</h3>
            <div style={{ maxWidth: 320 }}>
              <ProgressBar label="Demo enrollment progress" value={68} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
