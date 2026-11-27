import type { EmployerIntegrationsData } from "@/types/employerIntegrations";
import { AtAGlance } from "@/features/dashboard/AtAGlance";
import { IntegrationsQuickActions } from "@/features/integrations/IntegrationsQuickActions";
import { IntegrationConnectionCard } from "@/features/integrations/IntegrationConnectionCard";
import { ActivityLogProvider } from "@/features/integrations/ActivityLogContext";
import { ActivityLogSection } from "@/features/integrations/ActivityLogSection";
import { LatestLogPanel } from "@/features/integrations/LatestLogPanel";
import { AvailableIntegrations } from "@/features/integrations/AvailableIntegrations";
import styles from "./EmployerIntegrationsView.module.css";

type Props = {
  data: EmployerIntegrationsData;
};

/** Portal view template orchestrating the 4 responsive Integrations bands. */
export function EmployerIntegrationsView({ data }: Props) {
  return (
    <div className={styles.integrations}>
      <div className={styles.board}>
        <div className={styles.splitRow}>
          <AtAGlance
            metrics={data.atAGlance.metrics}
            layout="wide"
            heading={data.atAGlance.heading}
            subtitle={data.atAGlance.subtitle}
            showPeriodSelect={false}
          />
          <div className={styles.rail}>
            <IntegrationsQuickActions data={data.quickActions} />
          </div>
        </div>

        <div className={styles.connectionsRow}>
          {data.connections.map((connection) => (
            <IntegrationConnectionCard key={connection.id} data={connection} />
          ))}
        </div>

        <ActivityLogProvider logs={data.activityLogs}>
          <div className={styles.splitRow}>
            <ActivityLogSection />
            <div className={styles.rail}>
              <LatestLogPanel />
            </div>
          </div>
        </ActivityLogProvider>

        <div className={styles.splitRow}>
          <AvailableIntegrations items={data.availableIntegrations} />
        </div>
      </div>
    </div>
  );
}
