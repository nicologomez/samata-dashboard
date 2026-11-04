import styles from "./Toast.module.css";

export function Toast({
  message,
  tone = "success",
}: {
  message: string;
  tone?: "success" | "error";
}) {
  return (
    <output
      role="status"
      className={`${styles.toast} ${styles[tone]} type-paragraph-small`}
    >
      {message}
    </output>
  );
}
