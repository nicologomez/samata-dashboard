"use client";
import { useState } from "react";
import type { DashboardData, Period } from "@/types/dashboard";
import { getMetricsForPeriod, getTrendForPeriod } from "@/lib/trends";
import { MetricCard } from "@/features/dashboard/MetricCard";
import { ParticipationChart } from "@/features/dashboard/ParticipationChart";
import { CareAccess } from "@/features/dashboard/CareAccess";
import { TaskList } from "@/features/dashboard/TaskList";
import { QuickActions } from "@/features/dashboard/QuickActions";
import { Icon } from "@/components/ui/Icon";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import styles from "./DashboardView.module.css";

export function DashboardView({ data }: { data: DashboardData }) {
  const [glancePeriod, setGlancePeriod] = useState<Period>("monthly");
  const [participationPeriod, setParticipationPeriod] =
    useState<Period>("monthly");
  const metrics = getMetricsForPeriod(data, glancePeriod);
  const trend = getTrendForPeriod(data, participationPeriod);

  return (
    <main className={styles.dashboard}>
      <div className={styles.welcome}>
        <span className="type-paragraph-small">
          👋 Welcome back, {data.profile.user.split(" ")[0]}!
        </span>
        <span className="type-paragraph-small">
          <span className={styles.statusDot} /> BambooHR Sync:{" "}
          {data.profile.syncConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <div className={styles.board}>
        {/* Band 1: At a Glance + Things to do */}
        <div className={styles.row}>
          <section aria-labelledby="glance-heading" className={styles.glance}>
            <div className={styles.heading}>
              <h2 id="glance-heading" className="type-label-medium-medium">
                <Icon
                  name="sparkles"
                  size={14}
                  className={styles.headingIcon}
                />{" "}
                At a Glance
              </h2>
              <PeriodSelect
                label="At a Glance period"
                value={glancePeriod}
                onChange={setGlancePeriod}
              />
            </div>
            <div className={styles.metrics}>
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  period={glancePeriod}
                />
              ))}
            </div>
          </section>
          <aside className={styles.rail} aria-label="Things to do">
            <TaskList tasks={data.tasks} />
          </aside>
        </div>
        {/* Band 2: Employee Participation + Care Access + Quick Actions */}
        <div className={styles.row}>
          <div className={styles.analytics}>
            <section
              aria-labelledby="participation-heading"
              className={styles.chart}
            >
              <div className={styles.heading}>
                <h2
                  id="participation-heading"
                  className="type-label-medium-medium"
                >
                  <Icon
                    name="bar-chart"
                    size={14}
                    className={styles.headingIcon}
                  />{" "}
                  Employee Participation
                </h2>
                <PeriodSelect
                  label="Employee Participation period"
                  value={participationPeriod}
                  onChange={setParticipationPeriod}
                />
              </div>
              <div className={styles.chartContent}>
                <div className={styles.statRow}>
                  <div className={styles.statItem}>
                    <span className="type-label-medium-medium">
                      <Icon
                        name="dot"
                        size={8}
                        className={styles.participantsDot}
                      />{" "}
                      Active Participants
                    </span>
                    <strong className="type-heading-alt-medium-h4">
                      {trend.at(-1)?.participants ?? 0}
                    </strong>
                  </div>
                  <div className={styles.statItem}>
                    <span className="type-label-medium-medium">
                      <Icon
                        name="dot"
                        size={8}
                        className={styles.sessionsDot}
                      />{" "}
                      Sessions Completed
                    </span>
                    <strong className="type-heading-alt-medium-h4">
                      {trend.at(-1)?.sessions ?? 0}
                    </strong>
                  </div>
                </div>
                <ParticipationChart data={trend} period={participationPeriod} />
              </div>
            </section>
            <CareAccess data={data} />
          </div>
          <aside className={styles.rail} aria-label="Quick actions">
            <QuickActions />
          </aside>
        </div>
      </div>
    </main>
  );
}
