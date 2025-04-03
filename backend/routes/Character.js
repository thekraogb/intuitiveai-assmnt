import express from "express";
import { characters } from "../controllers/Character.js";

const router = express.Router();

router.get("/", characters);


export default router;