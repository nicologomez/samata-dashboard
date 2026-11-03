import styles from "./ProgressBar.module.css";

type ProgressBarProps = { label: string; value: number; max?: number };
export function ProgressBar({ label, value, max = 100 }: ProgressBarProps) {
  return (
    <progress
      className={styles.progress}
      aria-label={label}
      value={Math.min(max, Math.max(0, value))}
      max={max}
    />
  );
}
