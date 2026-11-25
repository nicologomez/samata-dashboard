import styles from "./Avatar.module.css";

type Props = {
  name: string;
  size?: 32 | 36 | 40;
};

export function Avatar({ name, size = 40 }: Props) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const labelType =
    size === 32 ? "type-label-medium-small" : "type-label-medium-large";

  return (
    <span
      className={`${styles.avatar} ${labelType}`}
      data-size={size}
      aria-label={name}
      title={name}
    >
      {initials}
    </span>
  );
}
