import useSWR, { mutate } from "swr";
import { useMemo } from "react";
import { AppFileMeta, Group, User, Reading } from "../types/domain-types";
import { useState } from "react";
import { ReadingsAPI } from "../api/readings";
import { FormInput } from "../types/ReadingTypes";
import { fetcher } from "../context/fetcher";
import { useGroupContext } from "../context/GroupContextProvider";
import { apiFetch } from "../api/client";

export const useReadings = () => {
  const { activeGroup } = useGroupContext();

  const key = activeGroup
    ? `/groups/${activeGroup.id}/readings`
    : null;

  const swr = useSWR(
    key,
    (url) => {
      return apiFetch(url).then((res) => {
        
        return res as Reading[];
      });
    }
  );

  return {
    readings: swr.data ?? [],
    isLoading: swr.isLoading,
    isError: swr.error,
    mutate: swr.mutate,
  };
};



export function useReadingsActions(
  groupId: string | null,
  userId: string | null,
  mutateGroup: () => any
) 
{
    const disabled = !groupId || !userId;

    const create = async (input: FormInput, schedule: string) => {
    if (disabled) return;
    await ReadingsAPI.create(groupId, input, userId, schedule);
    mutateGroup();
  };

  const signup = async (readingId: string) => {
    if (disabled) return;
    await ReadingsAPI.signup(readingId, groupId, userId);
    mutateGroup();
  };

  const withdraw = async (readingId: string) => {
    if (disabled) return;
    await ReadingsAPI.withdraw(readingId, userId);
    mutateGroup();
  };

  const remove = async (readingId: string) => {
    if (disabled) return;
    await ReadingsAPI.remove(readingId, groupId);
    mutateGroup();
  };

  const addFile = async (groupId: string, readingId:string, appFileId: string) => {
    if (disabled) return;
    await ReadingsAPI.addFile(groupId, readingId, appFileId);
    mutateGroup();
  }

  return { create, signup, withdraw, remove, addFile };
}



export function useReadingsData(
  readings: Reading[] | undefined,
  user: User | null
) {
  const userId = user?.id ?? null;
  const safeReadings = Array.isArray(readings) ? readings : [];

  const myReadings = useMemo(() => {
    if (!userId) return [];

    return safeReadings.filter((r) =>
      Array.isArray(r.readingParticipant) &&
      r.readingParticipant.some((rp) => rp.userId === userId)
    );
  }, [safeReadings, userId]);

  const myFiles = useMemo(() => {
    return myReadings.flatMap((r) =>
      Array.isArray(r.readingParticipant)
        ? r.readingParticipant
            .map((rp) => rp.readingSubmission?.appFile?.appFileMeta)
            .filter(Boolean)
        : []
    );
  }, [myReadings]);

  return { myReadings, myFiles };
}



export function useReadingData(
  reading: Reading | null | undefined,
  user: User | null
) {
  const userId = user?.id ?? null;

  const isParticipant = useMemo(() => {
    if (!reading || !userId) return false;

    return (
      Array.isArray(reading.readingParticipant) &&
      reading.readingParticipant.some((rp) => rp.userId === userId)
    );
  }, [reading, userId]);

  const myFiles = useMemo(() => {
    if (!isParticipant || !reading) return [];

    return (
      reading.readingParticipant
        ?.map((rp) => rp.readingSubmission?.appFile?.appFileMeta)
        .filter(Boolean) ?? []
    );
  }, [reading, isParticipant]);

  return { isParticipant, myFiles };
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