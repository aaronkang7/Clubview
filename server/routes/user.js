import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
  // User.find()
  // .then(users => res.json(users))
});

router.post("/user", (req, res) => {
  User.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      res.send(result);
    } else {
      const firstName = req.body.givenName;
      const lastName = req.body.familyName;
      const email = req.body.email;
      const profile = req.body.imageUrl;
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        imageUrl: profile,
        email: email,
        favorites: [],
      });
      newUser.save().then((res) => res.send(res));
    }
  });
});

export default router;
