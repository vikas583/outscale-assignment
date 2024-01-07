import { HttpError } from "routing-controllers";

export class APIError extends HttpError {
  public msg: string;
  public isPublic: boolean;

  constructor(msg: string, httpCode: number = 500, isPublic: boolean = true) {
    super(httpCode);
    Object.setPrototypeOf(this, APIError.prototype);
    this.msg = msg;
    this.isPublic = isPublic;
    this.toJSON();
  }

  toJSON() {
    return {
      status: this.httpCode,
      msg: this.isPublic ? this.msg : "Something went wrong",
    };
  }
}
