"use client";

import { useState } from "react";
import styles from "./Toggle.module.css";

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
  className?: string;
};

/** Universal pill switch atom (40x20) following Figma Toggle (524:3368). */
export function Toggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label = "Toggle setting",
  id,
  className = "",
}: Props) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  function handleClick() {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  }

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      data-checked={isChecked ? "true" : "false"}
      className={`${styles.toggle} ${className}`}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
}
