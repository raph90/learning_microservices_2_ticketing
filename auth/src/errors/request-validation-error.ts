// type for validation error
import { ValidationError } from "express-validator";
import CustomError from "./custom-error";

/*
The RequestValidationError will have a property errors on it.
This will be made up of ValidationErrors passed by express-validator

*/
export class RequestValidationError extends CustomError {
  statusCode = 400;
  // this syntax is like saying this.errors = errors
  constructor(public errors: ValidationError[]) {
    super("error with validation");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
