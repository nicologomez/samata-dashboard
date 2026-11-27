"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  ActivityLogFilter,
  IntegrationLogEntry,
} from "@/types/employerIntegrations";

type ActivityLogContextValue = {
  activeFilter: ActivityLogFilter;
  filteredLogs: readonly IntegrationLogEntry[];
  selectedLog: IntegrationLogEntry;
  setActiveFilter: (filter: ActivityLogFilter) => void;
  setSelectedLogId: (logId: string) => void;
};

const ActivityLogContext = createContext<ActivityLogContextValue | null>(null);

export function ActivityLogProvider({
  logs,
  children,
}: {
  logs: readonly IntegrationLogEntry[];
  children: ReactNode;
}) {
  const [activeFilter, setActiveFilterState] =
    useState<ActivityLogFilter>("hris");
  const [selectedLogId, setSelectedLogId] = useState<string>(
    logs[0]?.id ?? "",
  );

  const filteredLogs = useMemo(
    () => logs.filter((entry) => entry.category === activeFilter),
    [logs, activeFilter],
  );

  const selectedLog = useMemo(() => {
    const directMatch = logs.find((entry) => entry.id === selectedLogId);
    if (directMatch && directMatch.category === activeFilter) {
      return directMatch;
    }
    return filteredLogs[0] ?? logs[0];
  }, [logs, filteredLogs, selectedLogId, activeFilter]);

  function setActiveFilter(nextFilter: ActivityLogFilter) {
    setActiveFilterState(nextFilter);
    const firstInCategory = logs.find((entry) => entry.category === nextFilter);
    if (firstInCategory) {
      setSelectedLogId(firstInCategory.id);
    }
  }

  return (
    <ActivityLogContext.Provider
      value={{
        activeFilter,
        filteredLogs,
        selectedLog,
        setActiveFilter,
        setSelectedLogId,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
}

export function useActivityLog(): ActivityLogContextValue {
  const ctx = useContext(ActivityLogContext);
  if (!ctx) {
    throw new Error("useActivityLog must be used inside ActivityLogProvider");
  }
  return ctx;
}
