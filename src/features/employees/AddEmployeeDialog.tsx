"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./AddEmployeeDialog.module.css";

type Props = { open: boolean; onClose: () => void };
export function AddEmployeeDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="invite-title"
    >
      <h2 id="invite-title">Add employees</h2>
      <p>Prepare a sample invitation for the employer demo.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(
            `Demo invitation prepared for ${email}. No email was sent.`,
          );
        }}
      >
        <label htmlFor="employee-email">Employee email</label>
        <input
          id="employee-email"
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
      {message && <p role="status">{message}</p>}
    </dialog>
  );
}
