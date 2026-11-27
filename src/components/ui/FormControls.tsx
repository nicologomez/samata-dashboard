import type { InputHTMLAttributes } from "react";
import styles from "./FormControls.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

/** Labeled single-line text input primitive for modal and settings forms. */
export function TextField({ label, id, ...inputProps }: InputProps) {
  if (!id) {
    throw new Error("TextField requires a stable id for label association.");
  }

  return (
    <label className={`${styles.stack} type-label-medium-small`} htmlFor={id}>
      {label}
      <input id={id} className="type-paragraph-small" {...inputProps} />
    </label>
  );
}
