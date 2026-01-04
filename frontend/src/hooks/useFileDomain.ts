import { useCallback } from "react";
import { FileDomainCommands } from "../types/FileTypes";
import { FilesAPI } from "../api/filesApi";
import { useFiles } from "./useFile";

const filesUrl = `${import.meta.env.VITE_API_HOST}/api/filesApi`;

export function useFileDomain(): FileDomainCommands {
  const { mutate } = useFiles(filesUrl);

  /**
   * UPDATE METADATA (optimistic)
   */
  const saveMetadata = useCallback<FileDomainCommands["saveMetadata"]>(
  async ({ fileMetaId, title, description }) => {
    await mutate?.(
      (current) =>
        current?.map((f) =>
          f.id === fileMetaId
            ? {
                ...f,
                title,
                // 👇 THIS LINE GOES HERE
                description: description ?? f.description,
              }
            : f
        ),
      false
    );

    await FilesAPI.updateMetaData(fileMetaId, {
      title,
      description,
    });
    
    await mutate?.(); // revalidate
  },
  [mutate]
);


  /**
   * DELETE FILE (optimistic)
   */
  const deleteFile = useCallback<FileDomainCommands["deleteFile"]>(
    async (fileMetaId) => {
      await mutate?.(
        (current) => current?.filter((f) => f.id !== fileMetaId),
        false
      );

      await FilesAPI.deleteFile(fileMetaId);

      await mutate?.();
    },
    [mutate]
  );

  /**
   * UPLOAD VERSION (no optimistic shortcut)
   */
  const uploadVersion = useCallback<FileDomainCommands["uploadVersion"]>(
    async (fileMetaId, file, versionComment) => {
      await FilesAPI.uploadVersion(fileMetaId, file, versionComment);
      await mutate?.();
    },
    [mutate]
  );

  /**
   * SET ACTIVE VERSION (optimistic)
   */
  const setActiveVersion = useCallback<FileDomainCommands["setActiveVersion"]>(
    async (fileMetaId, version) => {
      await mutate?.(
        (current) =>
          current?.map((f) =>
            f.id === fileMetaId
              ? { ...f, currentVersionId: version }
              : f
          ),
        false
      );

      await FilesAPI.updateVersion(fileMetaId, version);

      await mutate?.();
    },
    [mutate]
  );

  return {
    saveMetadata,
    deleteFile,
    uploadVersion,
    setActiveVersion,
  };
}
