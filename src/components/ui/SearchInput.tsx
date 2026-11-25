import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";
import styles from "./SearchInput.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

/** Pill-shaped search input atom reusable across toolbars and data tables. */
export function SearchInput({
  label,
  placeholder = "Search",
  className = "",
  ...props
}: Props) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span className={styles.visuallyHidden}>{label}</span>
      <input
        type="search"
        placeholder={placeholder}
        className={`${styles.input} type-paragraph-xsmall`}
        {...props}
      />
      <Icon name="search" size={16} className={styles.icon} />
    </label>
  );
}
