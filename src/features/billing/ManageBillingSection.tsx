"use client";

import { useMemo, useState } from "react";
import type {
  BillingTabId,
  ContractTermsSummary,
  InvoiceRecord,
  InvoiceStatus,
  PaymentMethodSummary,
} from "@/types/employerBilling";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HorizontalTabs } from "@/components/ui/HorizontalTabs";
import { Pill, type PillTone } from "@/components/ui/Pill";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toggle } from "@/components/ui/Toggle";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/patterns/DataTable";
import styles from "./ManageBillingSection.module.css";

type ColumnKey =
  | "invoiceNumber"
  | "period"
  | "seats"
  | "amount"
  | "status"
  | "date";

type StatusFilter = "all" | InvoiceStatus;

const PAGE_SIZE = 10;

const tabs: readonly { id: BillingTabId; label: string }[] = [
  { id: "invoices", label: "Invoices" },
  { id: "payment-method", label: "Payment Method" },
  { id: "contract", label: "Contract" },
];

const statusPillMap: Record<
  InvoiceStatus,
  { label: string; tone: PillTone }
> = {
  ongoing: { label: "Ongoing", tone: "info" },
  paid: { label: "Paid", tone: "success" },
  overdue: { label: "Overdue", tone: "error" },
};

const filterCycle: readonly StatusFilter[] = ["all", "ongoing", "paid"];

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

const columns: readonly DataTableColumn<InvoiceRecord, ColumnKey>[] = [
  {
    key: "invoiceNumber",
    label: "Invoice",
    weight: 1.05,
    sortable: true,
    sortValue: (row) => row.invoiceNumber,
  },
  {
    key: "period",
    label: "Period",
    weight: 1.05,
    sortable: true,
    sortValue: (row) => Date.parse(row.date),
  },
  {
    key: "seats",
    label: "Seats",
    weight: 0.9,
    sortable: true,
    sortValue: (row) => row.seats,
  },
  {
    key: "amount",
    label: "Amount",
    weight: 0.95,
    sortable: true,
    sortValue: (row) => row.amount,
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    sortable: true,
    sortValue: (row) => statusPillMap[row.status].label,
  },
  {
    key: "date",
    label: "Date",
    weight: 1,
    sortable: true,
    sortValue: (row) => Date.parse(row.date),
  },
];

function renderInvoiceCell(row: InvoiceRecord, columnKey: ColumnKey) {
  switch (columnKey) {
    case "invoiceNumber":
      return (
        <span className={`${styles.strongCell} type-label-medium-medium`}>
          {row.invoiceNumber}
        </span>
      );
    case "period":
      return <span className="type-paragraph-small">{row.period}</span>;
    case "seats":
      return (
        <span className={`${styles.numeric} type-paragraph-small`}>
          {row.seats}
        </span>
      );
    case "amount":
      return (
        <span className={`${styles.strongCell} ${styles.numeric} type-label-medium-medium`}>
          {formatCurrency(row.amount)}
        </span>
      );
    case "status": {
      const config = statusPillMap[row.status];
      return (
        <Pill
          variant="display"
          tone={config.tone}
          showLeftIcon
          showRightIcon={false}
        >
          {config.label}
        </Pill>
      );
    }
    case "date":
      return <span className="type-paragraph-small">{row.date}</span>;
  }
}

type Props = {
  invoices: readonly InvoiceRecord[];
  totalInvoices: number;
  paymentMethod: PaymentMethodSummary;
  contractTerms: ContractTermsSummary;
};

/** Full-width tabbed Manage Billing & Contract band housing Invoice History and contract/payment settings. */
export function ManageBillingSection({
  invoices,
  totalInvoices,
  paymentMethod,
  contractTerms,
}: Props) {
  const [activeTab, setActiveTab] = useState<BillingTabId>("invoices");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const [autoPay, setAutoPay] = useState(paymentMethod.autoPayEnabled);

  const filteredInvoices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (!q) return true;
      return (
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.period.toLowerCase().includes(q) ||
        inv.date.toLowerCase().includes(q)
      );
    });
  }, [invoices, query, statusFilter]);

  const maxPage = Math.max(0, Math.ceil(filteredInvoices.length / PAGE_SIZE) - 1);
  const safePage = Math.min(page, maxPage);

  const visibleInvoices = useMemo(() => {
    if (showAll) return filteredInvoices;
    const start = safePage * PAGE_SIZE;
    return filteredInvoices.slice(start, start + PAGE_SIZE);
  }, [filteredInvoices, showAll, safePage]);

  function cycleFilter() {
    const idx = filterCycle.indexOf(statusFilter);
    const next = filterCycle[(idx + 1) % filterCycle.length];
    setStatusFilter(next);
    setPage(0);
  }

  function exportCsv(rows: readonly InvoiceRecord[]) {
    const header = "Invoice,Period,Seats,Amount,Status,Date";
    const lines = rows.map(
      (r) =>
        `${r.invoiceNumber},"${r.period}",${r.seats},${r.amount},${statusPillMap[r.status].label},"${r.date}"`,
    );
    const csv = [header, ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "samata-invoices.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const startIndex = showAll || visibleInvoices.length === 0 ? 1 : safePage * PAGE_SIZE + 1;
  const endIndex = showAll
    ? visibleInvoices.length
    : safePage * PAGE_SIZE + visibleInvoices.length;
  const totalCount =
    query.trim() || statusFilter !== "all"
      ? filteredInvoices.length
      : totalInvoices;

  const footerSummary =
    visibleInvoices.length === 0
      ? "No matching invoices"
      : `Showing ${startIndex}-${endIndex} of ${totalCount} Invoices History`;

  return (
    <section
      id="manage-billing"
      aria-labelledby="manage-billing-heading"
      className={styles.section}
    >
      <div className={styles.headerBlock}>
        <SectionHeader
          id="manage-billing-heading"
          icon="doc-fill"
          title="Manage Billing & Contract"
        />

        <HorizontalTabs
          tabs={tabs}
          value={activeTab}
          onChange={(id) => setActiveTab(id as BillingTabId)}
        />
      </div>

      {activeTab === "invoices" && (
        <div className={styles.invoicesWrap}>
          <div className={styles.toolbar}>
            <h3 className="type-heading-h5">Invoice History</h3>

            <div className={styles.controls}>
              <SearchInput
                label="Search invoices"
                placeholder="Search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(0);
                }}
                className={styles.searchField}
              />
              <Button
                variant="secondary"
                size="xs"
                showLeftIcon
                leftIcon="settings-04"
                onClick={cycleFilter}
              >
                {statusFilter === "all"
                  ? "Filter"
                  : statusPillMap[statusFilter].label}
              </Button>
              <Button
                variant="primary"
                size="xs"
                showLeftIcon
                leftIcon="download-01"
                onClick={() => exportCsv(filteredInvoices)}
              >
                Export CSV
              </Button>
            </div>
          </div>

          <DataTable
            tableLabel="Invoice history"
            columns={columns}
            rows={visibleInvoices}
            getRowKey={(row) => row.id}
            getRowLabel={(row) => row.invoiceNumber}
            renderCell={renderInvoiceCell}
            selectable
            hasRowAction
            actionColumnWidth="90px"
            showActionHeaderLabel
            actionHeaderLabel="Actions"
            renderRowAction={(row) => (
              <>
                <Button
                  variant="basic"
                  state="transparent"
                  size="sm"
                  mode="icon"
                  leftIcon="download-01"
                  aria-label={`Download ${row.invoiceNumber}`}
                  onClick={() => exportCsv([row])}
                />
                <Button
                  variant="basic"
                  state="transparent"
                  size="sm"
                  mode="icon"
                  leftIcon="three-dot"
                  aria-label={`More actions for ${row.invoiceNumber}`}
                />
              </>
            )}
            footerSummary={footerSummary}
            showAllLabel={showAll ? "Show Page" : "Show All"}
            onShowAll={() => setShowAll((prev) => !prev)}
            onPrevPage={() => {
              setShowAll(false);
              setPage((prev) => Math.max(0, prev - 1));
            }}
            onNextPage={() => {
              setShowAll(false);
              setPage((prev) => Math.min(maxPage, prev + 1));
            }}
          />
        </div>
      )}

      {activeTab === "payment-method" && (
        <div className={styles.panelGrid}>
          <Card
            surface="default"
            padding="none"
            elevation="xs"
            className={styles.detailCard}
          >
            <div className={styles.detailHeader}>
              <div>
                <h3 className="type-heading-h6">Primary Payment Method</h3>
                <p className={`${styles.muted} type-paragraph-small`}>
                  {paymentMethod.brand} ending in {paymentMethod.last4}
                </p>
              </div>
              <Pill variant="display" tone="success">
                Default
              </Pill>
            </div>

            <dl className={styles.metaList}>
              <div className={styles.metaRow}>
                <dt className="type-label-medium-small">Expiration</dt>
                <dd className="type-paragraph-small">{paymentMethod.expiry}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className="type-label-medium-small">Billing Contact</dt>
                <dd className="type-paragraph-small">
                  {paymentMethod.billingEmail}
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt className="type-label-medium-small">Auto-Pay</dt>
                <dd className={styles.toggleValue}>
                  <Toggle
                    checked={autoPay}
                    onCheckedChange={setAutoPay}
                    label="Automatic invoice payment"
                  />
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      )}

      {activeTab === "contract" && (
        <div className={styles.panelGrid}>
          <Card
            surface="default"
            padding="none"
            elevation="xs"
            className={styles.detailCard}
          >
            <div className={styles.detailHeader}>
              <div>
                <h3 className="type-heading-h6">
                  {contractTerms.agreementName}
                </h3>
                <p className={`${styles.muted} type-paragraph-small`}>
                  {contractTerms.pricingModel}
                </p>
              </div>
              <Pill variant="display" tone="info">
                Active Term
              </Pill>
            </div>

            <dl className={styles.metaList}>
              <div className={styles.metaRow}>
                <dt className="type-label-medium-small">Seat Rate</dt>
                <dd className="type-paragraph-small">
                  {contractTerms.seatRate}
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt className="type-label-medium-small">Term Period</dt>
                <dd className="type-paragraph-small">
                  {contractTerms.termPeriod}
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt className="type-label-medium-small">Renewal Notice</dt>
                <dd className="type-paragraph-small">
                  {contractTerms.renewalNotice}
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      )}
    </section>
  );
}
