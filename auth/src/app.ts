import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@raph37-tickets/common";

import mongoose from "mongoose";
import cookieSession from "cookie-session";
import "express-async-errors";

export const app = express();
app.use(json());
app.set("trust proxy", true); // tell express to be ok with proxied traffic
app.use(
  cookieSession({
    // no need to encrypt because the JWT will be encrypted
    signed: false,
    // we must be on https unless in test
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", () => {
  // we are dealing with async errors via express async errors
  throw new NotFoundError();
});

app.use(errorHandler);
