"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { TextField } from "@/components/ui/FormControls";
import { NavButton } from "@/components/ui/NavButton";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import { TileButton } from "@/components/ui/TileButton";
import { Toggle } from "@/components/ui/Toggle";
import styles from "./DesignSystemHub.module.css";

type Props = {
  itemId: string;
};

/** Renders complete interactive specimens and property contracts for each single UI Primitive (Atom). */
export function PrimitivesView({ itemId }: Props) {
  const [checkLive, setCheckLive] = useState(true);
  const [toggleLive, setToggleLive] = useState(true);
  const [pillLeft, setPillLeft] = useState(true);
  const [pillRight, setPillRight] = useState(false);
  const [pillText, setPillText] = useState(true);
  const [selectVal, setSelectVal] = useState("all");
  const [searchVal, setSearchVal] = useState("");
  const [textVal, setTextVal] = useState("isabela@trilumenai.com");

  switch (itemId) {
    case "p-avatar":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Size Variants (32px, 36px, 40px)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <div className={styles.stackMd}>
                <Avatar name="Kiley Nicholson" size={32} />
                <code className="type-paragraph-xsmall">size=32 (Table row)</code>
              </div>
              <div className={styles.stackMd}>
                <Avatar name="TrilumenAI" size={36} />
                <code className="type-paragraph-xsmall">
                  size=36 (Org switcher)
                </code>
              </div>
              <div className={styles.stackMd}>
                <Avatar name="Isabela Castillo" size={40} />
                <code className="type-paragraph-xsmall">size=40 (Header)</code>
              </div>
            </div>
          </div>
        </div>
      );

    case "p-button":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            All 6 Variants
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <Button variant="primary" size="md">
                Primary
              </Button>
              <Button variant="secondary" size="md">
                Secondary
              </Button>
              <Button variant="white" size="md">
                White
              </Button>
              <Button variant="action" size="md">
                Action
              </Button>
              <Button variant="pills" size="md">
                Pills
              </Button>
              <Button variant="basic" size="md">
                Basic
              </Button>
            </div>
          </div>

          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            All 5 Sizes (xs, sm, md, lg, xl) &amp; Icon Positions
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <Button variant="primary" size="xs" showLeftIcon leftIcon="plus">
                XS (28px)
              </Button>
              <Button variant="primary" size="sm" showLeftIcon leftIcon="plus">
                SM (36px)
              </Button>
              <Button variant="primary" size="md" showLeftIcon leftIcon="plus">
                MD (40px)
              </Button>
              <Button variant="primary" size="lg" showRightIcon rightIcon="arrow-right">
                LG (44px)
              </Button>
              <Button variant="primary" size="xl" showRightIcon rightIcon="arrow-right">
                XL (50px)
              </Button>
            </div>
            <div className={styles.flexWrap}>
              <Button
                variant="secondary"
                size="xs"
                showLeftIcon
                leftIcon="settings-04"
              >
                Filter
              </Button>
              <Button variant="primary" size="xs" showLeftIcon leftIcon="plus">
                Add Employee
              </Button>
              <Button
                variant="basic"
                state="transparent"
                size="xl"
                mode="icon"
                leftIcon="three-dot"
                aria-label="Table action icon"
              />
              <Button
                variant="secondary"
                size="sm"
                mode="icon"
                leftIcon="search"
                aria-label="Icon button sm"
              />
              <Button
                variant="primary"
                size="md"
                mode="icon"
                leftIcon="plus"
                aria-label="Icon button md"
              />
            </div>
          </div>

          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Interactive States (Hover, Pressed, Focus, Disabled, Transparent)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <Button variant="primary" size="sm" state="hover">
                Hover
              </Button>
              <Button variant="primary" size="sm" state="pressed">
                Pressed
              </Button>
              <Button variant="primary" size="sm" state="focus">
                Focus
              </Button>
              <Button variant="primary" size="sm" disabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" size="sm" disabled>
                Disabled Secondary
              </Button>
              <Button variant="basic" size="sm" state="transparent">
                Transparent Basic
              </Button>
            </div>
          </div>
        </div>
      );

    case "p-card":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Surfaces, Glow, Elevation &amp; Padding
          </h3>
          <div className={styles.gridCards}>
            <Card surface="default" elevation="xs">
              <strong className="type-label-medium-medium">
                surface=&quot;default&quot;
              </strong>
              <p className="type-paragraph-xsmall">
                White base surface with default border and shadow-xs.
              </p>
            </Card>
            <Card surface="default" glow elevation="xs">
              <strong className="type-label-medium-medium">
                surface=&quot;default&quot; + glow
              </strong>
              <p className="type-paragraph-xsmall">
                Used by AccessSummary and ProgramSignals right-rail panels.
              </p>
            </Card>
            <Card surface="brand" elevation="xs">
              <strong className="type-label-medium-medium">
                surface=&quot;brand&quot;
              </strong>
              <p className="type-paragraph-xsmall">
                Subtle off-white canvas (#f7fafa) used by CareAccess.
              </p>
            </Card>
            <Card surface="gradient" elevation="sm">
              <strong className="type-label-medium-medium">
                surface=&quot;gradient&quot;
              </strong>
              <p className="type-paragraph-xsmall">
                Warm orange-to-aqua brand gradient used by MetricCard and
                MetricWideBlock.
              </p>
            </Card>
          </div>
        </div>
      );

    case "p-checkbox":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Figma Checkbox Matrix (sm 16px &amp; md 20px)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <label className={styles.toggleRow}>
                <Checkbox
                  size="sm"
                  checked={checkLive}
                  onChange={(e) => setCheckLive(e.target.checked)}
                  label="Interactive small checkbox"
                />
                <span className="type-label-medium-small">
                  Click me (Interactive sm)
                </span>
              </label>
            </div>

            <div className={styles.specTableWrap}>
              <table className={styles.specTable}>
                <thead>
                  <tr className="type-label-medium-small">
                    <th>State</th>
                    <th>sm Off</th>
                    <th>sm Check</th>
                    <th>sm Dash</th>
                    <th>md Off</th>
                    <th>md Check</th>
                    <th>md Dash</th>
                  </tr>
                </thead>
                <tbody>
                  {(["default", "hover", "focused", "disabled"] as const).map(
                    (st) => (
                      <tr key={st}>
                        <td className="type-label-medium-small">{st}</td>
                        <td>
                          <Checkbox size="sm" state={st} readOnly label={`sm off ${st}`} />
                        </td>
                        <td>
                          <Checkbox size="sm" checked state={st} readOnly label={`sm check ${st}`} />
                        </td>
                        <td>
                          <Checkbox size="sm" indeterminate state={st} readOnly label={`sm dash ${st}`} />
                        </td>
                        <td>
                          <Checkbox size="md" state={st} readOnly label={`md off ${st}`} />
                        </td>
                        <td>
                          <Checkbox size="md" checked state={st} readOnly label={`md check ${st}`} />
                        </td>
                        <td>
                          <Checkbox size="md" indeterminate state={st} readOnly label={`md dash ${st}`} />
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "p-textfield":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            TextField States
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.gridCards}>
              <TextField
                id="ds-email-default"
                label="Interactive TextField"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
              />
              <TextField
                id="ds-email-disabled"
                label="Disabled TextField"
                value="locked@trilumenai.com"
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
      );

    case "p-navbutton":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Sidebar Links (Default, Active Route, Pill Badge)
          </h3>
          <div className={styles.canvasLight} style={{ maxWidth: 280 }}>
            <NavButton href="/samata-design-system" icon="home">
              Current Active Route
            </NavButton>
            <NavButton href="/analytics" icon="analytics">
              Analytics
            </NavButton>
            <NavButton href="/inbox" icon="inbox" badge={4}>
              Inbox (Pill Badge)
            </NavButton>
          </div>
        </div>
      );

    case "p-pill":
      return (
        <div className={styles.stage}>
          <div className={styles.docHeaderTop}>
            <h3 className="type-heading-h6">
              Pill Matrix — Property Toggles &amp; All Variants
            </h3>
            <div className={styles.flexWrap}>
              <label className={styles.toggleRow}>
                <Checkbox
                  size="sm"
                  checked={pillLeft}
                  onChange={(e) => setPillLeft(e.target.checked)}
                  label="Toggle left icon"
                />
                <span className="type-paragraph-xsmall">showLeftIcon</span>
              </label>
              <label className={styles.toggleRow}>
                <Checkbox
                  size="sm"
                  checked={pillText}
                  onChange={(e) => setPillText(e.target.checked)}
                  label="Toggle text"
                />
                <span className="type-paragraph-xsmall">showText</span>
              </label>
              <label className={styles.toggleRow}>
                <Checkbox
                  size="sm"
                  checked={pillRight}
                  onChange={(e) => setPillRight(e.target.checked)}
                  label="Toggle right icon"
                />
                <span className="type-paragraph-xsmall">showRightIcon</span>
              </label>
            </div>
          </div>

          <div className={styles.canvasLight}>
            <strong className="type-label-medium-small">
              variant=&quot;display&quot; (Status Tags &amp; Average Setup)
            </strong>
            <div className={styles.flexWrap}>
              <Pill variant="display" tone="plain" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight}>
                Plain
              </Pill>
              <Pill variant="display" tone="success" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight}>
                Active
              </Pill>
              <Pill variant="display" tone="info" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight}>
                Pending
              </Pill>
              <Pill variant="display" tone="warning" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight}>
                Grace Period
              </Pill>
              <Pill variant="display" tone="error" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight}>
                Error
              </Pill>
            </div>

            <strong className="type-label-medium-small">
              variant=&quot;action&quot; (KPI Deltas &amp; Interactive Chips)
            </strong>
            <div className={styles.flexWrap}>
              <Pill variant="action" tone="plain" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight}>
                Plain
              </Pill>
              <Pill variant="action" tone="success" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight} rightIcon="arrow-up-right">
                12%
              </Pill>
              <Pill variant="action" tone="error" showLeftIcon={pillLeft} showText={pillText} showRightIcon={pillRight} rightIcon="arrow-down-right">
                1.25%
              </Pill>
            </div>

            <strong className="type-label-medium-small">
              variant=&quot;hash&quot;
            </strong>
            <div className={styles.flexWrap}>
              <Pill variant="hash">HASH</Pill>
              <Pill variant="hash">HRIS SYNC</Pill>
            </div>
          </div>
        </div>
      );

    case "p-progressbar":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Progress Steps (0%, 35%, 68%, 100%)
          </h3>
          <div className={styles.canvasLight} style={{ maxWidth: 360 }}>
            <ProgressBar label="Empty progress" value={0} />
            <ProgressBar label="Low progress" value={35} />
            <ProgressBar label="Target progress" value={68} />
            <ProgressBar label="Complete progress" value={100} />
          </div>
        </div>
      );

    case "p-searchinput":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Pill SearchInput States
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <SearchInput
                label="Compact toolbar search"
                placeholder="Search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{ width: 160 }}
              />
              <SearchInput
                label="Wide header search"
                placeholder="Try adoption or sessions"
                style={{ width: 280 }}
              />
            </div>
          </div>
        </div>
      );

    case "p-sectionheader":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            SectionHeader Configurations
          </h3>
          <div className={styles.canvasLight}>
            <SectionHeader icon="sparkles" title="With Leading Icon" />
            <SectionHeader
              icon="gantt-chart"
              title="With Trailing Action Slot"
              action={
                <Button variant="secondary" size="xs">
                  Action
                </Button>
              }
            />
          </div>
        </div>
      );

    case "p-select":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Select Variants (inline &amp; pill)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <Select
                label="Inline selector"
                variant="inline"
                value={selectVal}
                options={[
                  { value: "all", label: "Overall Sessions" },
                  { value: "video", label: "Video Only" },
                ]}
                onChange={setSelectVal}
              />
              <Select
                label="Pill selector"
                variant="pill"
                value={selectVal}
                options={[
                  { value: "all", label: "All Departments" },
                  { value: "video", label: "Engineering" },
                ]}
                onChange={setSelectVal}
              />
              <Select
                label="Pill selector with icon"
                variant="pill"
                leftIcon="calendar"
                value={selectVal}
                options={[
                  { value: "all", label: "Jan 01 - July 31" },
                  { value: "video", label: "Aug 01 - Dec 31" },
                ]}
                onChange={setSelectVal}
              />
            </div>
          </div>
        </div>
      );

    case "p-tilebutton":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            TileButton Configurations
          </h3>
          <div className={styles.gridCards}>
            <TileButton
              icon="invite"
              title="Invite employees"
              description="Add individually or bulk upload"
              onClick={() => {}}
            />
            <TileButton
              title="Without Leading Icon"
              description="Clean compact action tile"
              onClick={() => {}}
            />
          </div>
        </div>
      );

    default:
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Toggle Switch States (Interactive + Disabled)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <div className={styles.stackMd}>
                <Toggle
                  checked={toggleLive}
                  onCheckedChange={setToggleLive}
                  label="Interactive switch"
                />
                <code className="type-paragraph-xsmall">
                  Interactive ({toggleLive ? "On" : "Off"})
                </code>
              </div>
              <div className={styles.stackMd}>
                <Toggle defaultChecked={false} label="Default unchecked" />
                <code className="type-paragraph-xsmall">Unchecked</code>
              </div>
              <div className={styles.stackMd}>
                <Toggle defaultChecked disabled label="Disabled checked" />
                <code className="type-paragraph-xsmall">Disabled</code>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
