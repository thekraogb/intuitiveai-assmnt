import express from "express";
import { generateStory } from "../controllers/Story.js"; 

const router = express.Router();

router.post("/", generateStory);

export default router;
