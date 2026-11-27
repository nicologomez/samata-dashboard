"use client";

import { useMemo, useState } from "react";
import type { FaqItem, FaqTopicId } from "@/types/employerSupport";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSupportContext } from "./SupportContext";
import styles from "./SupportFaqSection.module.css";

const topicOptions: readonly { id: FaqTopicId; label: string }[] = [
  { id: "all", label: "All topics" },
  { id: "billing", label: "Billing" },
  { id: "employees", label: "Employees" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
  { id: "clinical", label: "Clinical" },
];

type Props = {
  faqs: readonly FaqItem[];
};

/** Three-tier interactive FAQ card matching Figma 540:11925 with topic pills, search, and expandable rows. */
export function SupportFaqSection({ faqs }: Props) {
  const { globalQuery } = useSupportContext();
  const [selectedTopic, setSelectedTopic] = useState<FaqTopicId>("all");
  const [localQuery, setLocalQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const effectiveQuery = (localQuery || globalQuery).trim().toLowerCase();

  const visibleFaqs = useMemo(() => {
    return faqs.filter((item) => {
      if (selectedTopic !== "all" && item.topic !== selectedTopic) {
        return false;
      }
      if (!effectiveQuery) return true;
      return (
        item.question.toLowerCase().includes(effectiveQuery) ||
        item.answer.toLowerCase().includes(effectiveQuery)
      );
    });
  }, [faqs, selectedTopic, effectiveQuery]);

  return (
    <section
      id="support-faq"
      aria-labelledby="support-faq-heading"
      className={styles.section}
    >
      <SectionHeader
        id="support-faq-heading"
        icon="help-circle"
        title="Frequently Asked Questions"
      />

      <div className={styles.container}>
        <div className={styles.cardHeader}>
          <h3 className={`${styles.cardTitle} type-label-medium-large`}>
            Answers to the most common employer questions
          </h3>

          <div className={styles.filterBar}>
            <div
              className={styles.topics}
              role="group"
              aria-label="FAQ topic filter"
            >
              {topicOptions.map((topic) => (
                <Button
                  key={topic.id}
                  variant="pills"
                  size="xs"
                  state={selectedTopic === topic.id ? "pressed" : undefined}
                  aria-pressed={selectedTopic === topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  {topic.label}
                </Button>
              ))}
            </div>

            <SearchInput
              label="Search frequently asked questions"
              placeholder="Search"
              value={localQuery}
              onChange={(event) => setLocalQuery(event.target.value)}
              className={styles.searchField}
            />
          </div>
        </div>

        <div className={styles.accordionBody}>
          {visibleFaqs.length > 0 ? (
            <div className={styles.accordionList}>
              {visibleFaqs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div key={faq.id} className={styles.faqRow}>
                    <button
                      type="button"
                      className={styles.faqTrigger}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    >
                      <span className="type-paragraph-small">
                        {faq.question}
                      </span>
                      <Icon
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={20}
                        className={styles.chevron}
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className={`${styles.faqAnswer} type-paragraph-xsmall`}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={`${styles.empty} type-paragraph-small`}>
              No questions matched your filter.
            </p>
          )}
        </div>

        <div className={styles.cardFooter}>
          <span className="type-paragraph-small">Need more answers?</span>
          <a href="#csm-rail" className={`${styles.contactLink} type-link-14`}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
