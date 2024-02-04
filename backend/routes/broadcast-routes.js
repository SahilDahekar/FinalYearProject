import { Router } from "express";
import { getBroadcasts, removeBroadcast, setBroadcastDetails, startBroadcast } from "../controllers/broadcast-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { getUserFromToken } from "../utils/get-user.js";

const broadcastRouter = Router();

broadcastRouter.get("/", verifyToken, getUserFromToken, getBroadcasts);
broadcastRouter.post("/", verifyToken, getUserFromToken, setBroadcastDetails);
broadcastRouter.post("/remove", verifyToken, getUserFromToken, removeBroadcast);
broadcastRouter.post("/start", verifyToken, getUserFromToken, startBroadcast);

export default broadcastRouter