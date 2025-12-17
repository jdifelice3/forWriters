import { Variant } from "./Style";
import { AppFile } from "./domain-types";
// export interface AppFile {
//   id: string;
//   userId: string;
//   title: string;
//   description?: string;
//   filename: string;
//   mimetype: string;
//   url: string;
//   uploadedAt: string;
//   user: User
// }

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
}

export interface FileCommands {
  edit(file: AppFile): void;
  save(file: AppFile): void;
  delete(file: AppFile): void;
}

export interface FileListFormCommands {
  edit(fileId: string): void;
  delete(fileId: string): void;
}