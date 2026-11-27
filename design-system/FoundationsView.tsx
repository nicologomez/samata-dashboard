"use client";

import { useState } from "react";
import { Icon, iconNames } from "@/components/ui/Icon";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  allTypographyClasses,
  effectTokens,
  gradientTokens,
  primitivePalettes,
  radiusTokens,
  semanticTokenGroups,
  spacingTokens,
  strokeTokens,
} from "./registry";
import styles from "./DesignSystemHub.module.css";

type Props = {
  itemId: string;
};

/** Renders complete Subatomic Foundations documentation for the selected rail item. */
export function FoundationsView({ itemId }: Props) {
  const [iconQuery, setIconQuery] = useState("");

  if (itemId === "f-primitives") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          Complete Primitive Color Ramps (7 Palettes + Alpha)
        </h3>
        {primitivePalettes.map((group) => (
          <div key={group.family} className={styles.stackMd}>
            <h4 className="type-label-medium-medium">{group.family}</h4>
            <div className={styles.gridAuto}>
              {group.stops.map((stop) => (
                <div key={stop.token} className={styles.swatchCard}>
                  <span
                    className={styles.swatchChip}
                    style={{ background: `var(${stop.token})` }}
                  />
                  <div className={styles.swatchMeta}>
                    <strong className="type-label-medium-small">
                      {stop.step}
                    </strong>
                    <code className="type-paragraph-xsmall">{stop.hex}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (itemId === "f-semantic") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          All Semantic Role Tokens (Light &amp; Dark Theme Aliases)
        </h3>
        {semanticTokenGroups.map((grp) => (
          <div key={grp.group} className={styles.stackMd}>
            <h4 className="type-label-medium-medium">{grp.group}</h4>
            <div className={styles.specTableWrap}>
              <table className={styles.specTable}>
                <thead>
                  <tr className="type-label-medium-small">
                    <th>Preview</th>
                    <th>CSS Custom Property</th>
                    <th>Light Value</th>
                    <th>Dark Theme Alias</th>
                  </tr>
                </thead>
                <tbody>
                  {grp.tokens.map((row) => (
                    <tr key={row.token}>
                      <td>
                        <span
                          className={styles.swatchChip}
                          style={{
                            width: 28,
                            height: 20,
                            borderRadius: "var(--radius-xs)",
                            border: "1px solid var(--border-default)",
                            background: `var(${row.token})`,
                          }}
                        />
                      </td>
                      <td>
                        <code className="type-label-medium-small">
                          {row.token}
                        </code>
                      </td>
                      <td className="type-paragraph-xsmall">{row.light}</td>
                      <td className="type-paragraph-xsmall">{row.dark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (itemId === "f-typography") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          All Typography Utility Classes ({allTypographyClasses.length})
        </h3>
        <div className={styles.stackMd}>
          {allTypographyClasses.map((item) => (
            <div
              key={item.cls}
              style={{
                paddingBottom: "var(--space-xl)",
                borderBottom: "var(--stroke-sm) solid var(--border-subtle)",
                display: "grid",
                gap: "var(--space-xs)",
              }}
            >
              <div className={styles.flexWrap}>
                <code className="type-label-medium-small">.{item.cls}</code>
                <span
                  className="type-paragraph-xsmall"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.spec}
                </span>
              </div>
              <p className={item.cls}>{item.sample}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (itemId === "f-spacing") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          Semantic Spacing Scale
        </h3>
        <div className={styles.stackMd}>
          {spacingTokens.map((sp) => (
            <div key={sp.token} className={styles.matrixRow}>
              <div>
                <code className="type-label-medium-small">{sp.token}</code>
                <div
                  className="type-paragraph-xsmall"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {sp.px} ({sp.alias})
                </div>
              </div>
              <div>
                <span
                  className={styles.spaceBar}
                  style={{ width: `var(${sp.token})` }}
                />
              </div>
            </div>
          ))}
        </div>

        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          Border Radii &amp; Strokes
        </h3>
        <div className={styles.gridAuto}>
          {radiusTokens.map((rad) => (
            <div key={rad.token} className={styles.archCard}>
              <div
                style={{
                  height: 36,
                  background: "var(--bg-brand-subtle)",
                  border: "1px solid var(--border-brand)",
                  borderRadius: `var(${rad.token})`,
                }}
              />
              <code className="type-label-medium-small">{rad.token}</code>
              <span className="type-paragraph-xsmall">{rad.px}</span>
            </div>
          ))}
          {strokeTokens.map((st) => (
            <div key={st.token} className={styles.archCard}>
              <div
                style={{
                  height: 0,
                  marginBlock: 16,
                  borderTop: `var(${st.token}) solid var(--border-brand)`,
                }}
              />
              <code className="type-label-medium-small">{st.token}</code>
              <span className="type-paragraph-xsmall">{st.px}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (itemId === "f-effects") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          All Cleaned Surface Gradients ({gradientTokens.length})
        </h3>
        <div className={styles.gridCards}>
          {gradientTokens.map((token) => (
            <div
              key={token}
              className={styles.archCard}
              style={{ background: `var(${token})` }}
            >
              <code className="type-label-medium-small">{token}</code>
            </div>
          ))}
        </div>

        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          Shadows &amp; Focus Rings ({effectTokens.length})
        </h3>
        <div className={styles.gridCards}>
          {effectTokens.map((eff) => (
            <div
              key={eff.token}
              className={styles.archCard}
              style={{
                background: "var(--bg-primary)",
                boxShadow: `var(${eff.token})`,
              }}
            >
              <code className="type-label-medium-small">{eff.token}</code>
              <span className="type-paragraph-xsmall">{eff.role}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredIcons = iconNames.filter((name) =>
    name.includes(iconQuery.trim().toLowerCase()),
  );

  return (
    <div className={styles.stage}>
      <div className={styles.docHeaderTop}>
        <h3 className="type-heading-h6">
          Registered Icons ({filteredIcons.length} / {iconNames.length})
        </h3>
        <SearchInput
          label="Filter registered icons"
          placeholder="Search icons..."
          value={iconQuery}
          onChange={(e) => setIconQuery(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <div className={styles.gridAuto}>
        {filteredIcons.map((name) => (
          <div key={name} className={styles.iconTile}>
            <Icon name={name} size={24} />
            <code className="type-paragraph-xsmall">{name}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
