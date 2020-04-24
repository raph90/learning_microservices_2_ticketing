import { NextFunction } from "express";
import { Request, Response } from "express";

import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// augmenting an interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // figure out if the user is logged in.
  // if so, set it on the session

  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
