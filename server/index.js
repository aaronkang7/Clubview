import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import clubRoutes from "./routes/clubs.js";
import profileRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import User from "./models/userModel.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//Session setup

app.use(
  session({
    secret: "Our little secret...",
    resave: false,
    saveUninitialized: false, //CHANGE LATER
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/clubs", clubRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

//MongoDB Section
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//Passort Section
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello ClubView API");
});
