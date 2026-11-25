import styles from "./PlaceholderPage.module.css";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className={styles.page}>
      <h2 className="type-heading-h5">{title}</h2>
      <p className="type-paragraph-small">
        This employer demo route awaits its own Figma frame.
      </p>
    </main>
  );
}
