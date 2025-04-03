import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/Auth.js";
import characterRoute from "./routes/Character.js";
import customCharacterRoutes from "./routes/CustomCharacter.js";
import storyRoutes from "./routes/Story.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoute);
app.use("/api/custom-character", customCharacterRoutes);
app.use("/api/story", storyRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// app.get("/", (req, res) => res.send(""));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
