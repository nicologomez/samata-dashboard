import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import styles from "./FormControls.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };
export function TextField({ label, id, ...inputProps }: InputProps) {
  if (!id)
    throw new Error("TextField requires a stable id for label association.");
  return (
    <label className={styles.stack} htmlFor={id}>
      {label}
      <input id={id} {...inputProps} />
    </label>
  );
}
export function CheckboxField({ label, ...props }: InputProps) {
  return (
    <label className={styles.choice}>
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}
export function RadioField({ label, ...props }: InputProps) {
  return (
    <label className={styles.choice}>
      <input type="radio" {...props} />
      {label}
    </label>
  );
}
export function ToggleField({
  label,
  checked,
  onChange,
  ...props
}: Omit<InputProps, "onChange"> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.choice}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        {...props}
      />
      {label}
    </label>
  );
}
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
};
export function SelectField({ label, children, id, ...props }: SelectProps) {
  if (!id)
    throw new Error("SelectField requires a stable id for label association.");
  return (
    <label className={styles.stack} htmlFor={id}>
      {label}
      <select id={id} {...props}>
        {children}
      </select>
    </label>
  );
}
