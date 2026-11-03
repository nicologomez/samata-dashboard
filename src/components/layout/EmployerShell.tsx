"use client";
import { useState } from "react";
import type { DashboardData } from "@/types/dashboard";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import styles from "./EmployerShell.module.css";

export function EmployerShell({
  children,
  data,
}: {
  children: React.ReactNode;
  data: DashboardData;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.shell}>
      <Sidebar data={data} open={open} onClose={() => setOpen(false)} />
      <div className={styles.main}>
        <Header profile={data.profile} onOpenMenu={() => setOpen(true)} />
        {children}
      </div>
    </div>
  );
}
