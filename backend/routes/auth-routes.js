import { Router } from "express";
import { getFacebookTokens, getTwitchTokens, getYoutubeTokens } from "../controllers/auth-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const authRouter = Router();

authRouter.post("/yt", verifyToken, getYoutubeTokens);
authRouter.post("/twitch", verifyToken, getTwitchTokens);
authRouter.post("/fb", verifyToken, getFacebookTokens);

export default authRouter