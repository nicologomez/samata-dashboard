"use client";

import { useState } from "react";
import { employerQuickActions } from "@/config/navigation";
import { employerAnalyticsFixture } from "@/data/employerAnalytics";
import { employerDashboardFixture } from "@/data/employerDashboard";
import { employerEmployeesFixture } from "@/data/employerEmployees";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { BenefitHealth } from "@/features/analytics/BenefitHealth";
import { BookingPatterns } from "@/features/analytics/BookingPatterns";
import { FocusAreas } from "@/features/analytics/FocusAreas";
import { ProgramSignals } from "@/features/analytics/ProgramSignals";
import { SessionUtilization } from "@/features/analytics/SessionUtilization";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { CareAccess } from "@/features/dashboard/CareAccess";
import { EmployeeParticipation } from "@/features/dashboard/EmployeeParticipation";
import { QuickActions } from "@/features/dashboard/QuickActions";
import { TaskList } from "@/features/dashboard/TaskList";
import { employerBillingFixture } from "@/data/employerBilling";
import { employerIntegrationsFixture } from "@/data/employerIntegrations";
import { employerSupportFixture } from "@/data/employerSupport";
import { AccessSummary } from "@/features/employees/AccessSummary";
import { AddEmployeeDialog } from "@/features/employees/AddEmployeeDialog";
import { EmployeeList } from "@/features/employees/EmployeeList";
import { BillingOverviewCard } from "@/features/billing/BillingOverviewCard";
import { SeatUtilizationCard } from "@/features/billing/SeatUtilizationCard";
import { IntegrationConnectionCard } from "@/features/integrations/IntegrationConnectionCard";
import { StatusHealthPanel } from "@/features/support/SupportHealthRails";
import styles from "./DesignSystemHub.module.css";

type Props = {
  itemId: string;
};

/** Renders live dedicated pages for Chrome, Features (Organisms), and Portal Views (Templates). */
export function OrganismsTemplatesView({ itemId }: Props) {
  const [glanceMode, setGlanceMode] = useState<"strip" | "wide">("wide");
  const [dialogOpen, setDialogOpen] = useState(false);

  switch (itemId) {
    case "o-chrome":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Portal Chrome Layers (Universal Shell + Role Adapter)
          </h3>
          <div className={styles.gridCards}>
            <article className={styles.archCard}>
              <Pill variant="hash">PortalShell + Sidebar + Header</Pill>
              <p className="type-paragraph-small">
                Accepts <code>workspace</code>, <code>topItem</code>,{" "}
                <code>groups</code>, <code>footerGroup</code>,{" "}
                <code>quotaCard</code>, and <code>primaryAction</code> props.
                Zero Employer hardcoded strings.
              </p>
            </article>
            <article className={styles.archCard}>
              <Pill variant="hash">EmployerShell (Adapter)</Pill>
              <p className="type-paragraph-small">
                Connects <code>employerNav</code>, <code>EmployerShellData</code>,
                and <code>AddEmployeeDialog</code> into{" "}
                <code>PortalShell</code> inside{" "}
                <code>src/app/(employer)/layout.tsx</code>.
              </p>
            </article>
          </div>
          <div className={styles.canvasLight}>
            <strong className="type-label-medium-small">
              PlaceholderPage (Used by unbuilt inner routes)
            </strong>
            <PlaceholderPage title="Sample Placeholder Route" />
          </div>
        </div>
      );

    case "o-ataglance":
      return (
        <div className={styles.stage}>
          <div className={styles.docHeaderTop}>
            <h3 className="type-heading-h6">
              AtAGlance (Switch strip vs. wide mode)
            </h3>
            <div className={styles.flexWrap}>
              <Button
                variant={glanceMode === "strip" ? "primary" : "secondary"}
                size="xs"
                onClick={() => setGlanceMode("strip")}
              >
                strip (Home)
              </Button>
              <Button
                variant={glanceMode === "wide" ? "primary" : "secondary"}
                size="xs"
                onClick={() => setGlanceMode("wide")}
              >
                wide (Analytics &amp; Employees)
              </Button>
            </div>
          </div>
          <div className={styles.canvasLight}>
            <AtAGlance
              metricsByPeriod={
                glanceMode === "wide"
                  ? employerEmployeesFixture.metricsByPeriod
                  : employerDashboardFixture.metricsByPeriod
              }
              layout={glanceMode}
              heading={employerEmployeesFixture.companyName}
              subtitle={employerEmployeesFixture.summaryNote}
            />
          </div>
        </div>
      );

    case "o-careaccess":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            CareAccess (Home &amp; Analytics) vs. AccessSummary (Employees)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap} style={{ alignItems: "stretch" }}>
              <div style={{ width: 270 }}>
                <CareAccess data={employerDashboardFixture} showBookmark />
              </div>
              <div style={{ width: 270 }}>
                <AccessSummary data={employerEmployeesFixture.accessSummary} />
              </div>
            </div>
          </div>
        </div>
      );

    case "o-participation":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            EmployeeParticipation (Transparent Surface + Tabs + Department)
          </h3>
          <div className={styles.canvasLight}>
            <EmployeeParticipation
              tabs={employerAnalyticsFixture.participation.tabs}
              departments={employerAnalyticsFixture.participation.departments}
              showYAxis
              showArea
            />
          </div>
        </div>
      );

    case "o-employeelist":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            EmployeeList (Full Directory Organism)
          </h3>
          <div className={styles.canvasLight}>
            <EmployeeList
              employees={employerEmployeesFixture.employees.slice(0, 4)}
              totalEmployees={employerEmployeesFixture.totalEmployees}
            />
          </div>
        </div>
      );

    case "o-homewidgets":
      return (
        <div className={styles.stage}>
          <div className={styles.docHeaderTop}>
            <h3 className="type-heading-h6">
              QuickActions, TaskList &amp; AddEmployeeDialog
            </h3>
            <Button
              variant="primary"
              size="xs"
              showLeftIcon
              leftIcon="plus"
              onClick={() => setDialogOpen(true)}
            >
              Preview AddEmployeeDialog
            </Button>
          </div>
          <div className={styles.canvasLight}>
            <div className={styles.gridCards}>
              <QuickActions actions={employerQuickActions} />
              <TaskList tasks={employerDashboardFixture.tasks} />
            </div>
          </div>
          <AddEmployeeDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        </div>
      );

    case "o-analyticswidgets":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Analytics Feature Suite (5 Organisms)
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap} style={{ alignItems: "stretch" }}>
              <div style={{ width: 270 }}>
                <ProgramSignals signals={employerAnalyticsFixture.programSignals} />
              </div>
              <div style={{ width: 270 }}>
                <BookingPatterns
                  patternsByPeriod={employerAnalyticsFixture.bookingPatterns}
                />
              </div>
              <div style={{ width: 270 }}>
                <FocusAreas byPeriod={employerAnalyticsFixture.focusAreas} />
              </div>
            </div>
            <SessionUtilization
              {...employerAnalyticsFixture.sessionUtilization}
            />
            <BenefitHealth
              dateRanges={employerAnalyticsFixture.benefitHealth.dateRanges}
              byPeriod={employerAnalyticsFixture.benefitHealth.byPeriod}
            />
          </div>
        </div>
      );

    case "o-integrations":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Integration Connection Card (Reused for HRIS &amp; SSO)
          </h3>
          <div className={styles.gridCards}>
            {employerIntegrationsFixture.connections.map((conn) => (
              <IntegrationConnectionCard key={conn.id} data={conn} />
            ))}
          </div>
        </div>
      );

    case "o-billing":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Billing Rail Cards (Overview &amp; Seat Utilization)
          </h3>
          <div className={styles.gridCards}>
            <BillingOverviewCard data={employerBillingFixture.overview} />
            <SeatUtilizationCard data={employerBillingFixture.seatUtilization} />
          </div>
        </div>
      );

    case "o-support":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Support Right-Rail Health Status Panel
          </h3>
          <div className={styles.gridCards}>
            <StatusHealthPanel
              statuses={employerSupportFixture.systemStatuses}
              lastCheckedLabel={employerSupportFixture.lastCheckedLabel}
            />
          </div>
        </div>
      );

    case "t-built":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Built Employer Views &amp; Responsive Breakpoint Standards
          </h3>
          <div className={styles.gridCards}>
            <article className={styles.archCard}>
              <Pill variant="hash">/</Pill>
              <strong className="type-label-medium-medium">
                EmployerDashboardView
              </strong>
              <p className="type-paragraph-xsmall">
                Row 1: AtAGlance (strip) + QuickActions (248px). Row 2:
                EmployeeParticipation (span 2) + CareAccess + TaskList.
              </p>
              <Button variant="secondary" size="xs" href="/">
                Open /
              </Button>
            </article>
            <article className={styles.archCard}>
              <Pill variant="hash">/analytics</Pill>
              <strong className="type-label-medium-medium">
                EmployerAnalyticsView
              </strong>
              <p className="type-paragraph-xsmall">
                4 uniform bands using minmax(0, 1fr) + 270px right rail;
                collapses &lt;=1280px; centers max-width 1440px &gt;=1921px.
              </p>
              <Button variant="secondary" size="xs" href="/analytics">
                Open /analytics
              </Button>
            </article>
            <article className={styles.archCard}>
              <Pill variant="hash">/employees</Pill>
              <strong className="type-label-medium-medium">
                EmployerEmployeesView
              </strong>
              <p className="type-paragraph-xsmall">
                Band 1: AtAGlance (wide) + AccessSummary (270px). Band 2:
                Full-width EmployeeList table with horizontal scroll safety.
              </p>
              <Button variant="secondary" size="xs" href="/employees">
                Open /employees
              </Button>
            </article>
            <article className={styles.archCard}>
              <Pill variant="hash">/integrations</Pill>
              <strong className="type-label-medium-medium">
                EmployerIntegrationsView
              </strong>
              <p className="type-paragraph-xsmall">
                4 bands: AtAGlance + QuickActions, 2 layered connection shelves,
                ActivityLog + LatestLog rail, and AvailableIntegrations 3-col tabs.
              </p>
              <Button variant="secondary" size="xs" href="/integrations">
                Open /integrations
              </Button>
            </article>
            <article className={styles.archCard}>
              <Pill variant="hash">/billing</Pill>
              <strong className="type-label-medium-medium">
                EmployerBillingView
              </strong>
              <p className="type-paragraph-xsmall">
                Band 1: AtAGlance + Overview (270px). Band 2: SpendTrend +
                SeatUtilization (270px). Band 3: Tabbed Invoice History DataTable.
              </p>
              <Button variant="secondary" size="xs" href="/billing">
                Open /billing
              </Button>
            </article>
            <article className={styles.archCard}>
              <Pill variant="hash">/support</Pill>
              <strong className="type-label-medium-medium">
                EmployerSupportView
              </strong>
              <p className="type-paragraph-xsmall">
                Band 1: Search Hero + CSM Rail. Band 2: Tickets DataTable +
                Status/Account Health. Band 3: Searchable FAQ + Resources Rail.
              </p>
              <Button variant="secondary" size="xs" href="/support">
                Open /support
              </Button>
            </article>
          </div>
        </div>
      );

    default:
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Pending Employer &amp; Multi-Portal Blueprint
          </h3>
          <div className={styles.gridCards}>
            <article className={styles.archCard}>
              <Pill variant="hash">/inbox · /settings</Pill>
              <p className="type-paragraph-small">
                Follow <code>tutorials/README-5STEPS.md</code>; reuse{" "}
                <code>Toggle</code> and role-neutral <code>PortalShell</code>{" "}
                for upcoming Employee and Therapist portals.
              </p>
            </article>
          </div>
        </div>
      );
  }
}
