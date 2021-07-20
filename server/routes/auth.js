import express from "express";
import passport from "../auth/googlePassport.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/callback",
  }),
  function (req, res) {
    console.log("Logged in");
  }
);

router.get("/callback", function (req, res) {
  res.send("hello");
});

export default router;
