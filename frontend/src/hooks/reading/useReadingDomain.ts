import { useCallback } from "react";
import { useReadings } from "./useReadings";
import { ReadingsAPI } from "../../api/readingsApi";
import { CreateReadingInput } from "../../types/ReadingTypes";

export function useReadingDomain(
  groupId: string | null,
  userId: string | null
) {
  const { mutate } = useReadings();
  const disabled = !groupId || !userId;

  const createReading = useCallback(async (input: CreateReadingInput) => {
  if (disabled) return;
  await ReadingsAPI.create(groupId!, input, userId!, input.schedule);
  await mutate();
}, [groupId, userId, disabled, mutate]);

  const signUpForReading = useCallback(async (readingId: string) => {
    if (disabled) return;
    await ReadingsAPI.signup(readingId, groupId!, userId!);
    await mutate();
  }, [groupId, userId, disabled, mutate]);

  const withdrawFromReading = useCallback(async (readingId: string) => {
    if (disabled) return;
    await ReadingsAPI.withdraw(readingId, userId!);
    await mutate();
  }, [userId, disabled, mutate]);

  const deleteReading = useCallback(async (readingId: string) => {
    if (disabled) return;
    await ReadingsAPI.remove(readingId, groupId!);
    await mutate();
  }, [groupId, disabled, mutate]);

  const submitFileVersion = useCallback(async (readingId: string, appFileId: string) => {
    if (disabled) return;
    await ReadingsAPI.addVersion(groupId!, readingId, appFileId);
    await mutate();
  }, [groupId, disabled, mutate]);

  const updateSubmittedVersion = useCallback(async (readingId: string, appFileId: string) => {
    if (disabled) return;
    await ReadingsAPI.updateVersion(groupId!, readingId, appFileId);
    await mutate();
  }, [groupId, disabled, mutate]);

  return {
    createReading,
    signUpForReading,
    withdrawFromReading,
    deleteReading,
    submitFileVersion,
    updateSubmittedVersion,
  };
}
