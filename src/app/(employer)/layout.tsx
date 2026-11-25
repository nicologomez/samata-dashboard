import type { Metadata } from "next";
import { EmployerShell } from "@/components/layout/EmployerShell";
import { getEmployerShellData } from "@/services/dashboardService";

export const metadata: Metadata = {
  title: "Employer Dashboard",
};

export default async function EmployerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = await getEmployerShellData();
  return <EmployerShell data={data}>{children}</EmployerShell>;
}
