import axios from "axios";

export const startFacebookBroadcast = async (params) => {
    try {
        
        const { data } = params;
        
        const response = await axios.post(
            `https://graph.facebook.com/${data.facebookUserId}/live_videos?status=LIVE_NOW&title=${data.facebookTitle}&description=${data.facebookDescription}&access_token=${data.longFacebookAccessToken}`
        );
        
        return response.data;

    } catch (error) {
        return {
            message : "error",
            error : error
        }
    }
}

export const endFacebookBroadcast = async (params) => {
    try {
        
        const { data } = params;

        const response = await axios.post(
            `https://graph.facebook.com/v3.3/${data.liveVideoId}?end_live_video=true&access_token=${data.longFacebookAccessToken}`
        );

        return response.data;

    } catch (error) {
        return {
            message : "error",
            error : error
        }
    }
}