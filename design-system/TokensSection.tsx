import {
  primitivePalettes,
  semanticTokensSample,
  typographySpecimens,
} from "./catalog";
import styles from "./DesignSystemHub.module.css";

type Props = {
  activeCategory: string | null;
};

/** Live showcase of Subatomic Design Tokens: color ramps, semantic aliases, typography, spacing, and gradients. */
export function TokensSection({ activeCategory }: Props) {
  const show = (category: string) =>
    !activeCategory || activeCategory === category;

  return (
    <div className={styles.sectionStack}>
      {show("Color Primitives") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Color Primitives</h2>
            <p className="type-paragraph-small">
              Raw palette stops defined in <code>src/styles/tokens.css</code>.
              Avoid referencing numeric stops directly in feature CSS when a
              semantic role token exists.
            </p>
          </div>
          <div className={styles.paletteGroups}>
            {primitivePalettes.map((group) => (
              <div key={group.family} className={styles.paletteGroup}>
                <h3 className="type-label-medium-medium">{group.family}</h3>
                <div className={styles.swatchGrid}>
                  {group.stops.map((stop) => (
                    <div key={stop.token} className={styles.swatchCard}>
                      <span
                        className={styles.swatchColor}
                        style={{ background: `var(${stop.token})` }}
                      />
                      <div className={styles.swatchMeta}>
                        <strong className="type-label-medium-small">
                          {stop.step}
                        </strong>
                        <code className="type-paragraph-xsmall">
                          {stop.hex}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {show("Semantic Tokens") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Semantic Role Tokens</h2>
            <p className="type-paragraph-small">
              Purpose-bound variables that flip automatically between Light and
              Dark mode (<code>[data-theme=&quot;dark&quot;]</code>).
            </p>
          </div>
          <div className={styles.tokenTable}>
            {semanticTokensSample.map((row) => (
              <div key={row.token} className={styles.tokenRow}>
                <span
                  className={styles.tokenChip}
                  style={{ background: `var(${row.token})` }}
                />
                <code className="type-label-medium-small">{row.token}</code>
                <span className="type-paragraph-xsmall">{row.role}</span>
                <code className="type-paragraph-xsmall">{row.value}</code>
              </div>
            ))}
          </div>
        </section>
      )}

      {show("Typography Scale") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Typography Scale</h2>
            <p className="type-paragraph-small">
              Dual-type pairing from <code>src/styles/typography.css</code>:
              <strong> Poppins</strong> for UI hierarchy & labels;{" "}
              <strong>Besley</strong> for editorial KPI numerals and hero
              accents.
            </p>
          </div>
          <div className={styles.typeList}>
            {typographySpecimens.map((item) => (
              <div key={item.cls} className={styles.typeRow}>
                <div className={styles.typeMeta}>
                  <code className="type-label-medium-small">.{item.cls}</code>
                  <span className="type-paragraph-xsmall">{item.label}</span>
                </div>
                <p className={item.cls}>{item.sample}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {show("Spacing & Radii") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Spacing & Border Radii</h2>
            <p className="type-paragraph-small">
              Consistent spatial rhythm (--space-xxs 2px through --space-7xl
              48px) and corner radii tokens.
            </p>
          </div>
          <div className={styles.scaleGrid}>
            {[
              { name: "--space-xs", px: "4px" },
              { name: "--space-md", px: "8px" },
              { name: "--space-xl", px: "12px" },
              { name: "--space-2xl", px: "16px" },
              { name: "--space-4xl", px: "24px" },
              { name: "--space-5xl", px: "32px" },
              { name: "--space-7xl", px: "48px" },
            ].map((sp) => (
              <div key={sp.name} className={styles.scaleItem}>
                <code className="type-label-medium-small">{sp.name}</code>
                <span
                  className={styles.scaleBar}
                  style={{ width: `var(${sp.name})` }}
                />
                <span className="type-paragraph-xsmall">{sp.px}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {show("Gradients & Effects") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Gradients, Shadows & Style Audit</h2>
            <p className="type-paragraph-small">
              Active brand surfaces alongside concrete cleanup items spotted in{" "}
              <code>gradients.css</code> and <code>effects.css</code>.
            </p>
          </div>
          <div className={styles.gradientGrid}>
            <div
              className={styles.gradientCard}
              style={{ background: "var(--gradient-brand-orange50-aqua50)" }}
            >
              <strong className="type-label-medium-medium">
                Brand Warm Banner
              </strong>
              <code className="type-paragraph-xsmall">
                --gradient-brand-orange50-aqua50
              </code>
            </div>
            <div
              className={styles.gradientCard}
              style={{ background: "var(--gradient-aqua-50-100)" }}
            >
              <strong className="type-label-medium-medium">
                Aqua Status Disc
              </strong>
              <code className="type-paragraph-xsmall">
                --gradient-aqua-50-100
              </code>
            </div>
            <div
              className={styles.gradientCard}
              style={{
                background: "var(--bg-primary)",
                boxShadow: "var(--effect-shadows-shadow-md)",
              }}
            >
              <strong className="type-label-medium-medium">
                Elevated Panel
              </strong>
              <code className="type-paragraph-xsmall">
                --effect-shadows-shadow-md
              </code>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
