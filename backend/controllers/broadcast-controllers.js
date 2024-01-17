import { User, Broadcast } from "../models/schema.js";

export const setBroadcastDetails = async(req, res, next) => {
    try {
        const { yt_title, yt_description, yt_policy, twitch_title, fb_title } = req.body;

        console.log("\nYt title : ", yt_title,"\nYt description : ", yt_description,"\nYt Policy : ", yt_policy,"\n\nTwitch title : ", twitch_title,"\n\nFb title : ", fb_title);

        console.log(res.locals.jwtData.id);

        const user = await User.findById(res.locals.jwtData.id).lean().then( user => {
            console.log(user._id.valueOf());
            return user;
        });
            
        if(!user){
            return res.status(404).send("User does not exist");
        }

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
        const broadcast = await updateBroadcastDetails(user._id.valueOf(), details);

        return res.status(200).json(broadcast);

    } catch (error) {
        return res.status(404).json({ message: "error", cause: error.message });
    }
}

export const updateBroadcastDetails = async (userId, detailsObj) => {
    const filter = { user_id: userId };
    const update = { $set: detailsObj };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const broadcast = await Broadcast.findOneAndUpdate(filter, update, options);

    console.log('Broadcast:\n', broadcast);
    return broadcast;
}