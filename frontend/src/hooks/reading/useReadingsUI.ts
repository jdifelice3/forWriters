import { useState } from "react";
import { Reading } from "../../types/domain-types";

export function useReadingsUI() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editing, setEditing] = useState<Reading | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  return {
    // --- state ---
    open,
    submitting,
    error,
    success,
    editing,
    editTitle,
    editDescription,

    // --- setters (UI only) ---
    setEditTitle,
    setEditDescription,
    setError,
    setSuccess,

    // --- semantic UI actions ---
    openCreate: () => setOpen(true),
    closeCreate: () => setOpen(false),

    startEdit: (reading: Reading) => {
      setEditing(reading);
      setEditTitle(reading.name);
      setEditDescription(reading.description || "");
    },

    cancelEdit: () => setEditing(null),

    beginSubmit: () => {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
    },

    endSubmit: () => setSubmitting(false),
  };
}
