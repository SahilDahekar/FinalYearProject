import {Router} from "express"
import userRouter from "./user-routes.js";
import authRouter from "./auth-routes.js";
import destinationRouter from "./destination-routes.js";
const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/authorize', authRouter);
appRouter.use('/destinations', destinationRouter);


export default appRouter
