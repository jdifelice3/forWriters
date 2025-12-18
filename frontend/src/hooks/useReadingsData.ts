import { useMemo } from "react";
import { AppFile, Group, User } from "../types/domain-types";

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
        .map(ra => ra.authorAppFile?.appFile)
        .filter(Boolean)
    );
  }, [myReadings, group]);

  return { myReadings, myFiles };
}
