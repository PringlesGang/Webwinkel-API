import { HTTPStatus } from "./http-status-codes";

export class Exception extends Error {
    constructor(public code: HTTPStatus, message: string) {
        super(message);
    }
}

export class NotFoundException extends Exception {
    constructor(message: string = "Not Found") {
        super(HTTPStatus.NOT_FOUND, message);
    }
}

export class BadRequestException extends Exception {
    constructor(message: string = "Bad Request") {
        super(HTTPStatus.BAD_REQUEST, message);
    }
}

export class InternalServerError extends Exception {
    constructor(message: string = "Internal Server Error") {
        super(HTTPStatus.INTERNAL_SERVER_ERROR, message);
    }
}