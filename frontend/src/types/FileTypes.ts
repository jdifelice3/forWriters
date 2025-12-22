import { Variant } from "./Style";
import { AppFile, AppFileMeta } from "./domain-types";

export type FileUploadFormInput = {
  title: string;
  description: string;
}

export type FileFormInput = {
    id: string;
    title: string;
    description: string;
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
  showPreviewButton: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  buttonDownloadText: string; 
  showVersionHistory: boolean;
}

export interface FileCommands {
  edit(file: AppFileMeta): void;
  save(file: AppFileMeta): void;
  delete(file: AppFileMeta): void;
  onVersionChange(event:React.ChangeEvent<HTMLInputElement>, fileAppMeta: AppFileMeta, version: string): Promise<void>;
  onVersionUpload(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, appFileMeta: AppFileMeta): Promise<void>;
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