import { Router } from "express";
import { signUp } from "../controllers/auth/sign-up";
import { signIn } from "../controllers/auth/sign-in";

const router = Router();

// Auth routes (sign in, sign up)
router.post("/auth/sign-in", signIn)
router.post("/auth/sign-up", signUp)

export default router;