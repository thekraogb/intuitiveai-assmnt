import express from "express";
import { createCharacter, getCharacter, getAllCharacters, updateCharacter, deleteCharacter } from "../controllers/CustomCharacter.js";
import { verifyToken } from "../middleware/Auth.js";
const router = express.Router();

router.post("/", verifyToken, createCharacter); 
router.get("/", verifyToken, getAllCharacters); 
router.get("/:id", verifyToken, getCharacter); 
router.put("/:id", verifyToken, updateCharacter);
router.delete("/:id", verifyToken, deleteCharacter); 

export default router;
