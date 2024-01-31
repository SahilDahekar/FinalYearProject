import { Broadcast } from "../models/schema.js";

export const setBroadcastDetails = async(req, res, next) => {
    try {
        const { yt_title, yt_description, yt_policy, twitch_title, fb_title } = req.body;

        console.log("\nYt title : ", yt_title,"\nYt description : ", yt_description,"\nYt Policy : ", yt_policy,"\n\nTwitch title : ", twitch_title,"\n\nFb title : ", fb_title);

        const user = res.locals.user;

        console.log(user._id.valueOf());
        console.log(user);

        const details = {
            yt_title: yt_title ? yt_title : null,
            yt_description: yt_description ? yt_description : null,
            yt_privacy_policy: yt_policy ? yt_policy : null,
            fb_title: fb_title ? fb_title : null,
            twitch_title: twitch_title ? twitch_title : null,
        }

        console.log(details);
        console.log(user._id);
        const broadcast = await addBroadcastDetails(user._id.valueOf(), details);

        return res.status(200).json(broadcast);

    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }
}

export const getBroadcasts = async (req, res , next) => {
    try {

        const user = res.locals.user;

        console.log(user._id.valueOf());
        console.log(user);

        const broadcasts = await Broadcast.find({user_id : user._id.valueOf()});

        console.log(broadcasts);

        const result = broadcasts.map((item) => {
            return {
                id : item._id.valueOf(),
                yt_title : item.yt_title,
                yt_description : item.yt_description,
                yt_policy : item.yt_privacy_policy,
                twitch_title : item.twitch_title,
                fb_title : item.fb_title
            }
        })

        return res.status(200).json(result);

    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }
}

export const removeBroadcast = async (req, res , next) => {
    try {
        const { broadcast_id } = req.body;

        const user = res.locals.user;

        console.log(user._id.valueOf());
        console.log(user);

        deleteBroadcast(user._id.valueOf(), broadcast_id);

        res.status(200).json({
            message: "success"
        });

    } catch (error) {
        return res.status(404).json({ message: "error", cause:error.message });
    }
}

export const startBroadcast = async (req, res, next) => {
    try {
        // Write Logic to start broadcast based on broadcast id and selected platforms
        const { broadcast_id } = req.body;

        const user = res.locals.user;

        console.log(user._id.valueOf());
        console.log(user);

        const broadcast = await Broadcast.findOne(user._id.valueOf(), broadcast_id);

        const result = await Promise.all([
            broadcastToYoutube(),
            broadcastToTwitch(),
            broadcastToFacebook(),
        ]);

        res.status(200).json({
            message: "You are live now!!",
            broadcast: broadcast,
            result: result

        })
    } catch (error) {
        res.status(404).json({ message: "error", cause: error.message});
    }
}

const broadcastToYoutube = async () => {
    // Write logic related to broadcasting to Youtube
}

const broadcastToTwitch = async () => {
    // Write logic related to broadcasting to Twitch
}

const broadcastToFacebook = async () => {
    // Write logic related to broadcasting to Facebook
}

export const updateBroadcastDetails = async (userId, detailsObj) => {
    const filter = { user_id: userId };
    const update = { $set: detailsObj };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const broadcast = await Broadcast.findOneAndUpdate(filter, update, options);

    console.log('Broadcast:\n', broadcast);
    return broadcast;
}

export const addBroadcastDetails = async (userId, detailsObj) => {

    detailsObj.user_id = userId;

    const broadcast = await Broadcast.create(detailsObj);

    console.log('Broadcast:\n', broadcast);
    return broadcast;
}

export const deleteBroadcast = async (userId, broadcastId) => {

    const broadcast = await Broadcast.deleteOne({ user_id : userId, _id : broadcastId });
    return broadcast;
}

export const findBroadcast = async (userId, broadcastId) => {
    const broadcast = await Broadcast.findOne({ user_id : userId, _id : broadcastId });
    return broadcast;
}
