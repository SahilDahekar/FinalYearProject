import { Router } from "express";
import { getFacebookTokens, getTwitchTokens, getYoutubeTokens } from "../controllers/auth-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { getUserFromToken } from "../utils/get-user.js";

const authRouter = Router();

authRouter.post("/yt", verifyToken, getUserFromToken, getYoutubeTokens);
authRouter.post("/twitch", verifyToken, getUserFromToken, getTwitchTokens);
authRouter.post("/fb", verifyToken, getUserFromToken, getFacebookTokens);

export default authRouter