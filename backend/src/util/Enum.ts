import { FileType } from "../domain-types";

export const getFileTypeString = (fileType: FileType): string => {
  return fileType;
}

export const getFileTypeFromString = (value: string): FileType | undefined => {
  if (Object.values(FileType).includes(value as FileType)) {
    return value as FileType;
  }
  return undefined;
}