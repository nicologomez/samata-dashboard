import type { EmployerAnalyticsData } from "@/types/employerAnalytics";
import { ActionBanner } from "@/components/patterns/ActionBanner";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { CareAccess } from "@/features/dashboard/CareAccess";
import { EmployeeParticipation } from "@/features/dashboard/EmployeeParticipation";
import { BenefitHealth } from "@/features/analytics/BenefitHealth";
import { BookingPatterns } from "@/features/analytics/BookingPatterns";
import { FocusAreas } from "@/features/analytics/FocusAreas";
import { ProgramSignals } from "@/features/analytics/ProgramSignals";
import { SessionUtilization } from "@/features/analytics/SessionUtilization";
import styles from "./EmployerAnalyticsView.module.css";

/** Page-level responsive layout assembling all Employer Analytics sections. */
export function EmployerAnalyticsView({
  data,
}: {
  data: EmployerAnalyticsData;
}) {
  return (
    <main className={styles.analytics}>
      <div className={styles.board}>
        {/* Band 1: Benefit Analytics Wide Block + Program Signals */}
        <div className={styles.row}>
          <AtAGlance
            layout="wide"
            heading="Benefit Analytics"
            subtitle="Aggregated, anonymized insights into adoption and usage."
            metricsByPeriod={data.wideMetricsByPeriod}
          />
          <aside className={styles.rail} aria-label="Program signals">
            <ProgramSignals signals={data.programSignals} />
          </aside>
        </div>

        {/* Band 2: Employee Participation (2-tab) + Care Access */}
        <div className={styles.row}>
          <EmployeeParticipation
            tabs={data.participation.tabs}
            departments={data.participation.departments}
            showYAxis
            showArea
          />
          <aside className={styles.rail} aria-label="Care access">
            <CareAccess data={data} showBookmark />
          </aside>
        </div>

        {/* Band 3: Benefit Health + Booking Patterns + Promote Availability */}
        <div className={styles.row}>
          <BenefitHealth
            dateRanges={data.benefitHealth.dateRanges}
            byPeriod={data.benefitHealth.byPeriod}
          />
          <aside className={styles.railStack} aria-label="Booking insights">
            <BookingPatterns patternsByPeriod={data.bookingPatterns} />
            <ActionBanner
              title="Promote Availability"
              description="Share available booking windows with eligible employees."
              ctaLabel="Send Reminder"
              href="/employees"
              variant="compact"
              artwork="flower"
            />
          </aside>
        </div>

        {/* Band 4: Session Utilization + Download Summary + Focus Areas */}
        <div className={styles.row}>
          <div className={styles.leftStack}>
            <SessionUtilization
              currentMonthLabel={data.sessionUtilization.currentMonthLabel}
              sessionsUsed={data.sessionUtilization.sessionsUsed}
              planAllocated={data.sessionUtilization.planAllocated}
              monthly={data.sessionUtilization.monthly}
            />
            <ActionBanner
              title="Download Employer Summary"
              description="Export aggregate benefit performance for internal reporting."
              ctaLabel="Download Summary"
              href="/analytics"
              variant="wide"
              artwork="summary"
            />
          </div>
          <aside className={styles.rail} aria-label="Focus areas">
            <FocusAreas byPeriod={data.focusAreas} />
          </aside>
        </div>
      </div>
    </main>
  );
}
