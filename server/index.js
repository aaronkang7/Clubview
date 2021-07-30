import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import clubRoutes from "./routes/clubs.js";
import profileRoutes from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("Hello ClubView API");
});
