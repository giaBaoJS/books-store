import express from "express";
import { login, register, getUser } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/:id", getUser);

export default router;
