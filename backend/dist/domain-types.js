"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingDeleteInvalidGroupIdError = exports.ReadingDeleteError = exports.GroupError = exports.JoinRequestError = exports.ReadingScheduleType = exports.JoinRequestStatus = exports.WorkType = exports.UrlType = exports.UrlOwnerType = exports.Role = exports.FileType = exports.GroupType = exports.Genre = exports.EventType = exports.ParticipantType = exports.DocumentType = void 0;
var client_1 = require("@prisma/client");
Object.defineProperty(exports, "DocumentType", { enumerable: true, get: function () { return client_1.DocumentType; } });
Object.defineProperty(exports, "ParticipantType", { enumerable: true, get: function () { return client_1.ParticipantType; } });
Object.defineProperty(exports, "EventType", { enumerable: true, get: function () { return client_1.EventType; } });
Object.defineProperty(exports, "Genre", { enumerable: true, get: function () { return client_1.Genre; } });
Object.defineProperty(exports, "GroupType", { enumerable: true, get: function () { return client_1.GroupType; } });
Object.defineProperty(exports, "FileType", { enumerable: true, get: function () { return client_1.FileType; } });
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return client_1.Role; } });
Object.defineProperty(exports, "UrlOwnerType", { enumerable: true, get: function () { return client_1.UrlOwnerType; } });
Object.defineProperty(exports, "UrlType", { enumerable: true, get: function () { return client_1.UrlType; } });
Object.defineProperty(exports, "WorkType", { enumerable: true, get: function () { return client_1.WorkType; } });
Object.defineProperty(exports, "JoinRequestStatus", { enumerable: true, get: function () { return client_1.JoinRequestStatus; } });
Object.defineProperty(exports, "ReadingScheduleType", { enumerable: true, get: function () { return client_1.ReadingScheduleType; } });
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
