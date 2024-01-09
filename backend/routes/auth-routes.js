import { Router } from "express";
import { getYoutubeTokens } from "../controllers/auth-controllers.js";

const authRouter = Router();

authRouter.post("/yt", getYoutubeTokens);

export default authRouter