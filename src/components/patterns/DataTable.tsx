"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Icon } from "@/components/ui/Icon";
import styles from "./DataTable.module.css";

export type SortDirection = "asc" | "desc";

export interface DataTableColumn<T = unknown, K extends string = string> {
  readonly key: K;
  readonly label: string;
  readonly width?: string;
  /** Relative track weight (fr) for CSS Grid column sizing. */
  readonly weight?: number;
  readonly sortable?: boolean;
  readonly sortValue?: (row: T) => string | number | undefined;
}

type SortState<K extends string> = {
  key: K;
  direction: SortDirection;
} | null;

function compareSortValues(
  aVal: string | number | undefined,
  bVal: string | number | undefined,
  direction: SortDirection,
): number {
  if (aVal === undefined && bVal === undefined) return 0;
  if (aVal === undefined) return 1;
  if (bVal === undefined) return -1;

  const base =
    typeof aVal === "number" && typeof bVal === "number"
      ? aVal - bVal
      : String(aVal).localeCompare(String(bVal), undefined, {
          numeric: true,
          sensitivity: "base",
        });

  return direction === "asc" ? base : -base;
}

type Props<T, K extends string> = {
  tableLabel: string;
  columns: readonly DataTableColumn<T, K>[];
  rows: readonly T[];
  getRowKey: (row: T) => string;
  getRowLabel?: (row: T) => string;
  renderCell: (row: T, columnKey: K) => ReactNode;
  selectable?: boolean;
  hasRowAction?: boolean;
  renderRowAction?: (row: T) => ReactNode;
  footerSummary?: string;
  showAllLabel?: string;
  onShowAll?: () => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  className?: string;
};

/** Domain-blind ARIA Grid table supporting Select-All/Dash, direct chevron sorting, equal cross-browser layout, and mobile-only horizontal scroll. */
export function DataTable<T, K extends string>({
  tableLabel,
  columns,
  rows,
  getRowKey,
  getRowLabel,
  renderCell,
  selectable = false,
  hasRowAction = false,
  renderRowAction,
  footerSummary,
  showAllLabel,
  onShowAll,
  onPrevPage,
  onNextPage,
  className = "",
}: Props<T, K>) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(() => new Set());
  const [sortState, setSortState] = useState<SortState<K>>(null);

  const sortedRows = useMemo(() => {
    if (!sortState) return rows;
    const col = columns.find((item) => item.key === sortState.key);
    if (!col?.sortValue) return rows;
    const extract = col.sortValue;
    return [...rows].sort((a, b) =>
      compareSortValues(extract(a), extract(b), sortState.direction),
    );
  }, [columns, rows, sortState]);

  const rowKeys = useMemo(
    () => sortedRows.map((row) => getRowKey(row)),
    [sortedRows, getRowKey],
  );

  const selectedCount = rowKeys.filter((k) => selectedKeys.has(k)).length;
  const allChecked = rowKeys.length > 0 && selectedCount === rowKeys.length;
  const someChecked = selectedCount > 0 && selectedCount < rowKeys.length;

  const gridTemplate = [
    selectable ? "48px" : null,
    ...columns.map((col) => {
      if (col.weight !== undefined) return `minmax(0, ${col.weight}fr)`;
      return col.width ? col.width : "minmax(0, 1fr)";
    }),
    hasRowAction ? "48px" : null,
  ]
    .filter(Boolean)
    .join(" ");

  function toggleAll() {
    if (allChecked || someChecked) {
      setSelectedKeys(new Set());
      return;
    }
    setSelectedKeys(new Set(rowKeys));
  }

  function toggleRow(key: string) {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleSort(key: K) {
    setSortState((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "desc" ? "asc" : "desc" };
      }
      return { key, direction: "desc" };
    });
  }

  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.scrollArea}>
        <div
          role="table"
          className={styles.table}
          aria-label={tableLabel}
          style={{ "--table-cols": gridTemplate } as CSSProperties}
        >
          <div role="rowgroup" className={styles.thead}>
            <div role="row" className={styles.headerRow}>
              {selectable && (
                <div role="columnheader" className={`${styles.th} ${styles.checkCol}`}>
                  <div className={styles.centerCell}>
                    <Checkbox
                      size="sm"
                      checked={allChecked}
                      indeterminate={someChecked}
                      onChange={toggleAll}
                      label={`Select all in ${tableLabel}`}
                    />
                  </div>
                </div>
              )}
              {columns.map((col) => {
                const isSorted = sortState?.key === col.key;
                const isDesc = isSorted && sortState.direction === "desc";
                const ariaSort = isSorted
                  ? sortState.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : col.sortable
                    ? "none"
                    : undefined;

                return (
                  <div
                    key={col.key}
                    role="columnheader"
                    aria-sort={ariaSort}
                    className={styles.th}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        className={`${styles.sortTrigger} type-label-medium-small`}
                        onClick={() => toggleSort(col.key)}
                        aria-label={`Sort ${col.label} ${isDesc ? "ascending" : "descending"}`}
                      >
                        <span>{col.label}</span>
                        <Icon
                          name={isDesc ? "chevron-up" : "chevron-down"}
                          size={12}
                          className={styles.sortChevron}
                        />
                      </button>
                    ) : (
                      <span
                        className={`${styles.headerLabel} type-label-medium-small`}
                      >
                        {col.label}
                      </span>
                    )}
                  </div>
                );
              })}
              {hasRowAction && (
                <div role="columnheader" className={`${styles.th} ${styles.actionCol}`}>
                  <span className={styles.visuallyHidden}>Actions</span>
                </div>
              )}
            </div>
          </div>

          <div role="rowgroup" className={styles.tbody}>
            {sortedRows.map((row) => {
              const key = getRowKey(row);
              const rowLabel = getRowLabel?.(row) ?? key;
              const isChecked = selectedKeys.has(key);

              return (
                <div
                  key={key}
                  role="row"
                  className={styles.bodyRow}
                  data-selected={isChecked ? "true" : undefined}
                >
                  {selectable && (
                    <div role="cell" className={`${styles.td} ${styles.checkCol}`}>
                      <div className={styles.centerCell}>
                        <Checkbox
                          size="sm"
                          checked={isChecked}
                          onChange={() => toggleRow(key)}
                          label={`Select ${rowLabel}`}
                        />
                      </div>
                    </div>
                  )}
                  {columns.map((col) => (
                    <div key={col.key} role="cell" className={styles.td}>
                      {renderCell(row, col.key)}
                    </div>
                  ))}
                  {hasRowAction && (
                    <div role="cell" className={`${styles.td} ${styles.actionCol}`}>
                      <div className={styles.centerCell}>
                        {renderRowAction?.(row)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {(footerSummary || onPrevPage || onNextPage) && (
        <div className={styles.footer}>
          <div className={`${styles.footerMeta} type-label-medium-small`}>
            {footerSummary && <span>{footerSummary}</span>}
            {showAllLabel && (
              <button
                type="button"
                className={`${styles.showAllBtn} type-label-medium-small`}
                onClick={onShowAll}
              >
                {showAllLabel}
              </button>
            )}
          </div>
          <div className={styles.footerPager}>
            <button
              type="button"
              className={styles.pagerBtn}
              aria-label="Previous page"
              onClick={onPrevPage}
            >
              <Icon name="chevron-left" size={24} />
            </button>
            <button
              type="button"
              className={styles.pagerBtn}
              aria-label="Next page"
              onClick={onNextPage}
            >
              <Icon name="chevron-right" size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
