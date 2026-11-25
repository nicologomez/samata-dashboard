import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import styles from "./ActionBanner.module.css";

type Props = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  variant?: "compact" | "wide";
  artwork?: "flower" | "summary";
};

/** Subtle teal promotional/export banner shared across analytics and portal views. */
export function ActionBanner({
  title,
  description,
  ctaLabel,
  href,
  variant = "compact",
  artwork,
}: Props) {
  return (
    <section
      className={`${styles.banner} ${styles[`variant-${variant}`]}`}
      aria-label={title}
    >
      <div className={styles.copy}>
        <div className={styles.text}>
          <h3 className="type-heading-alt-regular-h5">{title}</h3>
          <p className="type-paragraph-xsmall">{description}</p>
        </div>
        <Link href={href} className={`${styles.cta} type-label-medium-small`}>
          <span>{ctaLabel}</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>

      {artwork === "flower" && (
        <Image
          src="/images/analytics-promote-flower.png"
          alt=""
          aria-hidden="true"
          width={222}
          height={219}
          className={styles.flowerArt}
        />
      )}

      {artwork === "summary" && (
        <div className={styles.summaryArt} aria-hidden="true">
          <Image
            src="/images/analytics-summary-bg.svg"
            alt=""
            width={341}
            height={226}
            className={styles.summaryBg}
          />
          <Image
            src="/images/analytics-summary-chart.svg"
            alt=""
            width={250}
            height={86}
            className={styles.summaryChart}
          />
        </div>
      )}
    </section>
  );
}
