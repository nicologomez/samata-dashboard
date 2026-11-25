import type { Metadata } from "next";
import { getEmployerAnalytics } from "@/services/analyticsService";
import { EmployerAnalyticsView } from "@/views/employer/EmployerAnalyticsView";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function AnalyticsPage() {
  const data = await getEmployerAnalytics();
  return <EmployerAnalyticsView data={data} />;
}
