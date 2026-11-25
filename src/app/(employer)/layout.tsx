import { EmployerShell } from "@/components/layout/EmployerShell";
import { getEmployerShellData } from "@/services/dashboardService";

export default async function EmployerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = await getEmployerShellData();
  return <EmployerShell data={data}>{children}</EmployerShell>;
}
