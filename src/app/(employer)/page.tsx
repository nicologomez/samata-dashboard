import { getEmployerDashboard } from "@/services/dashboardService";
import { EmployerDashboardView } from "@/views/employer/EmployerDashboardView";

export default async function HomePage() {
  const data = await getEmployerDashboard();
  return <EmployerDashboardView data={data} />;
}
