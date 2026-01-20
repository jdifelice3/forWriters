import { Variant } from "./Style";
import { 
    AppFile, 
    AppFileMeta,
    FileFeedback, 
    Reading 
} from "./domain-types";

import { CommentDTO } from "./FeedbackTypes";

export type FileUploadFormInput = {
  title: string;
  description: string;
}

export type FileFormInput = {
    id: string;
    title: string;
    description: string;
}

export type ObjectIdsForDeletion = {
    appFileIds: string[],
    fileFeedbackIds: string[],
    fileFeedbackCommentIds: string[],
    fileFeedbackCommentTargetIds: string[],
    readingSubmissionIds: string[]
}

export interface UploadFileFormProperties {
  title: string;
  subtitle: string;
  buttonChooseFileText: string;
  buttonUploadText: string;
  titleVariant: Variant;
  showUploadIcon: boolean;
}

export interface FileListProperties {
  fileType?: string;
  noFilesMessage: string;
  showPreviewButton: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  buttonDownloadText: string; 
  showVersionHistory: boolean;
}

export interface FileDomainCommands {
    /** Update title / description */
    saveMetadata(input: {
        fileMetaId: string;
        title: string;
        description?: string;
    }): Promise<void>;

    /** Soft-delete file aggregate */
    deleteFile(fileMetaId: string): Promise<void>;

    uploadManuscript(
        formData: FormData
    ): Promise<void>;

    /** Upload a new version */
    uploadVersion(
        fileMetaId: string,
        formData: FormData,
    ): Promise<void>;

    /** Set the active version */
    setActiveVersion(
        fileMetaId: string,
        version: number
    ): Promise<void>;

    loadExtractedComments?(
        readingId: string,
        submissionId: string
    ): Promise<void>;

    getFileFeedback(
        reading: Reading | null
    ): Promise<Record<string, string>>;

    getComments(
        fileFeedbackId: string
    ): Promise<CommentDTO[]>;

    getDeletionIds(
        appFileMetaId: string
    ): Promise<ObjectIdsForDeletion>;
}

export interface FileUIActions {
  beginEdit(file: AppFileMeta): void;
  cancelEdit(): void;
}

export interface FileViewHelpers {
  canEdit(file: AppFileMeta): boolean;
  canDelete(file: AppFileMeta): boolean;
}

export interface ReadingCommands {
  edit(file: AppFileMeta): void;
  save(file: AppFileMeta): void;
  delete(file: AppFileMeta): void;
}

export interface FileListFormCommands {
  edit(fileId: string): void;
  delete(fileId: string): void;
}
