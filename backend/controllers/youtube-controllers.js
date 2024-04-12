import axios from "axios";
import { Destination } from "../models/schema.js";

export const createYoutubeBroadcast = async ( userId,youtubeBroadcastTitle, youtubeBroadcastDescription, youtubePrivacyPolicy) => {
    try {
      
        const destination = await Destination.findOne({ user_id: userId });
        if (!destination || !destination.youtube_access_token) {
            throw new Error("YouTube access token not found");
        }

        const data = {
            snippet: {
                title: youtubeBroadcastTitle,
                scheduledStartTime: `${new Date().toISOString()}`,
                description: youtubeBroadcastDescription,
            },
            contentDetails: {
                recordFromStart: true,
                enableAutoStart: true,
                enableAutoStop: true,
                monitorStream: { enableMonitorStream: false },
            },
            status: {
                privacyStatus: youtubePrivacyPolicy.value.toLowerCase(),
                selfDeclaredMadeForKids: true,
            },
        };

        const config = {
            headers: {
                Authorization: `Bearer ${destination.youtube_access_token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus%2Cid&key=${process.env.GOOGLE_API_KEY}`,
            data,
            config
        );
        console.log("api is working ")
        console.log('YouTube broadcast id ' + response.data.id);
        return response.data.id;
        
    } catch (error) {
        throw new Error("Failed to create YouTube broadcast: " + error.message);
    }
}

export const createYoutubeStream = async ( userId,youtubeStreamTitle, youtubeStreamDescription) => {
    try {
        
        const destination = await Destination.findOne({ user_id: userId });
        if (!destination || !destination.youtube_access_token) {
            throw new Error("YouTube access token not found");
        }

        const data = {
            snippet: {
                title: youtubeStreamTitle,
                description: youtubeStreamDescription,
            },
            cdn: {
                format: '',
                ingestionType: 'rtmp',
                frameRate: 'variable',
                resolution: 'variable',
            },
            contentDetails: { isReusable: true },
        };

        const config = {
            headers: {
                Authorization: `Bearer ${destination.youtube_access_token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet%2Ccdn%2CcontentDetails%2Cstatus&key=${process.env.GOOGLE_API_KEY}`,
            data,
            config
        );
        console.log("api is working ")
        const { ingestionAddress, streamName } = response.data.cdn.ingestionInfo;
        return {
            id: response.data.id,
            youtubeDestinationUrl: `${ingestionAddress}/${streamName}`,
        };
    } catch (error) {
        throw new Error("Failed to create YouTube stream: " + error.message);
    }
}

export const bindYoutubeBroadcast = async ( userId,youtubeBroadcastId, youtubeStreamId) => {
    try {
        const user = res.locals.user;
        const destination = await Destination.findOne({ user_id: userId });
        if (!destination || !destination.youtube_access_token) {
            throw new Error("YouTube access token not found");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${destination.youtube_access_token}`,
                Accept: 'application/json',
            },
        };

        const response = await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${youtubeBroadcastId}&part=snippet&streamId=${youtubeStreamId}&access_token=${destination.youtube_access_token}&key=${process.env.GOOGLE_API_KEY}`,
            {},
            config
        );
        console.log("api is working ")
        return response.data;
    } catch (error) {
        throw new Error("Failed to bind YouTube broadcast to stream: " + error.message);
    }
}

export const startYoutubeBroadcast = async (req,res) => {
    try {

          //can fetch the access token and broadcast id from db 
        
        const { youtubeBroadcastId, youtubeAccessToken } = req.body

        const config = {
            headers: {
              Authorization: `Bearer ${youtubeAccessToken}`,
              Accept: 'application/json',
            },
          }

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
export const stopYoutubeBroadcast = async (req,res) => {
    try {

          //can fetch the access token and broadcast id from db 

        const { youtubeBroadcastId, youtubeAccessToken } = req.body


        const config = {
            headers: {
              Authorization: `Bearer ${youtubeAccessToken}`,
              Accept: 'application/json',
            },
          }

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

export const viewYoutubeCount = async (req, res) => {
    const user = res.locals.user
    const destination = Destination.find({user_id:user._id})
    const accessToken = destination.youtubeAccessToken;
    const broadcastId = getYoutubeBroadcastId(accessToken)
  
    let viewCount = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2C%20status&id=${broadcastId}&key=${process.env.GOOGLE_API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res.data.items[0].statistics.viewCount)
        return res.data.items[0].statistics.viewCount
      })
      .catch((err) => {
        console.log(err)
      })
  
    return res.status(201).send({ views: viewCount })
  }


  export const getYouTubeLiveChatMessages = async (req, res) => {
    try {
       const user = res.locals.user;
       const destination = Destination.find({user_id:user._id})
       const accessToken = destination.youtubeAccessToken
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token is required' });
        }

        const liveBroadcastResponse = await axios.get(
            'https://www.googleapis.com/youtube/v3/liveBroadcasts',
            {
                params: {
                    part: 'snippet',
                    broadcastStatus: 'active',
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

   
        const liveChatId = liveBroadcastResponse.data.items[0]?.snippet.liveChatId;

        if (!liveChatId) {
            return res.status(404).json({ message: 'No active live broadcast found' });
        }

        const liveChatResponse = await axios.get(
            'https://www.googleapis.com/youtube/v3/liveChat/messages',
            {
                params: {
                    part: 'snippet',
                    liveChatId,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

      
        const liveChatMessages = liveChatResponse.data.items.map(item => ({
            messageId: item.id,
            authorDisplayName: item.snippet.authorDisplayName,
            message: item.snippet.displayMessage,
            publishedAt: item.snippet.publishedAt,
        }));

        
        res.status(200).json(liveChatMessages);
    } catch (error) {
        console.error('Error fetching live chat messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getYoutubeBroadcastId = async(youtubeAccessToken)=>{
    
    try {
       
        const response = await axios.get('https://www.googleapis.com/youtube/v3/liveBroadcasts', {
            params: {
                part: 'snippet',
                broadcastStatus: 'active',
            },
            headers: {
                Authorization: `Bearer ${youtubeAccessToken}`,
            },
        });
        const liveBroadcastId = response.data.items[0]?.id;
        return liveBroadcastId;
    } catch (error) {
        console.error('Error fetching active live broadcast ID:', error);
        throw new Error('Failed to fetch active live broadcast ID');
    }

}