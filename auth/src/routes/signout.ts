import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // signing out means sending a header to delete the cookie
  req.session = null;
  res.send({});
});

export { router as signOutRouter };
