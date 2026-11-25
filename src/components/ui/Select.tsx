"use client";

import type { SelectOption } from "@/types/common";
import { Icon, type IconName } from "./Icon";
import styles from "./Select.module.css";

type Props<T extends string> = {
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  variant?: "inline" | "pill";
  leftIcon?: IconName;
  className?: string;
};

/** Hug-content native <select> supporting inline label and rounded pill triggers. */
export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  variant = "inline",
  leftIcon,
  className = "",
}: Props<T>) {
  const activeLabel =
    options.find((option) => option.value === value)?.label ?? value;

  return (
    <label
      className={`${styles.field} ${styles[`variant-${variant}`]} ${className}`}
    >
      <span className={styles.visuallyHidden}>{label}</span>
      <span
        aria-hidden="true"
        className={`${styles.display} type-label-medium-small`}
      >
        {leftIcon && (
          <Icon name={leftIcon} size={16} className={styles.leftIcon} />
        )}
        <span>{activeLabel}</span>
        <Icon name="chevron-down" size={16} className={styles.chevron} />
      </span>
      <select
        className={styles.select}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
