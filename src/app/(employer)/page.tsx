import { getEmployerDashboard } from "@/services/dashboardService";

import { DashboardView } from "@/views/DashboardView";

export default async function HomePage() {
  const data = await getEmployerDashboard();
  return <DashboardView data={data} />;
}
