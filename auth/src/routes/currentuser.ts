import { requireAuth } from "@raph37-tickets/common";
import { currentUser } from "@raph37-tickets/common";
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

// the React app will need to know if the user is signed in
/*

We will use this route to see if there is a cookie with jwt on it.
if not, or jwt is invalid, current user is not signed in
otherwise send back info stored in jwt

*/

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
