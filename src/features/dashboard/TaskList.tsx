"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { DashboardTask } from "@/types/dashboard";
import type { AsyncState } from "@/types/asyncState";

import { runDemoTask } from "@/services/taskService";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

import styles from "./TaskList.module.css";

export function TaskList({ tasks }: { tasks: readonly DashboardTask[] }) {
  const router = useRouter();

  const [hiddenIds, setHiddenIds] = useState<readonly string[]>([]);
  const [result, setResult] = useState<AsyncState>({
    status: "idle",
  });

  const visible = tasks.filter((task) => !hiddenIds.includes(task.id));

  async function act(task: DashboardTask) {
    setResult({ status: "loading" });

    try {
      const response = await runDemoTask(task.action);

      setResult({
        status: "success",
        message: response.message,
      });
    } catch {
      setResult({
        status: "error",
        message: "The demo action could not finish.",
      });
    }
  }

  return (
    <section aria-labelledby="task-title" className={styles.list}>
      <h2 id="task-title" className="type-label-medium-medium">
        <Icon name="clipboard" size={14} className={styles.headingIcon} />{" "}
        Things to do
      </h2>

      {visible.length === 0 && (
        <p className="type-paragraph-small">All demo tasks dismissed.</p>
      )}

      {visible.length > 0 && (
        <div className={styles.cards}>
          {visible.map((task) => (
            <article className={styles.task} key={task.id}>
              <small className={`${styles.age} type-label-medium-xsmall`}>
                {task.age}
              </small>

              <div className={styles.body}>
                <button
                  type="button"
                  className={styles.dismiss}
                  onClick={() => setHiddenIds((ids) => [...ids, task.id])}
                  aria-label={`Dismiss ${task.title}`}
                >
                  <Icon name="close" size={14} />
                </button>

                <div className={styles.content}>
                  <div className={styles.description}>
                    <h3 className="type-heading-alt-medium-h7">{task.title}</h3>

                    <p className="type-paragraph-xsmall">{task.detail}</p>
                  </div>

                  <div className={styles.actions}>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => router.push(task.href)}
                    >
                      View
                    </Button>

                    <Button
                      variant="primary"
                      size="xs"
                      disabled={result.status === "loading"}
                      onClick={() => void act(task)}
                    >
                      {task.action === "remind" ? "Remind" : "Sync"}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {result.status === "loading" && (
        <p role="status" className="type-paragraph-xsmall">
          Preparing demo action…
        </p>
      )}

      {(result.status === "success" || result.status === "error") && (
        <p role="status" className="type-paragraph-xsmall">
          {result.message}
        </p>
      )}
    </section>
  );
}
