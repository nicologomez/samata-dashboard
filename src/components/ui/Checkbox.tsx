"use client";

import { useEffect, useRef, type InputHTMLAttributes } from "react";
import { Icon } from "./Icon";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "sm" | "md";
export type CheckboxState = "default" | "hover" | "focused" | "disabled";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label: string;
  size?: CheckboxSize;
  indeterminate?: boolean;
  state?: CheckboxState;
};

/** Figma Checkbox atom supporting sm/md sizes, checked/dash/off states, and focus/hover/disabled styling. */
export function Checkbox({
  label,
  size = "sm",
  checked = false,
  indeterminate = false,
  state,
  disabled = false,
  className = "",
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = disabled || state === "disabled";
  const visualCheck = indeterminate ? "dash" : checked ? "check" : "off";

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <span
      className={`${styles.root} ${styles[size]} ${className}`}
      data-checked={visualCheck}
      data-size={size}
      data-state={state}
      data-disabled={isDisabled ? "true" : undefined}
    >
      <input
        ref={inputRef}
        type="checkbox"
        aria-label={label}
        checked={checked}
        disabled={isDisabled}
        className={styles.input}
        {...rest}
      />
      <span className={styles.box} aria-hidden="true">
        {visualCheck === "check" && (
          <Icon name="check" size={size === "md" ? 14 : 12} />
        )}
        {visualCheck === "dash" && (
          <Icon name="minus" size={size === "md" ? 14 : 12} />
        )}
      </span>
    </span>
  );
}
