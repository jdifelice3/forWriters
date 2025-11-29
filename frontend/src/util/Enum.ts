import { FileType, DocumentType } from "../../../backend/src/domain-types";

export const getFileTypeString = (fileType: FileType): string => {
  return fileType;
}

export const getFileTypeFromString = (value: string): FileType | undefined => {
  if (Object.values(FileType).includes(value as FileType)) {
    return value as FileType;
  }
  return undefined;
}

export const getDocumentTypeString = (documentType: DocumentType): string => {
  return documentType;
}

export const getDocumentTypeFromString = (value: string): DocumentType => {
  if (Object.values(DocumentType).includes(value as DocumentType)) {
    return value as DocumentType;
  }
  return DocumentType.MANUSCRIPT;
}