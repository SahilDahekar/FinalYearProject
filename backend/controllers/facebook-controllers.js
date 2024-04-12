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

export const FacebookViewCount = async()=>{

    //can fetch facebook access token from db 
    //can create api for live video id using access token 
    const facebookLiveVideoId = req.body.facebookLiveVideoId
    const facebookAccessToken = req.body.facebookAccessToken
  
    let viewCount = await axios
      .get(
        `https://graph.facebook.com/v13.0/${facebookLiveVideoId}?fields=live_views&access_token=${facebookAccessToken}`
      )
      .then((res) => {
        console.log(res.data.live_views)
        return res.data.live_views
      })
      .catch((err) => {
        console.log(err)
      })
  
    return res.status(201).send({ views: viewCount })
}
