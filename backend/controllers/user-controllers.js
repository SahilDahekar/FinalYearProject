import User from "../models/user.js"
import { hash, compare } from 'bcrypt'
import {createToken} from '../utils/token-manager.js'
import { COOKIE_NAME } from "../utils/constants.js"

export  const getAllUsers = async (req, res, next) => {
    try {
        // Get all users
        const users = await User.find();
        return res.status(200).json({ message: "ok", users });
    } catch (error) {
        return res.status(200).json({ message: "error", cause: error.message });
    }
};

export const usersignUp = async (req, res, next) => {
    try {
        // User signup
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).send("user already registered");
        }

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create token and store cookies
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/"
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "ok", id: user._id.toString() });
    } catch (error) {
        return res.status(200).json({ message: "error", cause: error.message });
    }
};

export const userLogin = async (req, res, next) => {
    try {
        // User login
        const { email, password } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).send("user not registered");
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).send("incorrect password");
        }

        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/"
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({ message: "ok", id: user._id.toString() });
    } catch (error) {
        return res.status(200).json({ message: "error", cause: error.message });
    }
};


