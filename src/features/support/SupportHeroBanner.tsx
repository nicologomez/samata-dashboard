"use client";

import type { SupportHeroData } from "@/types/employerSupport";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSupportContext } from "./SupportContext";
import styles from "./SupportHeroBanner.module.css";

type Props = {
  data: SupportHeroData;
};

/** Enterprise support search hero banner pairing full-width query filtering with quick jump shortcuts. */
export function SupportHeroBanner({ data }: Props) {
  const { globalQuery, setGlobalQuery, setNewTicketOpen } = useSupportContext();

  function handleShortcut(id: string, targetId: string) {
    if (id === "open-ticket") {
      setNewTicketOpen(true);
    }
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section aria-labelledby="support-hero-heading" className={styles.section}>
      <SectionHeader
        id="support-hero-heading"
        icon="sparkles"
        title={data.sectionTitle}
      />

      <Card
        surface="gradient"
        padding="none"
        elevation="sm"
        className={styles.banner}
      >
        <div className={styles.topRow}>
          <h3 className={`${styles.heading} type-heading-h5`}>{data.heading}</h3>
          <p className={`${styles.subtitle} type-paragraph-xsmall`}>
            {data.subtitle}
          </p>
        </div>

        <SearchInput
          label="Search support articles, FAQs, and past tickets"
          placeholder={data.searchPlaceholder}
          value={globalQuery}
          onChange={(event) => setGlobalQuery(event.target.value)}
          className={styles.searchBar}
        />

        <div className={styles.shortcuts} role="navigation" aria-label="Support quick links">
          {data.shortcuts.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.shortcutBtn} type-label-medium-small`}
              onClick={() => handleShortcut(item.id, item.targetId)}
            >
              <Icon name={item.icon} size={14} className={styles.shortcutIcon} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </section>
  );
}
