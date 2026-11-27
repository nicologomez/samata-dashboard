import type { EmployerSupportData } from "@/types/employerSupport";
import { SupportProvider } from "@/features/support/SupportContext";
import { SupportHeroBanner } from "@/features/support/SupportHeroBanner";
import { CustomerSuccessCard } from "@/features/support/CustomerSuccessCard";
import { SupportTicketsSection } from "@/features/support/SupportTicketsSection";
import {
  AccountHealthPanel,
  StatusHealthPanel,
} from "@/features/support/SupportHealthRails";
import { SupportFaqSection } from "@/features/support/SupportFaqSection";
import { SupportResourcesRail } from "@/features/support/SupportResourcesRail";
import styles from "./EmployerSupportView.module.css";

type Props = {
  data: EmployerSupportData;
};

/** Portal view template orchestrating the 3 responsive Support bands and right rails. */
export function EmployerSupportView({ data }: Props) {
  return (
    <SupportProvider>
      <div className={styles.support}>
        <div className={styles.board}>
          <div className={styles.splitRow}>
            <SupportHeroBanner data={data.hero} />
            <div className={styles.rail}>
              <CustomerSuccessCard data={data.csm} />
            </div>
          </div>

          <div className={styles.splitRow}>
            <SupportTicketsSection
              tickets={data.tickets}
              totalTickets={data.totalTickets}
            />
            <div className={styles.railStack}>
              <StatusHealthPanel
                statuses={data.systemStatuses}
                lastCheckedLabel={data.lastCheckedLabel}
              />
              <AccountHealthPanel rows={data.accountHealth} />
            </div>
          </div>

          <div className={styles.splitRow}>
            <SupportFaqSection faqs={data.faqs} />
            <div className={styles.rail}>
              <SupportResourcesRail items={data.resources} />
            </div>
          </div>
        </div>
      </div>
    </SupportProvider>
  );
}
