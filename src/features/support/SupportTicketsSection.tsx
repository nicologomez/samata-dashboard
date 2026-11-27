"use client";

import { useMemo, useState, type FormEvent } from "react";
import type {
  SupportTicketRecord,
  TicketPriority,
  TicketStatus,
  TicketTabId,
} from "@/types/employerSupport";
import { Button } from "@/components/ui/Button";
import { HorizontalTabs } from "@/components/ui/HorizontalTabs";
import { Pill, type PillTone } from "@/components/ui/Pill";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/patterns/DataTable";
import { useSupportContext } from "./SupportContext";
import styles from "./SupportTicketsSection.module.css";

type ColumnKey = "overview" | "ticket" | "status";
type PriorityFilter = "all" | TicketPriority;

const PAGE_SIZE = 6;

const tabs: readonly { id: TicketTabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "pending", label: "Pending" },
  { id: "resolved", label: "Resolved" },
];

const tabHeadingMap: Record<TicketTabId, string> = {
  all: "All Tickets",
  open: "Open Tickets",
  pending: "Pending Tickets",
  resolved: "Resolved Tickets",
};

const statusPillMap: Record<TicketStatus, { label: string; tone: PillTone }> = {
  open: { label: "Open", tone: "info" },
  pending: { label: "Pending", tone: "warning" },
  resolved: { label: "Resolved", tone: "success" },
};

const priorityPillMap: Record<
  TicketPriority,
  { label: string; tone: PillTone }
> = {
  high: { label: "High", tone: "error" },
  medium: { label: "Medium", tone: "info" },
  low: { label: "Low", tone: "plain" },
};

const priorityCycle: readonly PriorityFilter[] = [
  "all",
  "high",
  "medium",
  "low",
];

const columns: readonly DataTableColumn<SupportTicketRecord, ColumnKey>[] = [
  {
    key: "overview",
    label: "Ticket Overview",
    weight: 3.1,
  },
  {
    key: "ticket",
    label: "Ticket",
    width: "150px",
  },
  {
    key: "status",
    label: "Status",
    width: "150px",
  },
];

function renderTicketCell(row: SupportTicketRecord, columnKey: ColumnKey) {
  switch (columnKey) {
    case "overview": {
      const priorityConfig = priorityPillMap[row.priority];
      return (
        <div className={styles.overviewCell}>
          <div className={styles.overviewText}>
            <strong className={`${styles.subject} type-label-medium-medium`}>
              {row.subject}
            </strong>
            <p className={`${styles.reply} type-paragraph-xsmall`}>
              {row.latestReply}
            </p>
          </div>
          <div className={styles.metaRow}>
            <Pill
              variant="display"
              tone={priorityConfig.tone}
              showLeftIcon={false}
              showRightIcon={false}
            >
              {priorityConfig.label}
            </Pill>
            <Pill
              variant="display"
              tone={row.categoryTone}
              showLeftIcon={false}
              showRightIcon={false}
            >
              {row.category}
            </Pill>
            <span className={`${styles.timestamp} type-label-medium-xsmall`}>
              {row.updatedAtLabel}
            </span>
          </div>
        </div>
      );
    }
    case "ticket":
      return (
        <Pill variant="hash" showLeftIcon={false} showRightIcon={false}>
          {row.ticketCode}
        </Pill>
      );
    case "status": {
      const statusConfig = statusPillMap[row.status];
      return (
        <Pill
          variant="display"
          tone={statusConfig.tone}
          showLeftIcon
          showRightIcon={false}
        >
          {statusConfig.label}
        </Pill>
      );
    }
  }
}

type Props = {
  tickets: readonly SupportTicketRecord[];
  totalTickets: number;
};

/** Interactive tabbed Support Tickets table connected to global Support search and ticket submission. */
export function SupportTicketsSection({ tickets, totalTickets }: Props) {
  const { globalQuery, newTicketOpen, setNewTicketOpen } = useSupportContext();
  const [ticketList, setTicketList] =
    useState<readonly SupportTicketRecord[]>(tickets);
  const [activeTab, setActiveTab] = useState<TicketTabId>("all");
  const [localQuery, setLocalQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);

  const [draftSubject, setDraftSubject] = useState("");
  const [draftCategory, setDraftCategory] = useState("HRIS Integration");
  const [draftPriority, setDraftPriority] = useState<TicketPriority>("medium");

  const effectiveQuery = (localQuery || globalQuery).trim().toLowerCase();

  const filteredTickets = useMemo(() => {
    return ticketList.filter((item) => {
      if (activeTab !== "all" && item.status !== activeTab) return false;
      if (priorityFilter !== "all" && item.priority !== priorityFilter) {
        return false;
      }
      if (!effectiveQuery) return true;
      return (
        item.subject.toLowerCase().includes(effectiveQuery) ||
        item.latestReply.toLowerCase().includes(effectiveQuery) ||
        item.ticketCode.toLowerCase().includes(effectiveQuery) ||
        item.category.toLowerCase().includes(effectiveQuery)
      );
    });
  }, [ticketList, activeTab, priorityFilter, effectiveQuery]);

  const maxPage = Math.max(0, Math.ceil(filteredTickets.length / PAGE_SIZE) - 1);
  const safePage = Math.min(page, maxPage);

  const visibleTickets = useMemo(() => {
    if (showAll) return filteredTickets;
    const start = safePage * PAGE_SIZE;
    return filteredTickets.slice(start, start + PAGE_SIZE);
  }, [filteredTickets, showAll, safePage]);

  function cyclePriority() {
    const idx = priorityCycle.indexOf(priorityFilter);
    const next = priorityCycle[(idx + 1) % priorityCycle.length];
    setPriorityFilter(next);
    setPage(0);
  }

  function handleCreateTicket(event: FormEvent) {
    event.preventDefault();
    const subject = draftSubject.trim();
    if (!subject) return;
    const nextNum = 41 + (ticketList.length - tickets.length);
    const categoryToneMap: Record<string, PillTone> = {
      "HRIS Integration": "info",
      Billing: "success",
      Security: "warning",
      "Employee Management": "success",
      "Technical Issue": "info",
    };
    const created: SupportTicketRecord = {
      id: `tkt-2026-0${nextNum}`,
      ticketCode: `#TKT-2026-0${nextNum}`,
      subject,
      latestReply:
        "You opened this ticket · Assigned to Helena Ramirez (CSM).",
      priority: draftPriority,
      category: draftCategory,
      categoryTone: categoryToneMap[draftCategory] ?? "info",
      updatedAtLabel: "Just now",
      status: "open",
    };
    setTicketList((prev) => [created, ...prev]);
    setDraftSubject("");
    setActiveTab("all");
    setPage(0);
    setNewTicketOpen(false);
  }

  const startNum =
    showAll || visibleTickets.length === 0 ? 1 : safePage * PAGE_SIZE + 1;
  const endNum = showAll
    ? visibleTickets.length
    : safePage * PAGE_SIZE + visibleTickets.length;
  const countDenominator =
    activeTab === "all" && priorityFilter === "all" && !effectiveQuery
      ? totalTickets + (ticketList.length - tickets.length)
      : filteredTickets.length;

  const footerSummary =
    visibleTickets.length === 0
      ? "No matching support tickets"
      : `Showing ${startNum}-${endNum} of ${countDenominator} Tickets`;

  return (
    <section
      id="support-tickets"
      aria-labelledby="support-tickets-heading"
      className={styles.section}
    >
      <div className={styles.headerBlock}>
        <SectionHeader
          id="support-tickets-heading"
          icon="doc-fill"
          title="Tickets"
        />

        <HorizontalTabs
          tabs={tabs}
          value={activeTab}
          onChange={(id) => {
            setActiveTab(id as TicketTabId);
            setPage(0);
          }}
        />
      </div>

      <div className={styles.ticketsBody}>
        <div className={styles.toolbar}>
          <h3 className="type-heading-h5">{tabHeadingMap[activeTab]}</h3>

          <div className={styles.controls}>
            <SearchInput
              label="Search support tickets"
              placeholder="Search"
              value={localQuery}
              onChange={(event) => {
                setLocalQuery(event.target.value);
                setPage(0);
              }}
              className={styles.searchField}
            />
            <Button
              variant="secondary"
              size="xs"
              showLeftIcon
              leftIcon="settings-04"
              onClick={cyclePriority}
            >
              {priorityFilter === "all"
                ? "Filter"
                : priorityPillMap[priorityFilter].label}
            </Button>
            <Button
              variant="primary"
              size="xs"
              showLeftIcon
              leftIcon="plus"
              onClick={() => setNewTicketOpen(!newTicketOpen)}
            >
              New ticket
            </Button>
          </div>
        </div>

        {newTicketOpen && (
          <form onSubmit={handleCreateTicket} className={styles.newTicketBox}>
            <div className={styles.newTicketHeader}>
              <strong className="type-label-medium-medium">
                Submit New Support Ticket
              </strong>
              <Button
                variant="basic"
                state="transparent"
                size="xs"
                mode="icon"
                leftIcon="close"
                aria-label="Close new ticket form"
                onClick={() => setNewTicketOpen(false)}
              />
            </div>
            <div className={styles.newTicketFields}>
              <input
                type="text"
                required
                placeholder="Describe your issue or question..."
                value={draftSubject}
                onChange={(event) => setDraftSubject(event.target.value)}
                className={`${styles.input} type-paragraph-small`}
              />
              <select
                aria-label="Ticket category"
                value={draftCategory}
                onChange={(event) => setDraftCategory(event.target.value)}
                className={`${styles.select} type-paragraph-xsmall`}
              >
                <option value="HRIS Integration">HRIS Integration</option>
                <option value="Billing">Billing</option>
                <option value="Security">Security</option>
                <option value="Employee Management">Employee Management</option>
                <option value="Technical Issue">Technical Issue</option>
              </select>
              <select
                aria-label="Ticket priority"
                value={draftPriority}
                onChange={(event) =>
                  setDraftPriority(event.target.value as TicketPriority)
                }
                className={`${styles.select} type-paragraph-xsmall`}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <Button type="submit" variant="primary" size="xs">
                Submit Ticket
              </Button>
            </div>
          </form>
        )}

        <DataTable
          tableLabel="Support tickets"
          columns={columns}
          rows={visibleTickets}
          getRowKey={(row) => row.id}
          getRowLabel={(row) => row.ticketCode}
          renderCell={renderTicketCell}
          selectable={false}
          hasRowAction={false}
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
    </section>
  );
}
