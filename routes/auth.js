import express from "express";
import passport from "../auth/googlePassport.js";

const router = express.Router();

router.get("/google", passport.authenticate('google', { scope: ['profile'] }));

export default router;
