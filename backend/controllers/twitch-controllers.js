import axios from "axios";

export const startTwitchBroadcast = async (params) => {

    // Send your stream to one of these ingest servers https://dev.twitch.tv/docs/video-broadcast/reference/#get-ingest-servers

    // GET https://ingest.twitch.tv/ingests

    try {
        const { data, config } = params;
        const response = await axios.patch(
            `https://api.twitch.tv/helix/channels?broadcaster_id=${data.twitchUserId}`,
            data.title,
            config
        );

        return response.data;

    } catch (error) {
        return {
            message : "error",
            error : error
        }
    }
}

export const stopTwitchBroadcast = async () => {
    try {

    } catch (error) {
        return {
            message : "error",
            error : error
        }
    }
}