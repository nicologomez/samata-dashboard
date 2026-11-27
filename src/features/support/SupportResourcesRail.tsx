import Link from "next/link";
import type { SupportResourceItem } from "@/types/employerSupport";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./SupportResourcesRail.module.css";

type Props = {
  items: readonly SupportResourceItem[];
};

/** Right-rail stacked documentation and compliance resource cards matching Figma 540:11975. */
export function SupportResourcesRail({ items }: Props) {
  return (
    <section
      id="resources-docs"
      aria-labelledby="resources-docs-heading"
      className={styles.section}
    >
      <SectionHeader
        id="resources-docs-heading"
        icon="book-solid"
        title="Resources & Documentation"
      />

      <div className={styles.list}>
        {items.map((item) => (
          <Link key={item.id} href={item.href} className={styles.card}>
            <span className={styles.iconBox} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageSrc}
                alt=""
                width={24}
                height={24}
                className={styles.iconImg}
              />
            </span>
            <span className={styles.copy}>
              <strong className={`${styles.title} type-label-medium-medium`}>
                {item.title}
              </strong>
              <span className={`${styles.detail} type-paragraph-xsmall`}>
                {item.detail}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
