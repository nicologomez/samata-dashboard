"use client";

import { useState } from "react";
import type { CustomerSuccessManagerData } from "@/types/employerSupport";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./CustomerSuccessCard.module.css";

type Props = {
  data: CustomerSuccessManagerData;
};

/** Right-rail glowing CSM card housing Helena Ramirez's profile and direct live chat / call scheduling actions. */
export function CustomerSuccessCard({ data }: Props) {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  return (
    <section
      id="csm-rail"
      aria-labelledby="csm-rail-heading"
      className={styles.section}
    >
      <SectionHeader
        id="csm-rail-heading"
        icon="grid"
        title="Customer Success Manager"
      />

      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <div className={styles.profileRow}>
          <Avatar name={data.name} src={data.avatarSrc} size={32} />
          <div className={styles.profileCopy}>
            <strong className={`${styles.name} type-label-medium-medium`}>
              {data.name}
            </strong>
            <span className={`${styles.meta} type-paragraph-xsmall`}>
              {data.statusText}
            </span>
          </div>
        </div>

        <p className={`${styles.email} type-paragraph-xsmall`}>{data.email}</p>

        <div className={styles.tiles}>
          {data.actions.map((action) => {
            const triggered = activeAction === action.id;
            return (
              <button
                key={action.id}
                type="button"
                className={styles.tileButton}
                aria-pressed={triggered}
                onClick={() => setActiveAction(triggered ? null : action.id)}
              >
                <span className={styles.iconBox} aria-hidden="true">
                  <Icon
                    name={action.icon}
                    size={24}
                    className={styles.tileIcon}
                  />
                </span>
                <span className={styles.tileCopy}>
                  <strong className={`${styles.tileTitle} type-label-medium-medium`}>
                    {action.title}
                  </strong>
                  <span className={`${styles.tileSub} type-paragraph-xsmall`}>
                    {triggered
                      ? action.id === "start-chat"
                        ? "Connecting you with Helena..."
                        : "Booking times loaded"
                      : action.detail}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
