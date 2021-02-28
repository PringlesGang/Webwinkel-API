import { Exception } from "./exception";
import { HTTPStatus } from "./http-status-codes";
import { NextFunction, Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const errorCode: HTTPStatus = err instanceof Exception ? err.code : HTTPStatus.INTERNAL_SERVER_ERROR;

    const error = {
        code: errorCode,
        message: err.message
    };

    if (error.code == HTTPStatus.INTERNAL_SERVER_ERROR) {
        console.log(error.message);
        error.message = "Something went wrong!";        
    }

    res.status(error.code).json({
        success: false,
        error
    });
}

export default errorHandler;