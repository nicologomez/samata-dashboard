import type { Metadata } from "next";
import { getEmployerEmployees } from "@/services/employeesService";
import { EmployerEmployeesView } from "@/views/employer/EmployerEmployeesView";

export const metadata: Metadata = {
  title: "Employees",
};

export default async function EmployeesPage() {
  const data = await getEmployerEmployees();
  return <EmployerEmployeesView data={data} />;
}
