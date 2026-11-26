import type {
  DesignSystemEntry,
  HealthStatus,
  PortalScope,
} from "./catalog";
import { Pill, type PillTone } from "@/components/ui/Pill";
import styles from "./DesignSystemHub.module.css";

const statusMeta: Record<HealthStatus, { label: string; tone: PillTone }> = {
  proper: { label: "Proper", tone: "success" },
  "needs-fix": { label: "Needs Fix", tone: "error" },
  refactor: { label: "Needs Refactor", tone: "warning" },
  unused: { label: "Unused / Scrap Candidate", tone: "info" },
  planned: { label: "Planned / To Build", tone: "plain" },
};

const scopeMeta: Record<PortalScope, string> = {
  universal: "Universal (All Portals)",
  "employer-exclusive": "Employer-Exclusive",
  "shared-chrome": "Shared Chrome (Decouple Soon)",
  "future-multi-portal": "Multi-Portal Roadmap",
};

type Props = {
  entries: readonly DesignSystemEntry[];
  title?: string;
};

/** IBM-style specification and audit cards listing source paths, portal ownership, guidance, and technical audit notes. */
export function AuditInventoryList({
  entries,
  title = "Component Specification & Audit Log",
}: Props) {
  if (entries.length === 0) {
    return (
      <section className={styles.panel}>
        <h2 className="type-heading-h6">{title}</h2>
        <p className="type-paragraph-small">
          No entries match the current filter criteria.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className="type-heading-h5">{title}</h2>
        <p className="type-paragraph-small">
          Architecture classification, ownership scope, and codebase health
          status ({entries.length} items).
        </p>
      </div>

      <div className={styles.auditGrid}>
        {entries.map((entry) => {
          const st = statusMeta[entry.status];
          return (
            <article key={entry.id} className={styles.auditCard}>
              <div className={styles.auditTop}>
                <div>
                  <div className={styles.auditTitleRow}>
                    <h3 className="type-heading-h7">{entry.name}</h3>
                    <Pill
                      variant="display"
                      tone={st.tone}
                      showLeftIcon
                      showRightIcon={false}
                    >
                      {st.label}
                    </Pill>
                  </div>
                  <div className={styles.auditMetaTags}>
                    <span className="type-label-medium-small">
                      {entry.atomicLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="type-label-medium-small">
                      {scopeMeta[entry.scope]}
                    </span>
                  </div>
                </div>
                <code className={`${styles.pathCode} type-paragraph-xsmall`}>
                  {entry.sourcePath}
                </code>
              </div>

              <p className="type-paragraph-small">{entry.summary}</p>

              <div className={styles.auditDetails}>
                <div>
                  <strong className="type-label-medium-small">
                    Usage Standard
                  </strong>
                  <p className="type-paragraph-xsmall">{entry.guidance}</p>
                </div>
                <div>
                  <strong className="type-label-medium-small">
                    Engineering Audit
                  </strong>
                  <p className="type-paragraph-xsmall">{entry.auditNote}</p>
                </div>
              </div>

              <div className={styles.usedByRow}>
                <span className="type-label-medium-small">Used by:</span>
                {entry.usedBy.map((consumer) => (
                  <Pill key={consumer} variant="hash">
                    {consumer}
                  </Pill>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
