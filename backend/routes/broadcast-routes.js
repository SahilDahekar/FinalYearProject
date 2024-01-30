import { Router } from "express";
import { getBroadcasts, removeBroadcast, setBroadcastDetails, startBroadcast } from "../controllers/broadcast-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const broadcastRouter = Router();

broadcastRouter.get("/", verifyToken, getBroadcasts);
broadcastRouter.post("/", verifyToken, setBroadcastDetails);
broadcastRouter.post("/remove", verifyToken, removeBroadcast);
broadcastRouter.post("/start", verifyToken, startBroadcast);

export default broadcastRouter