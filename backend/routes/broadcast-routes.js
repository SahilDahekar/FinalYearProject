import { Router } from "express";
import { setBroadcastDetails } from "../controllers/broadcast-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const broadcastRouter = Router();

broadcastRouter.post("/", verifyToken, setBroadcastDetails);

export default broadcastRouter