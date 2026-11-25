"use client";

import type { Period } from "@/types/common";
import { Icon } from "./Icon";
import styles from "./PeriodSelect.module.css";

const periodLabels: Record<Period, string> = {
  monthly: "Monthly",
  weekly: "Weekly",
  daily: "Daily",
};

type Props = {
  label: string;
  value: Period;
  onChange: (value: Period) => void;
};

/** Hug-content period dropdown preserving native <select> keyboard and mobile picker behavior. */
export function PeriodSelect({ label, value, onChange }: Props) {
  return (
    <label className={styles.field}>
      <span className={styles.visuallyHidden}>{label}</span>
      <span
        aria-hidden="true"
        className={`${styles.display} type-label-medium-small`}
      >
        <span>{periodLabels[value]}</span>
        <Icon name="chevron-down" size={16} className={styles.chevron} />
      </span>
      <select
        className={styles.select}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value as Period)}
      >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>
    </label>
  );
}
