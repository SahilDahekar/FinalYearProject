import { Router } from "express";
import { getFacebookTokens, getTwitchTokens, getYoutubeTokens } from "../controllers/auth-controllers.js";

const authRouter = Router();

authRouter.post("/yt", getYoutubeTokens);
authRouter.post("/twitch", getTwitchTokens);
authRouter.post("/fb", getFacebookTokens);

export default authRouter