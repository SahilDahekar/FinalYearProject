import {Router} from "express"
import userRouter from "./user-routes.js";
import authRouter from "./auth-routes.js";
const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/authorize', authRouter);


export default appRouter
