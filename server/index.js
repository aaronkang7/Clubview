import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import clubRoutes from "./routes/clubs.js";
import profileRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import User from "./models/userModel.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/clubs", clubRoutes);
app.use("/profile", profileRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.send("Hello ClubView API");
});
