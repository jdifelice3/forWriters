"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingDeleteInvalidGroupIdError = exports.ReadingDeleteError = exports.GroupError = exports.JoinRequestError = void 0;
class JoinRequestError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor); // Optional: Clean stack trace
        this.statusCode = statusCode;
    }
}
exports.JoinRequestError = JoinRequestError;
class GroupError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor); // Optional: Clean stack trace
        this.statusCode = statusCode;
    }
}
exports.GroupError = GroupError;
class ReadingDeleteError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
    }
}
exports.ReadingDeleteError = ReadingDeleteError;
class ReadingDeleteInvalidGroupIdError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
    }
}
exports.ReadingDeleteInvalidGroupIdError = ReadingDeleteInvalidGroupIdError;
