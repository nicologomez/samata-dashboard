"use client";
import { useId, type ReactNode } from "react";
import styles from "./Tooltip.module.css";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <span className={styles.wrapper}>
      <button type="button" aria-describedby={id} className={styles.trigger}>
        {children}
      </button>
      <span role="tooltip" id={id} className={styles.bubble}>
        {label}
      </span>
    </span>
  );
}
