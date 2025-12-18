import { Type } from "@aws-sdk/client-s3";
import { 
    FileType, DocumentType, ReadingScheduleType
} from "@prisma/client";
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

export const mapMimeToEnum = (mime: string | undefined): FileType => {
  if (mime === "application/pdf") return "PDF";
  if (
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mime === "application/msword"
  )
    return "DOCX";
  throw new Error(`Unsupported file type: ${mime}`);
}