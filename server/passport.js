import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";

const GoogleStrategy = Strategy;

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "321312020600-t1b4guo1u9dajoegr8ova94veijnm43l.apps.googleusercontent.com",
      clientSecret: "hZ6wVArVR6jOC7hctq3ZfPkz",
      callbackURL: "http://localhost:3000/clubs",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(err, user);
    }
  )
);
