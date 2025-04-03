import express from "express";
import { signup, login, refresh } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/refresh", refresh);

export default router;
