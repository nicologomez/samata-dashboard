import type { EmployerBillingData } from "@/types/employerBilling";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { BillingOverviewCard } from "@/features/billing/BillingOverviewCard";
import { SpendTrendSection } from "@/features/billing/SpendTrendSection";
import { SeatUtilizationCard } from "@/features/billing/SeatUtilizationCard";
import { ManageBillingSection } from "@/features/billing/ManageBillingSection";
import styles from "./EmployerBillingView.module.css";

type Props = {
  data: EmployerBillingData;
};

/** Portal view template arranging Billing At a Glance, Spend Trend + Seat Utilization, and Manage Billing & Contract. */
export function EmployerBillingView({ data }: Props) {
  return (
    <div className={styles.billing}>
      <div className={styles.board}>
        <div className={styles.splitRow}>
          <AtAGlance
            metricsByPeriod={data.atAGlance.metricsByPeriod}
            layout="wide"
            heading={data.atAGlance.heading}
            subtitle={data.atAGlance.subtitle}
          />
          <div className={styles.rail}>
            <BillingOverviewCard data={data.overview} />
          </div>
        </div>

        <div className={styles.splitRow}>
          <SpendTrendSection data={data.spendTrend} />
          <div className={styles.rail}>
            <SeatUtilizationCard data={data.seatUtilization} />
          </div>
        </div>

        <ManageBillingSection
          invoices={data.invoices}
          totalInvoices={data.totalInvoices}
          paymentMethod={data.paymentMethod}
          contractTerms={data.contractTerms}
        />
      </div>
    </div>
  );
}
