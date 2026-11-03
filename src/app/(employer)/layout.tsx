import { EmployerShell } from "@/components/layout/EmployerShell";
import { getEmployerDashboard } from "@/services/dashboardService";

export default async function EmployerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = await getEmployerDashboard();
  return <EmployerShell data={data}>{children}</EmployerShell>;
}
