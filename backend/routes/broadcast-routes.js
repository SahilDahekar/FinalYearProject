import { Router } from "express";
import { getBroadcastById, getBroadcasts, removeBroadcast, setBroadcastDetails, startBroadcast ,broadcastToYoutube} from "../controllers/broadcast-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { getUserFromToken } from "../utils/get-user.js";
import { startTwitchBroadcast } from "../controllers/twitch-controllers.js";
import {getYouTubeLiveChatMessages} from "../controllers/youtube-controllers.js"

const broadcastRouter = Router();

broadcastRouter.get("/", verifyToken, getUserFromToken, getBroadcasts);
broadcastRouter.get("/:broadcastId", verifyToken, getUserFromToken, getBroadcastById);
broadcastRouter.post("/", verifyToken, getUserFromToken, setBroadcastDetails);
broadcastRouter.post("/remove", verifyToken, getUserFromToken, removeBroadcast);
//parth changes
broadcastRouter.post("/start", verifyToken, getUserFromToken, startBroadcast);
broadcastRouter.post("/startytbroadcast", verifyToken, getUserFromToken, broadcastToYoutube);

broadcastRouter.post("/starttwtichbroadcast",verifyToken,getUserFromToken,startTwitchBroadcast);
broadcastRouter.get("/ytchat",verifyToken,getUserFromToken,getYouTubeLiveChatMessages)




export default broadcastRouter