import { Router } from "express";
import { getAllUsers, userLogin, usersignUp } from "../controllers/user-controllers.js";
import {loginValidator, signupValidator, validate} from '../utils/validators.js'

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validate(signupValidator), usersignUp);
userRouter.post('/login', validate(loginValidator), userLogin);

export default userRouter
