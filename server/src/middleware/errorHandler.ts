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
    logger.error(`Error: `, error);
    logger.error("Body: ", JSON.stringify(request.body));
    if (error instanceof APIError) {
      response.status(error.httpCode).json(error.toJSON());
    } else if (error instanceof HttpError) {
      response.status(error.httpCode).json({
        status: error.httpCode,
        msg: "Something went wrong",
      });
    } else {
      response.status(500).json({
        status: 500,
        msg: "Something went wrong",
      });
    }
    // next(error);
  }
}
