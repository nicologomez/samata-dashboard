"use client";
import { useState } from "react";
import type { EmployerShellData } from "@/types/employer";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import styles from "./EmployerShell.module.css";

export function EmployerShell({
  children,
  data,
}: {
  children: React.ReactNode;
  data: EmployerShellData;
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
