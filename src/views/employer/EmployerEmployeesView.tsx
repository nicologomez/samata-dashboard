import type { EmployerEmployeesData } from "@/types/employerEmployees";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { AccessSummary } from "@/features/employees/AccessSummary";
import { EmployeeList } from "@/features/employees/EmployeeList";
import styles from "./EmployerEmployeesView.module.css";

type Props = {
  data: EmployerEmployeesData;
};

/** Portal view template arranging the Employees summary band and full-width employee directory. */
export function EmployerEmployeesView({ data }: Props) {
  return (
    <div className={styles.employees}>
      <div className={styles.board}>
        <div className={styles.topRow}>
          <AtAGlance
            metricsByPeriod={data.metricsByPeriod}
            layout="wide"
            heading={data.companyName}
            subtitle={data.summaryNote}
          />
          <div className={styles.rail}>
            <AccessSummary data={data.accessSummary} />
          </div>
        </div>

        <EmployeeList
          employees={data.employees}
          totalEmployees={data.totalEmployees}
        />
      </div>
    </div>
  );
}
