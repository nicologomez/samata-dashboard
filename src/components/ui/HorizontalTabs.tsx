"use client";
import type { KeyboardEvent } from "react";
import styles from "./HorizontalTabs.module.css";

type Tab = { readonly id: string; readonly label: string };
export function HorizontalTabs({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly Tab[];
  value: string;
  onChange: (id: string) => void;
}) {
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + offset + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    const buttons =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        "button[role=tab]",
      );
    buttons?.[next]?.focus();
  }
  return (
    <div role="tablist" className={styles.tabs} aria-label="Section tabs">
      {tabs.map((tab, index) => (
        <button
          className="type-label-medium-medium"
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={value === tab.id}
          tabIndex={value === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
