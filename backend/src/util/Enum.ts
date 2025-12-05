import { FileType, DocumentType, ReadingScheduleType } from "../domain-types";

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

export const getDocumentTypeFromString = (value: string): DocumentType | undefined => {
  if (Object.values(DocumentType).includes(value as DocumentType)) {
    return value as DocumentType;
  }
  return undefined;
}

export const getReadingScheduleTypeString = (readingSchedule: ReadingScheduleType): string => {
  return readingSchedule;
}

export const getReadingScheduleTypeFromString = (value: string): ReadingScheduleType => {
  //if (Object.values(ReadingSchedule).includes(value as ReadingSchedule)) {
    return value as ReadingScheduleType;
  //}
  //return undefined;
}
