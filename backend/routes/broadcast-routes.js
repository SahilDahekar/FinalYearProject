import { Router } from "express";
import { getBroadcasts, removeBroadcast, setBroadcastDetails } from "../controllers/broadcast-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const broadcastRouter = Router();

broadcastRouter.get("/", verifyToken, getBroadcasts);
broadcastRouter.post("/", verifyToken, setBroadcastDetails);
broadcastRouter.post("/remove", verifyToken, removeBroadcast);

export default broadcastRouter