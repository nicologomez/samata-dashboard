"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SearchInput } from "@/components/ui/SearchInput";
import type { PortalNavItem } from "./Sidebar";
import styles from "./Header.module.css";

export type PortalProfile = {
  readonly user: string;
  readonly role: string;
  readonly menuNote?: string;
};

type Props = {
  navItems: readonly Pick<PortalNavItem, "href" | "label">[];
  profile: PortalProfile;
  primaryAction?: {
    readonly label: string;
    readonly icon?: IconName;
    readonly onClick: () => void;
  };
  onOpenMenu: () => void;
};

/** Portal-agnostic sticky header with route title, search drawer, primary CTA, and profile menu. */
export function Header({
  navItems,
  profile,
  primaryAction,
  onOpenMenu,
}: Props) {
  const pathname = usePathname();
  const pageTitle =
    navItems.find((item) => item.href === pathname)?.label ??
    (pathname === "/inbox" ? "Inbox" : "Home");
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
            <Icon name="menu" size={20} />
          </button>
          <h1 className="type-heading-h5">{pageTitle}</h1>
        </div>

        <div className={styles.actions}>
          {primaryAction && (
            <Button
              size="sm"
              showLeftIcon={Boolean(primaryAction.icon)}
              leftIcon={primaryAction.icon}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            showLeftIcon
            leftIcon="search"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-controls="portal-search"
          >
            Search
          </Button>

          <div className={styles.profile}>
            <button
              type="button"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((v) => !v)}
            >
              <Avatar name={profile.user} />
              <span>
                <strong className="type-heading-h7">{profile.user}</strong>
                <small className="type-label-medium-medium">
                  {profile.role}
                </small>
              </span>
              <Icon name="chevron-down" size={16} className={styles.chevron} />
            </button>
            {profileOpen && (
              <div className={styles.popup}>
                <p className="type-paragraph-small">
                  {profile.menuNote ?? "Account profile"}
                </p>
                <button
                  className="type-label-medium-small"
                  type="button"
                  onClick={() => setProfileOpen(false)}
                >
                  Close menu
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {searchOpen && (
        <div id="portal-search" className={styles.search}>
          <SearchInput
            label="Search workspace"
            placeholder="Try adoption or sessions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchBox}
          />
          <p className="type-paragraph-xsmall" role="status">
            {query
              ? `Search term: ${query}`
              : "Search is scoped to local demo data."}
          </p>
        </div>
      )}
    </>
  );
}
