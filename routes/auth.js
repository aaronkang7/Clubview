import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import "../passport.js";

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.use(passport.initialize());
router.use(passport.session());

router.use(
  cookieSession({
    name: "clubView-session",
    keys: ["key1", "key2"],
  })
);

router.get("/", (req, res) => res.send("You are now logged in"));
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/failed", (req, res) => {
  res.send("You have failed to login");
});

router.get("/success", isLoggedIn, (req, res) =>
  res.send(`Welcome ms ${req.user}`)
);

router.get("/");

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  req.redirect("/");
});

export default router;
