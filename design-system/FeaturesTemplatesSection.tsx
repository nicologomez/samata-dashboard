import { designSystemEntries } from "./catalog";
import { Pill } from "@/components/ui/Pill";
import styles from "./DesignSystemHub.module.css";

type Props = {
  activeCategory: string | null;
};

/** Architecture comparison matrices and Codebase Health Scorecard for Templates & Portals. */
export function FeaturesTemplatesSection({ activeCategory }: Props) {
  const show = (category: string) =>
    !activeCategory || activeCategory === category;

  const grouped = {
    proper: designSystemEntries.filter((e) => e.status === "proper"),
    needsFix: designSystemEntries.filter((e) => e.status === "needs-fix"),
    refactor: designSystemEntries.filter((e) => e.status === "refactor"),
    unused: designSystemEntries.filter((e) => e.status === "unused"),
    planned: designSystemEntries.filter((e) => e.status === "planned"),
  };

  return (
    <div className={styles.sectionStack}>
      {show("Commonality vs. Exclusive Matrix") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">
              Commonalities vs. Employer-Exclusive Architecture
            </h2>
            <p className="type-paragraph-small">
              Clear separation between universal UI shared across every future
              role and Employer-only portal features.
            </p>
          </div>
          <div className={styles.matrixGrid}>
            <div className={styles.matrixCol}>
              <Pill variant="display" tone="success" showLeftIcon showRightIcon={false}>
                Universal (All Portals)
              </Pill>
              <strong className="type-label-medium-medium">
                Shared by Employer, Employee, Therapist &amp; Admin
              </strong>
              <ul className="type-paragraph-xsmall">
                <li>
                  <code>src/styles/</code> (tokens, typography, gradients,
                  effects)
                </li>
                <li>
                  <code>src/components/ui/</code> (Button, Pill, Checkbox,
                  Avatar, SearchInput, Select, PeriodSelect, SectionHeader,
                  Card, Icon, HorizontalTabs, TileButton, ProgressBar)
                </li>
                <li>
                  <code>src/components/patterns/</code> (MetricCard,
                  MetricStrip, MetricWideBlock, TrendChart, Sparkline,
                  ActionBanner, DataTable)
                </li>
                <li>
                  <code>src/types/common.ts</code> (Period, Tone, Metric,
                  TrendPoint, QuickActionItem)
                </li>
              </ul>
            </div>

            <div className={styles.matrixCol}>
              <Pill variant="display" tone="info" showLeftIcon showRightIcon={false}>
                Employer-Exclusive Today
              </Pill>
              <strong className="type-label-medium-medium">
                Scoped to (employer) Portal Only
              </strong>
              <ul className="type-paragraph-xsmall">
                <li>
                  <code>src/views/employer/*</code> (DashboardView,
                  AnalyticsView, EmployeesView)
                </li>
                <li>
                  <code>src/features/analytics/*</code> (ProgramSignals,
                  BenefitHealth, BookingPatterns, SessionUtilization,
                  FocusAreas)
                </li>
                <li>
                  <code>src/features/employees/*</code> (AccessSummary,
                  EmployeeList, AddEmployeeDialog)
                </li>
                <li>
                  <code>src/features/dashboard/CareAccess</code> &amp;{" "}
                  <code>EmployeeParticipation</code> &amp;{" "}
                  <code>TaskList</code>
                </li>
                <li>
                  <code>src/data/employer*</code> &amp;{" "}
                  <code>src/types/employer*</code>
                </li>
              </ul>
            </div>

            <div className={styles.matrixCol}>
              <Pill variant="display" tone="warning" showLeftIcon showRightIcon={false}>
                Decouple Before Portal #2
              </Pill>
              <strong className="type-label-medium-medium">
                Currently Employer-Coupled Chrome
              </strong>
              <ul className="type-paragraph-xsmall">
                <li>
                  <code>EmployerShell</code>, <code>Sidebar</code>,{" "}
                  <code>Header</code> read <code>EmployerShellData</code> and{" "}
                  <code>employerNav</code> directly
                </li>
                <li>
                  Extract a shared <code>PortalShell</code> accepting generic{" "}
                  <code>navGroups</code> &amp; sidebar cards before adding{" "}
                  <code>(employee)</code> or <code>(therapist)</code>
                </li>
                <li>
                  Promote <code>AtAGlance</code> &amp; <code>QuickActions</code>{" "}
                  to <code>src/features/shared/</code> if used outside Employer
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {show("Health & Refactor Backlog") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">Engineering Health &amp; Refactor Scorecard</h2>
            <p className="type-paragraph-small">
              Honest summary of what works properly, what needs fixing or
              refactoring, what can be scrapped, and what should be built next.
            </p>
          </div>
          <div className={styles.matrixGrid}>
            <div className={styles.matrixCol}>
              <Pill variant="display" tone="success" showLeftIcon showRightIcon={false}>
                Done Properly ({grouped.proper.length})
              </Pill>
              <ul className="type-paragraph-xsmall">
                {grouped.proper.map((e) => (
                  <li key={e.id}>{e.name}</li>
                ))}
              </ul>
            </div>

            <div className={styles.matrixCol}>
              <Pill variant="display" tone="error" showLeftIcon showRightIcon={false}>
                Needs Fix ({grouped.needsFix.length})
              </Pill>
              <ul className="type-paragraph-xsmall">
                <li>
                  <code>gradients.css</code>: fix variable typos (
                  <code>--color-aqua-aqua-50</code>,{" "}
                  <code>--color--aqua-50</code>) &amp; remove scratch{" "}
                  <code>--test</code> tokens
                </li>
                <li>
                  <code>effects.css</code>: remove stray leading <code>s </code>{" "}
                  on line 10
                </li>
              </ul>
            </div>

            <div className={styles.matrixCol}>
              <Pill variant="display" tone="warning" showLeftIcon showRightIcon={false}>
                Needs Refactor ({grouped.refactor.length})
              </Pill>
              <ul className="type-paragraph-xsmall">
                <li>
                  Decouple <code>Sidebar</code> / <code>Header</code> from{" "}
                  <code>employerNav</code> into generic <code>PortalShell</code>
                </li>
                <li>
                  Replace <code>FormControls.CheckboxField</code> native input
                  with Figma <code>Checkbox</code>
                </li>
                <li>
                  Replace <code>NavButton</code> inline count badge with{" "}
                  <code>Pill</code>
                </li>
              </ul>
            </div>

            <div className={styles.matrixCol}>
              <Pill variant="display" tone="info" showLeftIcon showRightIcon={false}>
                Scrap / To Build Next
              </Pill>
              <ul className="type-paragraph-xsmall">
                <li>
                  <strong>Scrap or Replace:</strong> <code>Toast</code> &amp;{" "}
                  <code>Tooltip</code> (unused orphans),{" "}
                  <code>FormControls.SelectField</code> (superseded by{" "}
                  <code>Select</code>)
                </li>
                <li>
                  <strong>Build Next:</strong> <code>EmptyState</code>,{" "}
                  <code>Modal / Drawer</code> shell,{" "}
                  <code>ActionMenu</code> (for 3-dot row button), and{" "}
                  <code>FilterBar</code> for Integrations &amp; Billing
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
