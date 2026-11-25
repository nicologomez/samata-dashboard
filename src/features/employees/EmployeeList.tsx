"use client";

import type {
  EmployeeRecord,
  EmployeeStatus,
} from "@/types/employerEmployees";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Pill, type PillTone } from "@/components/ui/Pill";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/patterns/DataTable";
import styles from "./EmployeeList.module.css";

type ColumnKey =
  | "employee"
  | "employment"
  | "annualSessions"
  | "location"
  | "status"
  | "renewalDate";

const statusPillMap: Record<
  EmployeeStatus,
  { label: string; tone: PillTone }
> = {
  active: { label: "Active", tone: "success" },
  pending: { label: "Pending", tone: "info" },
  "grace-period": { label: "Grace Period", tone: "warning" },
  deactivated: { label: "Deactivated", tone: "plain" },
};

const columns: readonly DataTableColumn<EmployeeRecord, ColumnKey>[] = [
  {
    key: "employee",
    label: "Employee",
    width: "240px",
    sortable: true,
    sortValue: (row) => row.name,
  },
  {
    key: "employment",
    label: "Employment",
    width: "172px",
    sortable: true,
    sortValue: (row) => row.employment,
  },
  {
    key: "annualSessions",
    label: "Annual Sessions",
    width: "162px",
    sortable: true,
    sortValue: (row) => row.annualSessions,
  },
  {
    key: "location",
    label: "Location",
    width: "162px",
    sortable: true,
    sortValue: (row) => row.location,
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    sortable: true,
    sortValue: (row) => statusPillMap[row.status].label,
  },
  {
    key: "renewalDate",
    label: "Renewal Date",
    width: "136px",
    sortable: true,
    alignMenu: "right",
    sortValue: (row) =>
      row.renewalDate ? Date.parse(row.renewalDate) : undefined,
  },
];

function renderValueOrFallback(value: string | undefined, fallback: string) {
  if (!value) {
    return (
      <span className={`${styles.fallbackText} type-paragraph-small`}>
        {fallback}
      </span>
    );
  }
  return <span className="type-paragraph-small">{value}</span>;
}

function renderEmployeeCell(row: EmployeeRecord, columnKey: ColumnKey) {
  switch (columnKey) {
    case "employee":
      return (
        <div className={styles.memberCell}>
          <Avatar name={row.name} size={32} />
          <div className={styles.memberMeta}>
            <strong className={`${styles.memberName} type-label-medium-medium`}>
              {row.name}
            </strong>
            <span className={`${styles.memberEmail} type-paragraph-xsmall`}>
              {row.email}
            </span>
          </div>
        </div>
      );
    case "employment":
      return renderValueOrFallback(row.employment, "Missing info");
    case "annualSessions":
      return renderValueOrFallback(
        row.annualSessions !== undefined
          ? `${row.annualSessions} sessions`
          : undefined,
        "Pending allocation...",
      );
    case "location":
      return renderValueOrFallback(row.location, "Missing info");
    case "status": {
      const config = statusPillMap[row.status];
      return (
        <Pill variant="display" tone={config.tone} showLeftIcon showRightIcon={false}>
          {config.label}
        </Pill>
      );
    }
    case "renewalDate":
      return renderValueOrFallback(row.renewalDate, "Pending...");
  }
}

type Props = {
  employees: readonly EmployeeRecord[];
  totalEmployees: number;
};

/** Directory table organism composing toolbar actions and the shared DataTable pattern. */
export function EmployeeList({ employees, totalEmployees }: Props) {
  return (
    <section
      aria-labelledby="employee-list-heading"
      className={styles.section}
    >
      <div className={styles.toolbar}>
        <h2 id="employee-list-heading" className="type-heading-h5">
          Employee List
        </h2>

        <div className={styles.controls}>
          <SearchInput
            label="Search employees"
            placeholder="Search"
            className={styles.searchField}
          />
          <Button
            variant="secondary"
            size="xs"
            showLeftIcon
            leftIcon="settings-04"
          >
            Filter
          </Button>
          <Button variant="primary" size="xs" showLeftIcon leftIcon="plus">
            Add Employee
          </Button>
        </div>
      </div>

      <DataTable
        tableLabel="Employee list"
        columns={columns}
        rows={employees}
        getRowKey={(row) => row.id}
        getRowLabel={(row) => row.name}
        renderCell={renderEmployeeCell}
        selectable
        hasRowAction
        renderRowAction={(row) => (
          <Button
            variant="basic"
            state="transparent"
            size="xl"
            mode="icon"
            leftIcon="three-dot"
            className={styles.rowActionBtn}
            aria-label={`More actions for ${row.name}`}
          />
        )}
        footerSummary={`Showing 1-${employees.length} of ${totalEmployees} Employees`}
        showAllLabel="Show All"
      />
    </section>
  );
}
