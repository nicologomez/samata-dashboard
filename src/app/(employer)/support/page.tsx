import type { Metadata } from "next";
import { getEmployerSupport } from "@/services/supportService";
import { EmployerSupportView } from "@/views/employer/EmployerSupportView";

export const metadata: Metadata = { title: "Support" };

export default async function SupportPage() {
  const data = await getEmployerSupport();
  return <EmployerSupportView data={data} />;
}
