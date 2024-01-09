import mongoose from "mongoose";
import { User, Destination } from "../models/schema.js";
import axios from 'axios';

export const getYoutubeTokens = async (req, res, next) => {
    try {
        const { code , user_name , user_email } = req.body;

        const user = await User.find({ name : user_name, email : user_email});

        if(!user){
            return res.status(404).send("User does not exist");
        }

        console.log(user);
        console.log(user._id);

        if(!code){
            return res.status(404).send("Code not found");
        }

        console.log(code);

        const dataUrl = `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&grant_type=authorization_code`;
        console.log(dataUrl);

        const tokens = await axios.post(
            'https://oauth2.googleapis.com/token',
            dataUrl
        )
        // .then(function (response){
        //     console.log(response.data);
        //     tokens = response.data;
        // })
        // .catch(function (error) {
        //     console.error('Error signing in:', error);
        // });

        if(!tokens){
            return res.status(404).send("Token not received");
        }

        console.log(tokens.data);
        console.log("Access Token : " + tokens.data.access_token + "Refresh Token : " + tokens.data.refresh_token);

        const des = {
            user_id: user._id,
            youtube_access_token: tokens.data.access_token,
            youtube_refresh_token: tokens.data.refresh_token,
        };
        
        // Using findOneAndUpdate with upsert option
        const filter = { user_id: user._id };
        const update = { $set: des };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        
        const destination = await Destination.findOneAndUpdate(filter, update, options);
        
        console.log('Destination:', destination);
          

        res.status(200).json(tokens.data);
    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }
};