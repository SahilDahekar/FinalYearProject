import axios from "axios";

export const createYoutubeBroadcast = async (params) => {
    try {

        const { data, config } = params;

        const ytBroadcast = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus%2Cid&key=${process.env.GOOGLE_API_KEY}`,
            data,
            config
        );

        console.log(ytBroadcast.data);

        return {
            youtube_broadcast_id : ytBroadcast.data.id,
        }

    } catch (error) {
        return {
            message : "Error",
            error : error
        };
    }
}

export const createYoutubeStream = async (params) => {
    try {
        
        const { data, config } = params;

        const ytStream = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet%2Ccdn%2CcontentDetails%2Cstatus&key=${process.env.GOOGLE_API_KEY}`,
            data,
            config
        );

        const { ingestionAddress, streamName } = ytStream.data.cdn.ingestionInfo;
        return {
            id: ytStream.data.id,
            youtubeDestinationUrl: ingestionAddress + '/' + streamName,
        }

    } catch (error) {
        return {
            message : "Error",
            error : error
        };
    }
}

export const bindYoutubeBroadcast = async (params) => {
    try {
        
        const { config, youtubeAccessToken, youtubeBroadcastId, youtubeStreamId } = params;
        
        const bindedBroadcast = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${youtubeBroadcastId}&part=snippet&streamId=${youtubeStreamId}&access_token=${youtubeAccessToken}&key=${process.env.GOOGLE_API_KEY}`,
            config
        );
    
        return bindedBroadcast;

    } catch (error) {
        return {
            message : "Error",
            error : error
        };
    }
}

export const startYoutubeBroadcast = async (params) => {
    try {
        
        const { config, youtubeBroadcastId } = params;

        const response = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/transition?broadcastStatus=live&id=${youtubeBroadcastId}&part=id&part=status&key=${process.env.GOOGLE_API_KEY}`,
            config
        );

        return {
            data : response.data,
            message : "Going Live on YouTube Now!!"
        };
    
    } catch (error) {
        return {
            message : "error",
            error : error
        };
    }
}

export const stopYoutubeBroadcast = async (params) => {
    try {
        const { config, youtubeBroadcastId } = params;

        const response = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/transition?broadcastStatus=complete&id=${youtubeBroadcastId}&part=snippet%2Cstatus&key=${process.env.GOOGLE_API_KEY}`,
            config
        );

        return {
            data : response.data,
            message : "Ending Live on YouTube Now!!!"
        };

    } catch (error) {
        return {
            message : "error",
            error : error
        };
    }
}