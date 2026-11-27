"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SupportContextValue = {
  globalQuery: string;
  setGlobalQuery: (q: string) => void;
  newTicketOpen: boolean;
  setNewTicketOpen: (open: boolean) => void;
};

const SupportContext = createContext<SupportContextValue | null>(null);

export function SupportProvider({ children }: { children: ReactNode }) {
  const [globalQuery, setGlobalQuery] = useState("");
  const [newTicketOpen, setNewTicketOpen] = useState(false);

  return (
    <SupportContext.Provider
      value={{
        globalQuery,
        setGlobalQuery,
        newTicketOpen,
        setNewTicketOpen,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
}

export function useSupportContext(): SupportContextValue {
  const ctx = useContext(SupportContext);
  if (!ctx) {
    throw new Error("useSupportContext must be used inside SupportProvider");
  }
  return ctx;
}
