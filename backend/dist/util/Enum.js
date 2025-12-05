"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadingScheduleTypeFromString = exports.getReadingScheduleTypeString = exports.getDocumentTypeFromString = exports.getDocumentTypeString = exports.getFileTypeFromString = exports.getFileTypeString = void 0;
const domain_types_1 = require("../domain-types");
const getFileTypeString = (fileType) => {
    return fileType;
};
exports.getFileTypeString = getFileTypeString;
const getFileTypeFromString = (value) => {
    if (Object.values(domain_types_1.FileType).includes(value)) {
        return value;
    }
    return undefined;
};
exports.getFileTypeFromString = getFileTypeFromString;
const getDocumentTypeString = (documentType) => {
    return documentType;
};
exports.getDocumentTypeString = getDocumentTypeString;
const getDocumentTypeFromString = (value) => {
    if (Object.values(domain_types_1.DocumentType).includes(value)) {
        return value;
    }
    return undefined;
};
exports.getDocumentTypeFromString = getDocumentTypeFromString;
const getReadingScheduleTypeString = (readingSchedule) => {
    return readingSchedule;
};
exports.getReadingScheduleTypeString = getReadingScheduleTypeString;
const getReadingScheduleTypeFromString = (value) => {
    //if (Object.values(ReadingSchedule).includes(value as ReadingSchedule)) {
    return value;
    //}
    //return undefined;
};
exports.getReadingScheduleTypeFromString = getReadingScheduleTypeFromString;
