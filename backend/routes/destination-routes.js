import { Router } from "express";
import { getDestinations, removeDestinations } from "../controllers/destination-controllers.js";

const destinationRouter = Router();

destinationRouter.post("/", getDestinations);
destinationRouter.post("/remove", removeDestinations);

export default destinationRouter