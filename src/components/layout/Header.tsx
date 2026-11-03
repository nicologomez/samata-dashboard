"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { employerNav } from "@/config/navigation";
import type { EmployerProfile } from "@/types/dashboard";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { AddEmployeeDialog } from "@/features/employees/AddEmployeeDialog";
import styles from "./Header.module.css";


export function Header({
  profile,
  onOpenMenu,
}: {
  profile: EmployerProfile;
  onOpenMenu: () => void;
}) {
  const pathname = usePathname();
  const pageTitle =
    employerNav.find((item) => item.href === pathname)?.label ??
    (pathname === "/inbox" ? "Inbox" : "Home");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>
          <button
            type="button"
            className={styles.mobileMenu}
            aria-label="Open navigation"
            onClick={onOpenMenu}
          >
            ☰
          </button>
          <h1>{pageTitle}</h1>
        </div>
        <div className={styles.actions}>
          <Button onClick={() => setInviteOpen(true)}>Add Employees</Button>
          <Button
            variant="outline"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-controls="employer-search"
          >
            ⌕ Search
          </Button>
          <div className={styles.profile}>
            <button
              type="button"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((v) => !v)}
            >
              <Avatar name={profile.user} />
              <span>
                <strong>{profile.user}</strong>
                <small>{profile.role}</small>
              </span>
              <span aria-hidden="true">⌄</span>
            </button>
            {profileOpen && (
              <div className={styles.popup}>
                <p>Employer demo profile</p>
                <button type="button" onClick={() => setProfileOpen(false)}>
                  Close menu
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {searchOpen && (
        <div id="employer-search" className={styles.search}>
          <label htmlFor="dashboard-search">Search dashboard (demo)</label>
          <input
            id="dashboard-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try adoption or sessions"
          />
          <p role="status">
            {query
              ? `Demo search term: ${query}`
              : "Search is local to this demo."}
          </p>
        </div>
      )}
      <AddEmployeeDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
}
