import axios from "axios";
import { Destination } from "../models/schema.js";

export const startTwitchBroadcast = async (req,res) => {
       const user = res.locals.user;
       const destination = Destination.find({user_id:user._id})
      const  twitchAccessToken = destination.twitchAccessToken;
      const twitchUserID = twitchUserID();
      const title = req.body.title;
    try {
        
        const response = await axios.patch(
            `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserID}`,
            {title},
            {
                headers: {
                  Authorization: `Bearer ${twitchAccessToken}`,
                  'Client-Id': process.env.TWITCH_CLIENT_ID,
                  'Content-Type': 'application/json',
                },
              }
        )

        return response.data;

    } catch (error) {
        return {
            message : "error",
            error : error
        }
    }
}

export const stopTwitchBroadcast = async (params) => {
    const user= res.locals.user;
    const destination = Destination.find({user_id:user._id})
    const twitchUserId = twitchUserID();
    try {
         
        // Set the title to an empty string to stop the broadcast
        const response = await axios.patch(
            `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserId}`,
            '', // pass Empty string to stop the broadcast
            {
                headers: {
                  Authorization: `Bearer ${destination.twitchAccessToken}`,
                  'Client-Id': process.env.TWITCH_CLIENT_ID,
                  'Content-Type': 'application/json',
                },
              }
        );

        return response.data;
    } catch (error) {
        return {
            message: "error",
            error: error
        };
    }
}

export const viewTwitchCount = async(req,res)=>{
    const twitchUsername = getTwitchUserName();
    const user = res.locals.user;
    const destination = Destination.find({user_id:user._id})
  
    let viewCount = await axios
      .get(`https://api.twitch.tv/helix/streams?user_login=${twitchUsername}`, {
        headers: {
          Authorization: `Bearer ${destination.twitchAccessToken}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data.data[0].viewer_count)
        return res.data.data[0].viewer_count
      })
      .catch((err) => {
        console.log(err)
      })
  
    return res.status(201).send({ number: viewCount })
  
}

export const getTwitchUserName = async (req, res) => {
    const user = res.locals.user;
    const destination = await Destination.findOne({ user_id: user._id });
    try {
        const response = await axios.get("https://api.twitch.tv/helix/users", {
            headers: {
                "Client-ID": "YOUR_TWITCH_CLIENT_ID",
                Authorization: `Bearer ${destination.twitch_access_token}`,
            },
        });

        const username = response.data.data[0].login;

         return username;
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch username" });
    }
};