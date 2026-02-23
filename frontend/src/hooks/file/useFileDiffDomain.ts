import { useCallback } from "react";
import { FilesAPI } from "../../api/filesApi";
import { useFilesDiff } from "./useFilesDiff";
import { DiffResponse } from "../../types/Diff";

export function useFileDiffDomain(appFileMetaId?: string) {
  const { mutate } = useFilesDiff(appFileMetaId);

  const compareVersions = useCallback(
    async (fromVersion: number, toVersion: number): Promise<DiffResponse> => {
      if (!appFileMetaId) {
        throw new Error("appFileMetaId is required");
      }

      const data: DiffResponse =
        await FilesAPI.compareVersions(
          appFileMetaId,
          fromVersion,
          toVersion
        );

      // Update SWR cache with new data
      await mutate(data, false);

      return data;
    },
    [appFileMetaId, mutate]
  );

  return {
    compareVersions,
  };
}