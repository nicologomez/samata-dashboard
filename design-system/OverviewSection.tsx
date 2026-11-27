import { Pill } from "@/components/ui/Pill";
import styles from "./DesignSystemHub.module.css";

type Props = {
  itemId: string;
};

/** Clear, concise architectural guide explaining why folders are separated and how portals stay scalable. */
export function OverviewSection({ itemId }: Props) {
  if (itemId === "ov-architecture") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          Why These Folders Are Separated (Zero Confusion Guide)
        </h3>

        <div className={styles.gridCards}>
          <article className={styles.archCard}>
            <Pill variant="hash">src/components/ui/ vs patterns/</Pill>
            <h4 className="type-heading-h7">Atoms vs. Molecules</h4>
            <ul className="type-paragraph-small">
              <li>
                <strong>ui/ (Primitives / Atoms):</strong> Single building
                blocks (<code>Button</code>, <code>Pill</code>,{" "}
                <code>Checkbox</code>, <code>Avatar</code>). They do NOT know
                about KPIs, charts, or tables.
              </li>
              <li>
                <strong>patterns/ (Molecules):</strong> Combine multiple atoms
                into reusable layouts (<code>MetricCard</code>,{" "}
                <code>MetricWideBlock</code>, <code>DataTable</code>,{" "}
                <code>TrendChart</code>). Still domain-blind, so{" "}
                <code>DataTable</code> works for Employees, Billing, and Audit
                logs alike.
              </li>
            </ul>
          </article>

          <article className={styles.archCard}>
            <Pill variant="hash">components/layout/ vs features/</Pill>
            <h4 className="type-heading-h7">Outer Chrome vs. Inner Widgets</h4>
            <ul className="type-paragraph-small">
              <li>
                <strong>components/layout/ (Chrome):</strong> Domain-blind
                app frame (<code>PortalShell</code>, <code>Sidebar</code>,{" "}
                <code>Header</code>) wrapping *every* page. Employer only adds a
                thin <code>EmployerShell</code> config adapter.
              </li>
              <li>
                <strong>features/ (Organisms):</strong> Domain-aware widgets (
                <code>AtAGlance</code>, <code>EmployeeList</code>,{" "}
                <code>AccessSummary</code>, <code>BenefitHealth</code>) sitting
                *inside* the page canvas and binding real business data models.
              </li>
            </ul>
          </article>

          <article className={styles.archCard}>
            <Pill variant="hash">views/&lt;portal&gt;/ vs (portal)/layout.tsx</Pill>
            <h4 className="type-heading-h7">Page Grid vs. Route Door</h4>
            <ul className="type-paragraph-small">
              <li>
                <strong>app/(employer)/layout.tsx:</strong> Next.js shared outer
                chrome loaded once across <code>/</code>,{" "}
                <code>/analytics</code>, <code>/employees</code>, etc. The{" "}
                <code>(employer)</code> parentheses organize routes in code
                without adding <code>/employer/</code> to the URL.
              </li>
              <li>
                <strong>views/employer/*View.tsx:</strong> Pure page layout
                template arranging each screen&apos;s inner grid (left{" "}
                <code>1fr</code> + right <code>270px</code> rail) and responsive
                breakpoints independently of Next.js data-fetching.
              </li>
            </ul>
          </article>
        </div>
      </div>
    );
  }

  if (itemId === "ov-ownership") {
    return (
      <div className={styles.stage}>
        <h3 className={`${styles.stageSubhead} type-heading-h6`}>
          Commonalities vs. Portal-Exclusive Split
        </h3>
        <div className={styles.gridCards}>
          <article className={styles.archCard}>
            <Pill
              variant="display"
              tone="success"
              showLeftIcon
              showRightIcon={false}
            >
              Universal (All Portals)
            </Pill>
            <ul className="type-paragraph-small">
              <li>
                <code>src/styles/</code> (tokens, typography, gradients,
                effects)
              </li>
              <li>
                <code>src/components/ui/</code> (12 core primitives)
              </li>
              <li>
                <code>src/components/patterns/</code> (7 data/KPI templates)
              </li>
              <li>
                <code>PortalShell</code>, <code>Sidebar</code>,{" "}
                <code>Header</code>, <code>PlaceholderPage</code>
              </li>
              <li>
                <code>src/types/common.ts</code> &amp;{" "}
                <code>src/lib/metrics.ts</code>
              </li>
            </ul>
          </article>

          <article className={styles.archCard}>
            <Pill
              variant="display"
              tone="info"
              showLeftIcon
              showRightIcon={false}
            >
              Employer-Exclusive
            </Pill>
            <ul className="type-paragraph-small">
              <li>
                <code>EmployerShell</code> + <code>src/config/navigation.ts</code>
              </li>
              <li>
                <code>src/views/employer/*</code> (Dashboard, Analytics,
                Employees)
              </li>
              <li>
                <code>src/features/dashboard/*</code> (CareAccess, TaskList,
                EmployeeParticipation)
              </li>
              <li>
                <code>src/features/analytics/*</code> &amp;{" "}
                <code>src/features/employees/*</code>
              </li>
              <li>
                <code>src/data/employer*</code> &amp;{" "}
                <code>src/types/employer*</code>
              </li>
            </ul>
          </article>

          <article className={styles.archCard}>
            <Pill
              variant="display"
              tone="warning"
              showLeftIcon
              showRightIcon={false}
            >
              Future Employee / Therapist Ready
            </Pill>
            <ul className="type-paragraph-small">
              <li>
                Add <code>src/app/(employee)/layout.tsx</code> wrapping{" "}
                <code>PortalShell</code> with Employee nav links.
              </li>
              <li>
                Place Employee views in <code>src/views/employee/</code> &amp;
                custom widgets in <code>src/features/care/</code>.
              </li>
              <li>
                Reuse 100% of Buttons, Pills, Checkboxes, DataTable, TrendChart,
                MetricCards without duplicating CSS.
              </li>
            </ul>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stage}>
      <h3 className={`${styles.stageSubhead} type-heading-h6`}>
        Codebase Hygiene Executed &amp; Recommended Next Builds
      </h3>
      <div className={styles.gridCards}>
        <article className={styles.archCard}>
          <Pill
            variant="display"
            tone="success"
            showLeftIcon
            showRightIcon={false}
          >
            Cleaned &amp; Fixed Now
          </Pill>
          <ul className="type-paragraph-small">
            <li>
              Removed unused orphan UI (<code>Toast</code>, <code>Tooltip</code>
              , dead <code>FormControls</code> exports).
            </li>
            <li>
              Fixed <code>gradients.css</code> broken refs (
              <code>--color-aqua-aqua-50</code>, <code>--color-white-*</code>)
              and removed scratch tokens (<code>--test*</code>,{" "}
              <code>--soc5</code>).
            </li>
            <li>
              Fixed syntax typo in <code>effects.css</code> (leading{" "}
              <code>s </code>).
            </li>
            <li>
              Removed phantom <code>&quot;settings&quot;</code> icon name from{" "}
              <code>Icon.tsx</code>.
            </li>
          </ul>
        </article>

        <article className={styles.archCard}>
          <Pill
            variant="display"
            tone="info"
            showLeftIcon
            showRightIcon={false}
          >
            Refactored Architecture
          </Pill>
          <ul className="type-paragraph-small">
            <li>
              Extracted portal-agnostic <code>PortalShell</code>,{" "}
              <code>Sidebar</code>, and <code>Header</code>; reduced{" "}
              <code>EmployerShell</code> to a thin config adapter.
            </li>
            <li>
              Replaced <code>Header</code> raw search input with{" "}
              <code>SearchInput</code> &amp; added <code>plus</code> icon CTA.
            </li>
            <li>
              Replaced <code>NavButton</code> inline badge CSS with Figma{" "}
              <code>Pill</code>.
            </li>
          </ul>
        </article>

        <article className={styles.archCard}>
          <Pill
            variant="display"
            tone="warning"
            showLeftIcon
            showRightIcon={false}
          >
            Recommended Next Components
          </Pill>
          <ul className="type-paragraph-small">
            <li>
              <strong>ActionMenu:</strong> Popover menu for the table 3-dot row
              button and Filter trigger.
            </li>
            <li>
              <strong>Modal / Dialog Shell:</strong> Reusable dialog container
              extracted from <code>AddEmployeeDialog</code>.
            </li>
            <li>
              <strong>EmptyState:</strong> Clean zero-data card when searches or
              filters return 0 rows.
            </li>
            <li>
              <strong>ToggleSwitch:</strong> Needed when{" "}
              <code>/integrations</code> and <code>/settings</code> start.
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
