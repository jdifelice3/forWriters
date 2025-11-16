import { User } from '../types/UserTypes';

export interface AppFile {
  id: string;
  userId: string;
  title: string;
  description?: string;
  filename: string;
  mimetype: string;
  url: string;
  uploadedAt: string;
  users: User
}

export interface UploadFileFormProperties {
  title: string;
  subtitle: string;
  buttonChooseFileText: string;
  buttonUploadText: string;
}