import type { DashboardData } from "@/types/dashboard";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { EmployeeParticipation } from "@/features/dashboard/EmployeeParticipation";
import { CareAccess } from "@/features/dashboard/CareAccess";
import { TaskList } from "@/features/dashboard/TaskList";
import { QuickActions } from "@/features/dashboard/QuickActions";
import styles from "./DashboardView.module.css";

/** Page-level layout composition for the Employer Home dashboard. */
export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <main className={styles.dashboard}>
      <div className={styles.welcome}>
        <span className="type-paragraph-small">
          👋 Welcome back, {data.profile.user.split(" ")[0]}!
        </span>
        <span className="type-paragraph-small">
          <span className={styles.statusDot} /> BambooHR Sync:{" "}
          {data.profile.syncConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <div className={styles.board}>
        {/* Band 1: At a Glance + Things to do */}
        <div className={styles.row}>
          <AtAGlance data={data} />
          <aside className={styles.rail} aria-label="Things to do">
            <TaskList tasks={data.tasks} />
          </aside>
        </div>
        {/* Band 2: Employee Participation + Care Access + Quick Actions */}
        <div className={styles.row}>
          <div className={styles.analytics}>
            <EmployeeParticipation data={data} />
            <CareAccess data={data} />
          </div>
          <aside className={styles.rail} aria-label="Quick actions">
            <QuickActions />
          </aside>
        </div>
      </div>
    </main>
  );
}
