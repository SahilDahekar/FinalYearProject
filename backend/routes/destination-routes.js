import { Router } from "express";
import { getDestinations, removeDestinations } from "../controllers/destination-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { getUserFromToken } from "../utils/get-user.js";

const destinationRouter = Router();

destinationRouter.get("/", verifyToken, getUserFromToken, getDestinations);
destinationRouter.post("/remove", verifyToken, getUserFromToken, removeDestinations);

export default destinationRouter