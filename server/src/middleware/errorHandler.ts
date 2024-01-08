import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { APIError } from "../utils/APIError";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response
    // next: (err: any) => any
  ) {
    logger.error(
      `${error.status || 500} - ${error.message} - ${request.originalUrl} - ${
        request.method
      } - ${request.ip}`
    );
    if (error instanceof APIError) {
      response.status(error.httpCode).json(error.toJSON());
    } else if (error instanceof HttpError) {
      response.status(error.httpCode).json({
        status: error.httpCode,
        msg: "Something went wrong",
      });
    } else if (error.name === "TokenExpiredError") {
      response.status(401).json({
        msg: "Unauthorized",
      });
    } else {
      response.status(500).json({
        status: 500,
        msg: error.message,
      });
    }
    // next(error);
  }
}
