"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Icon } from "@/components/ui/Icon";
import styles from "./DataTable.module.css";

export type SortDirection = "asc" | "desc";

export interface DataTableColumn<T = unknown, K extends string = string> {
  readonly key: K;
  readonly label: string;
  readonly width?: string;
  readonly sortable?: boolean;
  readonly alignMenu?: "left" | "right";
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

/** Domain-blind data table pattern supporting Select-All/Dash, column sort dropdowns, and balanced action columns. */
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
  const [openMenuKey, setOpenMenuKey] = useState<K | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenuKey) return;

    function handlePointerDown(event: MouseEvent) {
      if (!frameRef.current?.contains(event.target as Node)) {
        setOpenMenuKey(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenuKey(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenuKey]);

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

  function applySort(key: K, direction: SortDirection | null) {
    setSortState(direction ? { key, direction } : null);
    setOpenMenuKey(null);
  }

  return (
    <div ref={frameRef} className={`${styles.frame} ${className}`}>
      <div className={styles.scrollArea}>
        <table className={styles.table} aria-label={tableLabel}>
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className={styles.checkCol}>
                  <div className={styles.centerCell}>
                    <Checkbox
                      size="sm"
                      checked={allChecked}
                      indeterminate={someChecked}
                      onChange={toggleAll}
                      label={`Select all in ${tableLabel}`}
                    />
                  </div>
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sortState?.key === col.key;
                const isOpen = openMenuKey === col.key;
                const ariaSort = isSorted
                  ? sortState.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : col.sortable
                    ? "none"
                    : undefined;

                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort}
                    className={styles.thCell}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.sortable ? (
                      <div className={styles.sortWrap}>
                        <button
                          type="button"
                          className={`${styles.sortTrigger} type-label-medium-small`}
                          data-active={isSorted ? "true" : undefined}
                          aria-expanded={isOpen}
                          aria-haspopup="menu"
                          onClick={() =>
                            setOpenMenuKey((prev) =>
                              prev === col.key ? null : col.key,
                            )
                          }
                        >
                          <span>{col.label}</span>
                          <Icon
                            name={
                              isSorted && sortState.direction === "asc"
                                ? "chevron-up"
                                : "chevron-down"
                            }
                            size={12}
                          />
                        </button>

                        {isOpen && (
                          <div
                            role="menu"
                            aria-label={`Sort by ${col.label}`}
                            className={styles.sortMenu}
                            data-align={col.alignMenu ?? "left"}
                          >
                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={
                                isSorted && sortState.direction === "asc"
                              }
                              className={`${styles.sortOption} type-label-medium-small`}
                              onClick={() => applySort(col.key, "asc")}
                            >
                              <Icon name="chevron-up" size={12} />
                              <span>Sort A to Z</span>
                            </button>
                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={
                                isSorted && sortState.direction === "desc"
                              }
                              className={`${styles.sortOption} type-label-medium-small`}
                              onClick={() => applySort(col.key, "desc")}
                            >
                              <Icon name="chevron-down" size={12} />
                              <span>Sort Z to A</span>
                            </button>
                            {isSorted && (
                              <button
                                type="button"
                                role="menuitem"
                                className={`${styles.sortOption} ${styles.sortReset} type-label-medium-small`}
                                onClick={() => applySort(col.key, null)}
                              >
                                <Icon name="close" size={12} />
                                <span>Default order</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span
                        className={`${styles.headerLabel} type-label-medium-small`}
                      >
                        {col.label}
                      </span>
                    )}
                  </th>
                );
              })}
              {hasRowAction && (
                <th scope="col" className={styles.actionCol}>
                  <span className={styles.visuallyHidden}>Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => {
              const key = getRowKey(row);
              const rowLabel = getRowLabel?.(row) ?? key;
              const isChecked = selectedKeys.has(key);

              return (
                <tr key={key} data-selected={isChecked ? "true" : undefined}>
                  {selectable && (
                    <td className={styles.checkCol}>
                      <div className={styles.centerCell}>
                        <Checkbox
                          size="sm"
                          checked={isChecked}
                          onChange={() => toggleRow(key)}
                          label={`Select ${rowLabel}`}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key}>{renderCell(row, col.key)}</td>
                  ))}
                  {hasRowAction && (
                    <td className={styles.actionCol}>
                      <div className={styles.centerCell}>
                        {renderRowAction?.(row)}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
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
