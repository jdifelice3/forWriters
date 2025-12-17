import { useMemo } from "react";
import { AppFile, Group } from "../types/domain-types";

export function useReadingsData(group?: Group, userId?: string) {
  const myReadings = useMemo(() => {
    if (!group || !userId) return [];
    return group.reading.filter(r =>
      r.readingAuthor.some(ra => ra.authorId === userId)
    );
  }, [group, userId]);

  const myFiles = useMemo(() => {
    return myReadings.flatMap(r =>
      r.readingAuthor
        .map(ra => ra.authorAppFile?.appFile)
        .filter(Boolean) as AppFile[]
    );
  }, [myReadings]);

  return { myReadings, myFiles };
}
