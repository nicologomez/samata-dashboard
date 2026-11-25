import type { EmployerDashboardData } from "@/types/employer";
import { employerQuickActions } from "@/config/navigation";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { EmployeeParticipation } from "@/features/dashboard/EmployeeParticipation";
import { CareAccess } from "@/features/dashboard/CareAccess";
import { TaskList } from "@/features/dashboard/TaskList";
import { QuickActions } from "@/features/dashboard/QuickActions";
import styles from "./EmployerDashboardView.module.css";

/** Page-level layout composition for the Employer Home dashboard. */
export function EmployerDashboardView({
  data,
}: {
  data: EmployerDashboardData;
}) {
  return (
    <main className={styles.dashboard}>
      <div className={styles.welcome}>
        <span className="type-paragraph-small">
          👋 Welcome back, {data.profile.user.split(" ")[0]}!
        </span>
        <span className="type-paragraph-small">
          <span
            className={styles.statusDot}
            data-connected={data.profile.syncConnected}
          />{" "}
          BambooHR Sync:{" "}
          {data.profile.syncConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <div className={styles.board}>
        {/* Band 1: At a Glance + Things to do */}
        <div className={styles.row}>
          <AtAGlance metricsByPeriod={data.metricsByPeriod} />
          <aside className={styles.rail} aria-label="Things to do">
            <TaskList tasks={data.tasks} />
          </aside>
        </div>
        {/* Band 2: Employee Participation + Care Access + Quick Actions */}
        <div className={styles.row}>
          <div className={styles.analytics}>
            <EmployeeParticipation trendsByPeriod={data.trendsByPeriod} />
            <CareAccess data={data} />
          </div>
          <aside className={styles.rail} aria-label="Quick actions">
            <QuickActions actions={employerQuickActions} />
          </aside>
        </div>
      </div>
    </main>
  );
}
