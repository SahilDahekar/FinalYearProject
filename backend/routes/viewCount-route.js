import { Router } from "express";
import {viewYoutubeCount} from "../controllers/youtube-controllers.js"; 
import {viewTwitchCount}  from "../controllers/twitch-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { getUserFromToken } from "../utils/get-user.js";

const countRouter = Router();

countRouter.get("/ytcount",verifyToken,getUserFromToken,viewYoutubeCount)

countRouter.get("/twitchcount",verifyToken,getUserFromToken,viewTwitchCount)

export default countRouter