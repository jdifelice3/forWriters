import { useState } from "react";
import { Reading } from "../types/domain-types";

export const useReadingsUI = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [editing, setEditing] = useState<Reading | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  return {
    // state
    open,
    submitting,
    error,
    success,
    editing,
    editTitle,
    editDescription,

    // semantic UI actions
    openCreate: () => setOpen(true),
    closeCreate: () => setOpen(false),

    startEdit: (r: Reading) => {
      setEditing(r);
      setEditTitle(r.name);
      setEditDescription(r.description || "");
    },

    cancelEdit: () => setEditing(null),

    beginSubmit: () => {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
    },

    endSubmit: () => setSubmitting(false),
    setError,
    setSuccess,
  };
}
