import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import clubRoutes from "./routes/clubs.js";
import profileRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/clubs", clubRoutes);
app.use("/profile", profileRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello ClubView API");
});

const PORT = process.env.PORT || 5000;

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
