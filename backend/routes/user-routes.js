import { Router } from "express";
import { getAllUsers, userLogin, usersignUp, verifyUser,userLogout } from "../controllers/user-controllers.js";
import {loginValidator, signupValidator, validate} from '../utils/validators.js'
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validate(signupValidator), usersignUp);
userRouter.post('/login', validate(loginValidator), userLogin);
userRouter.get('/auth-status',verifyToken,verifyUser)
userRouter.get("/logout", verifyToken,userLogout);

export default userRouter
