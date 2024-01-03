import {Router} from "express"
import app from "../app.js";
import userRouter from "./user-routes.js";
const appRouter = Router();

appRouter.use('/user', userRouter);


export default appRouter
