import { RequestValidationError } from "./../errors/request-validation-error";
import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // this error will be picked up by middleware
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    console.log("creating a user");
    throw new DatabaseConnectionError();
    res.status(201).send("done creating a user");
  }
);

export { router as signUpRouter };
