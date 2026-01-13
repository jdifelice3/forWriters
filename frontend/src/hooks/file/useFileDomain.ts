import { useCallback } from "react";
import { FileDomainCommands } from "../../types/FileTypes";
import { FilesAPI } from "../../api/filesApi";
import { useFiles } from "./useFiles";
import { AppFile } from "../../types/domain-types";
import { DocumentEnum } from "../../util/Enum";

const filesUrl = `${import.meta.env.VITE_API_HOST}/api/filesApi`;

export function useFileDomain(): FileDomainCommands {
    const { mutate } = useFiles();

    /**
     * UPDATE METADATA (optimistic)
     */
    const saveMetadata = useCallback<FileDomainCommands["saveMetadata"]>(async ({ fileMetaId, title, description }) => {
        await mutate?.(
            (current) =>
                current?.map((f) =>
                f.id === fileMetaId
                    ? {
                        ...f,
                        title,
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
 * UPLOAD AppFileMeta (no optimistic shortcut)
 */
    const uploadManuscript = useCallback<FileDomainCommands["uploadManuscript"]>(
        async (formData) => {
            formData.append("documentType", DocumentEnum.MANUSCRIPT);
            await FilesAPI.uploadManuscript(formData);
            await mutate?.();
        },
        [mutate]
    );
    
/**
 * UPLOAD VERSION (no optimistic shortcut)
 */
    const uploadVersion = useCallback<FileDomainCommands["uploadVersion"]>(
        async (fileMetaId, formData) => {
            formData.append("documentType", DocumentEnum.VERSION);
            await FilesAPI.uploadVersion(fileMetaId, formData);
            await mutate?.();
        },
        [mutate]
    );

/**
 * UPLOAD VERSION (no optimistic shortcut)
 */
    const uploadFeedback = useCallback<FileDomainCommands["uploadFeedback"]>(
        async (formData) => {
            formData.append("documentType", DocumentEnum.FEEDBACK);
            const results: any = await FilesAPI.uploadFeedback(formData);
            const appFile: AppFile = results.appFile;
            await mutate?.();
            return results.appFile;
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
        uploadManuscript,
        uploadVersion,
        uploadFeedback,
        setActiveVersion,
    };
}
