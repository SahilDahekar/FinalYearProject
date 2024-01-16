import { Router } from "express";
import { getDestinations, removeDestinations } from "../controllers/destination-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const destinationRouter = Router();

destinationRouter.get("/", verifyToken, getDestinations);
destinationRouter.post("/remove", verifyToken, removeDestinations);

export default destinationRouter