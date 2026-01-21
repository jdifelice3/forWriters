import { useMemo } from "react";
import { Reading, User } from "../../types/domain-types";

export function useReadingsData(
  readings: Reading[] | undefined,
  user: User | null
) {
  const userId = user?.id ?? null;
  const safeReadings = Array.isArray(readings) ? readings : [];

  const myReadings = useMemo(() => {
    if (!userId) return [];
    return safeReadings.filter((r) =>
      r.readingParticipant?.some((rp) => rp.userId === userId)
    );
  }, [safeReadings, userId]);

  const myFiles = useMemo(() => {
    return myReadings.flatMap((r) =>
        r.readingSubmission
        ?.filter(rs => rs.appFile.userId === userId) // Filter by userId
        .map(rs => rs.appFile?.appFileMeta) // Then map to appFileMeta
        .filter(Boolean) ?? []
    );
  }, [myReadings, userId]);

  return { myReadings, myFiles };
}

export function useReadingData(
  reading: Reading | null | undefined,
  user: User | null
) {
  const userId = user?.id ?? null;

  const isParticipant = useMemo(() => {
    if (!reading || !userId) return false;
    return reading.readingParticipant?.some((rp) => rp.userId === userId) ?? false;
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
