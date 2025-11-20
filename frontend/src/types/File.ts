import { User } from './User';
import { Variant } from './Style';

export interface AppFile {
  id: string;
  userId: string;
  title: string;
  description?: string;
  filename: string;
  mimetype: string;
  url: string;
  uploadedAt: string;
  user: User
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
  showPreviewButton: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  buttonDownloadText: string; 
}