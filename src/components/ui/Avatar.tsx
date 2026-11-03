import styles from "./Avatar.module.css";

export function Avatar({ name }: { name: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  return (
    <span className={styles.avatar} aria-label={name} title={name}>
      {initials}
    </span>
  );
}
