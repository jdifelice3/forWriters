export class JoinRequestError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name; 
        Error.captureStackTrace(this, this.constructor); // Optional: Clean stack trace
        this.statusCode = statusCode;
    }
}

export class GroupError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name; 
        Error.captureStackTrace(this, this.constructor); // Optional: Clean stack trace
        this.statusCode = statusCode;
    }
}

export class ReadingDeleteError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
    }
}

export class ReadingDeleteInvalidGroupIdError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
    }
}