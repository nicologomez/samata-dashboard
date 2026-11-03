"use client";
import type { Period } from "@/types/dashboard";
import styles from "./PeriodSelect.module.css";

type Props = {
  label: string;
  value: Period;
  onChange: (value: Period) => void;
};
export function PeriodSelect({ label, value, onChange }: Props) {
  return (
    <label className={styles.field}>
      <span className={styles.visuallyHidden}>{label}</span>
      <select
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
