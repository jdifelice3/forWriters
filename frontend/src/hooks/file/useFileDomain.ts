import { useCallback } from "react";
import { FileDomainCommands } from "../../types/FileTypes";
import { FilesAPI } from "../../api/filesApi";
import { useFiles } from "./useFiles";
import { AppFile, FileFeedback, Reading } from "../../types/domain-types";
import { CommentDTO, ParagraphFeedback } from "../../types/FeedbackTypes";
import { DocumentEnum } from "../../util/Enum";
import { ObjectIdsForDeletion } from "../../types/FileTypes";

export function useFileDomain(): FileDomainCommands {
    const { mutate } = useFiles();
    
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

/**
 * FEEDBACK
 */

    const getComments = useCallback<FileDomainCommands["getComments"]>(
        async (fileFeedbackId: string) => {
            let comments: CommentDTO[] = await FilesAPI.getComments(fileFeedbackId);
            await mutate?.();
            return comments;
        },
        [mutate]
    )

    const getFileFeedback = useCallback<FileDomainCommands["getFileFeedback"]>(
        async (reading: Reading | undefined) => {
            if(!reading) return {};
            const fileFeedbackRecords: Record<string, string> = {};
            //create FileFeed records if they do not exist
            for(let i = 0; i < reading.readingSubmission.length; i++){
                let f:FileFeedback = await FilesAPI.getFileFeedback(reading.readingSubmission[i].appFile.id);
                fileFeedbackRecords[reading.readingSubmission[i].id] = f.id;
            }
            await mutate?.();
            return fileFeedbackRecords;
        },
        [mutate]
    );

    const getFileFeedbackUnique = useCallback<FileDomainCommands["getFileFeedbackUnique"]>(
        async (appFileId: string | undefined) => {
            if(!appFileId) return [];
            const commentDTO: CommentDTO[] = await FilesAPI.getFileComments(appFileId);
            
            await mutate?.();
            return commentDTO;
        },
        [mutate]
    );


    const getDeletionIds = useCallback<FileDomainCommands["getDeletionIds"]>(
        async (appFileMetaId: string) => {
            let deletionIds: ObjectIdsForDeletion = await FilesAPI.getDeletionIds(appFileMetaId);
            await mutate?.();
            return deletionIds;
        },
        [mutate]
    )

    return {
        saveMetadata,
        deleteFile,
        uploadManuscript,
        uploadVersion,
        setActiveVersion,
        getFileFeedback,
        getFileFeedbackUnique,
        getComments,
        getDeletionIds,
    };
}
