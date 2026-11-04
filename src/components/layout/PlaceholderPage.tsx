export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main style={{ padding: 24 }}>
      <h2 className="type-heading-h5">{title}</h2>
      <p className="type-paragraph-small">
        This employer demo route awaits its own Figma frame.
      </p>
    </main>
  );
}
