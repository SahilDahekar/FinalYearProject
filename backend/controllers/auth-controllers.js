import { User, Destination } from "../models/schema.js";
import axios from 'axios';

export const getYoutubeTokens = async (req, res, next) => {
    try {
        const { code , user_name , user_email } = req.body;

        const user = await User.findOne({ name : user_name, email : user_email}).lean().then( user => {
            console.log(user._id.valueOf());
            return user;
        });

        if(!user){
            return res.status(404).send("User does not exist");
        }


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
            youtube_access_token: tokens.data.access_token,
            youtube_refresh_token: tokens.data.refresh_token,
        };
        
        // Using findOneAndUpdate with upsert option
        updateTokensInDestination(user._id.valuesOf(), des);

        res.status(200).json(tokens.data);
    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }
};

export const getTwitchTokens = async (req, res, next) => {
    try {
        const { code , user_name , user_email } = req.body;

        const user = await User.findOne({ name : user_name, email : user_email}).lean().then( user => {
            console.log(user._id.valueOf());
            return user;
        });

        if(!user){
            return res.status(404).send("User does not exist");
        }

        console.log(user);

        if(!code){
            return res.status(404).send("Code not found");
        }

        console.log(code);

        const dataUrl = `client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.TWITCH_REDIRECT_URL}`;
        
        console.log(dataUrl);

        const tokens = await axios.post("https://id.twitch.tv/oauth2/token?",dataUrl)
        // .then((res) => {
        //     console.log(res.data);
        //     return res.data;
        // })
        // .catch((err) => {
        //     console.log(err);
        // })

        if(!tokens){
            return res.status(404).send("Token not received");
        }

        console.log(tokens.data);
        console.log("Access Token : " + tokens.data.access_token + "Refresh Token : " + tokens.data.refresh_token);

        const des = {
            twitch_access_token: tokens.data.access_token,
            twitch_refresh_token: tokens.data.refresh_token
        };
        
        // Using findOneAndUpdate with upsert option
        updateTokensInDestination(user._id.valueOf(), des);

        res.status(200).json(tokens.data);

    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }   
}

export const getFacebookTokens = async (req, res, next) => {
    try {
        const { code , user_name , user_email } = req.body;

        console.log(code , user_name , user_email);

        const user = await User.findOne({ name : user_name, email : user_email}).lean().then( user => {
            console.log(user._id.valueOf());
            return user;
        });

        if(!user){
            return res.status(404).send("User does not exist");
        }

        console.log(user);

        if(!code){
            return res.status(404).send("Code not found");
        }

        console.log(code);

    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }   
}

export const updateTokensInDestination = async (userId, tokensObj) => {
    const filter = { user_id: userId };
    const update = { $set: tokensObj };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    
    const destination = await Destination.findOneAndUpdate(filter, update, options);
    
    console.log('Destination:', destination);
}