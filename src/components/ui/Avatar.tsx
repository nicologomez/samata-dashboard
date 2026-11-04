import styles from "./Avatar.module.css";

type Props = {
  name: string;
  size?: 36 | 40;
};

export function Avatar({ name, size = 40 }: Props) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <span
      className={`${styles.avatar} type-label-medium-large`}
      data-size={size}
      aria-label={name}
      title={name}
    >
      {initials}
    </span>
  );
}
