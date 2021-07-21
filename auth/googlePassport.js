// import dotenv from "dotenv";
// dotenv.config();
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/userModel.js";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/secrets",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       // User.findOne({ email: profile.email }).then((result) => {
//       //   if (result) {
//       //     res.send(result);
//       //   } else {
//       //     //CHECK PROFILE ATTRIBUTE
//       //     const firstName = profile.givenName;
//       //     const lastName = profile.familyName;
//       //     const email = profile.email;
//       //     const profileImg = profile.imageUrl;
//       //     const newUser = new User({
//       //       firstName: firstName,
//       //       lastName: lastName,
//       //       imageUrl: "",
//       //       email: email,
//       //       favorites: [],
//       //     });
//       //     newUser.save().then((ress) => res.send(ress));
//       //   }
//       // });
//     }
//   )
// );

// export default passport;
