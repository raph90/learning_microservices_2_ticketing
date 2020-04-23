import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import "express-async-errors";
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", () => {
  // we are dealing with async errors via express async errors
  throw new NotFoundError();
});

app.use(errorHandler);
const port = 3000;
const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log("auth SERVICE listening on " + port);
  });
};

start();
