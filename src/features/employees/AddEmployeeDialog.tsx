"use client";

import { useEffect, useRef, useState } from "react";
import type { AsyncState } from "@/types/asyncState";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/FormControls";
import styles from "./AddEmployeeDialog.module.css";

type Props = { open: boolean; onClose: () => void };

export function AddEmployeeDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<AsyncState>({ status: "idle" });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({
      status: "success",
      message: `Demo invitation prepared for ${email}. No email was sent.`,
    });
  }

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="invite-title"
    >
      <h2 id="invite-title" className="type-heading-h5">
        Add employees
      </h2>
      <p className="type-paragraph-small">
        Prepare a sample invitation for the employer demo.
      </p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="employee-email"
          label="Employee email"
          type="email"
          autoFocus
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className={styles.actions}>
          <Button type="submit">Prepare demo invite</Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
      {(result.status === "success" || result.status === "error") && (
        <p role="status" className={`${styles.feedback} type-paragraph-xsmall`}>
          {result.message}
        </p>
      )}
    </dialog>
  );
}
