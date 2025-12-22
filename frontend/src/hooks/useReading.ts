import useSWR, { mutate } from "swr";
import { apiFetch } from "../api/client";
import { useGroupContext } from "../context/GroupContextProvider";
import { fetcher } from "../context/fetcher";
import { useMemo } from "react";
import { AppFile, Group, User } from "../types/domain-types";
import { useState } from "react";
import { Reading } from "../types/domain-types";
import { ReadingsAPI } from "../api/readings";
import { FormInput } from "../types/ReadingTypes";

export function useReadingsActions(
  groupId: string,
  userId: string,
  refresh: () => void
) {
    const create = async (input: FormInput, schedule: string) => {
    await ReadingsAPI.create(groupId, input, userId, schedule);
    refresh();
  };

  const signup = async (readingId: string) => {
    await ReadingsAPI.signup(readingId, userId);
    refresh();
  };

  const withdraw = async (readingId: string) => {
    await ReadingsAPI.withdraw(readingId, userId);
    refresh();
  };

  const remove = async (readingId: string) => {
    await ReadingsAPI.remove(readingId, groupId);
    refresh();
  };

  return { create, signup, withdraw, remove };
}

export function useReadingsData(
  group?: Group,
  user?: User
) {
  const myReadings = useMemo(() => {
    if (!group || !user) return [];
    return group.reading.filter(r =>
      r.readingAuthor.some(ra => ra.authorId === user.id)
    );
  }, [group, user]);

  const myFiles = useMemo(() => {
    if (!group) return [];
    return myReadings.flatMap(r =>
      r.readingAuthor
        .map(ra => ra.authorAppFileMeta?.appFileMeta)
        .filter(Boolean)
    );
  }, [myReadings, group]);

  return { myReadings, myFiles };
}

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
