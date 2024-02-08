import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* ******************************************************************************************
   Destination Schema Defined Here (YouTube,FaceBook,Twitch)
******************************************************************************************/

const destinationSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , required:true},
    youtube_access_token: { type: String },
    youtube_refresh_token: { type: String },
    twitch_user_id: { type: String },
    twitch_access_token: { type: String },
    twitch_refresh_token: { type: String },
    facebook_user_id: { type: String },
    facebook_access_token: { type: String },
    facebook_long_access_token: { type: String }
});

/* ******************************************************************************************
Broadcast Schema Defined Here (YouTube,FaceBook,Twitch)
******************************************************************************************/

const broadcastSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , required:true},
    yt_title: { type: String },
    yt_description: { type: String },
    yt_privacy_policy: { type: String },
    yt_broadcast_id: { type: String },
    yt_destination_url: { type: String },
    fb_title: { type: String },
    fb_description: { type: String },
    fb_live_video_id: { type: String },
    fb_destination_url: { type: String },
    twitch_title: { type: String },
    twitch_stream_key: { type: String },
    studio_id: { type: String },
},{
    timestamp: true,
});

/* ******************************************************************************************
User Schema Defined Here 
******************************************************************************************/

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    destinationSchema:[destinationSchema],
    broadcastSchema:[broadcastSchema],
},{
    timestamp: true,
});

const User = mongoose.model('User', userSchema);
const Destination = mongoose.model('Destination', destinationSchema);
const Broadcast = mongoose.model('Broadcast', broadcastSchema);

export {User,Destination,Broadcast};
