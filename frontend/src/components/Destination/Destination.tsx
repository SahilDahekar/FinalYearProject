import { useAuth } from '@/context/AuthContext';
import ToogleCard from './ToogleCard';
import api from '@/lib/api';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from '../ui/toast';
import { useEffect} from 'react';
import getUrlParams from '@/helpers/getUrlParams';
import { useNavigate } from 'react-router-dom';
import useDestinations from '@/hooks/useDestinations';

type Toggle = {
  title : string;
  img : string;
  isAdded : boolean;
  callback : () => void;
}

declare global {
  interface Window {
    google: any;
    FB: any;
  }
}

export default function Destination() {

  const { toast } = useToast();
  const auth = useAuth();
  const navigate = useNavigate();
  const { ytAdded, twitchAdded, fbAdded, removeDestinations, updateDestinations } = useDestinations();

  console.log(auth);

  //Uncomment to check your google client id
  //console.log("Your google client id : " + import.meta.env.VITE_GOOGLE_CLIENT_ID);

  useEffect(() => {
    if(window.location.href.includes('?code')){
      // console.log("Inside if condition useEffect");
      // console.log(window.location.href);
      const code = getUrlParams('code');
      // console.log("Found Twitch code", code);
      if(code){
        sendTwitchCode(code);
        // console.log("Code sent successfully");
      }
      navigate('/destination');
    }
  },[]);

  const cards : Toggle[] = [
    {
      title : "YouTube",
      img : "https://www.ohmystream.co/static/media/youtube.bdc1f583e488e2e672cff695a1c379d1.svg",
      isAdded : ytAdded,
      callback : handleYoutubeAuth
    },
    {
      title : "Twitch",
      img : "https://www.ohmystream.co/static/media/twitch.ad8ab2f2e67d7ee904a135ed5bcd2c1f.svg",
      isAdded : twitchAdded,
      callback : handleTwitchAuth
    },
    {
      title : "Facebook",
      img : "https://www.ohmystream.co/static/media/facebook.c3402e464658a657669832c282de64a7.svg",
      isAdded : fbAdded,
      callback : handleFacebookAuth
    }
  ];

  //Youtube Auth
  function handleYoutubeAuth(){
    /*global google*/ 
    console.log("Inside Youtube Auth function");

    if(ytAdded){
      toast({
        title : "Youtube is already added as destination!",
        description : "Do you want to remove youtube from destination",
        action : <ToastAction onClick={() => removeDestinations("Youtube")} altText="Remove">Remove</ToastAction>
      });
      return;
    }

    if(window.google){
      // This is client obj conataining config for youtube auth
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
        ux_mode: 'popup',
        callback: (response : any) => {
          console.log('Response : ', response);
          const payload = {
            code : response.code
          }

          // Send auth code to your backend platform using Axios
          api.post('/authorize/yt', payload)
          .then((axiosResponse) => {
            console.log(axiosResponse.data);
            toast({
              title: "Youtube added as destination",
            });
            //setYtAdded(true);
            updateDestinations();
          })
          .catch(function (error) {
            console.error('Error signing in:', error);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction onClick={handleYoutubeAuth} altText="Try again">Try again</ToastAction>,
            });
          });
        }
      });

      // This function is used to request an authorization code
      client.requestCode();
    }
    else {
      console.log('Google not found');
    }
  }


  //Twitch Redirect url
  function handleTwitchAuth(){

    console.log("Inside Twitch Auth function");

    if(twitchAdded){
      toast({
        title : "Twitch is already added as destination!",
        description : "Do you want to remove twitch from destination",
        action : <ToastAction onClick={() => removeDestinations("Twitch")} altText="Remove">Remove</ToastAction>
      });
      return;
    }

    const TWITCH_SCOPE = encodeURIComponent(
      'channel:manage:broadcast channel:read:stream_key'
    );
  
    console.log(TWITCH_SCOPE);

    const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID.trim();
    const redirectUri = 'http://localhost:5173/destination'.trim();
    const twitchScope = TWITCH_SCOPE.trim();

    console.log('clientId:', clientId);
    console.log('redirectUri:', redirectUri);
    console.log('twitchScope:', twitchScope);

    const twitchAuthURL = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${twitchScope}&force_verify=true`;

    console.log('twitchAuthURL:', twitchAuthURL);

    window.location.href = twitchAuthURL;
  }


  //Twitch Auth Code
  function sendTwitchCode(TWITCH_CODE? : string){
    setTimeout(() => {
      
    }, 2000);
    const payload = {
      code : TWITCH_CODE
    }

    api.post('authorize/twitch', payload)
    .then((response) => {
        console.log(response.data);
        toast({
          title: "Twitch added as destination",
        });
        updateDestinations();
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction onClick={handleTwitchAuth} altText="Try again">Try again</ToastAction>,
      });
    });
  }


  //Facebook Auth
  function handleFacebookAuth(){

    console.log("Inside Facebook Auth");

    if(fbAdded){
      toast({
        title : "Facebook is already added as destination!",
        description : "Do you want to remove facebook from destination",
        action : <ToastAction onClick={() => removeDestinations("Facebook")} altText="Remove">Remove</ToastAction>
      });
      return;
    }

    /*global FB*/ 
    if(window.FB){
      window.FB.getLoginStatus(function (response : any) {
        console.log(response);
      })
      window.FB.login(
        function (response : any) {
          console.log(response);
          console.log('FB access token: ', response.authResponse.accessToken);
          const facebookAccessToken = response.authResponse.accessToken;
          const facebookUserId = response.authResponse.userID;

          const payload = {
            fb_access_token: facebookAccessToken,
            fb_user_id: facebookUserId
          }

          console.log(payload);

          api.post('authorize/fb', payload)
          .then((response) => {
              console.log(response.data);
              toast({
                title: "Facebook added as destination",
              });
              updateDestinations();
          })
          .catch((error) => {
            console.error('Error signing in:', error);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction onClick={handleFacebookAuth} altText="Try again">Try again</ToastAction>,
            });
          });
        },
        { scope: 'email, publish_video, public_profile', auth_type: 'rerequest' }
      )
    }
    else {
      console.log("Facebook not found");
    }
  }

  return (
    <div className='p-6'>
        <h2 className='text-3xl font-semibold tracking-tight'>Add a Destination</h2>
        <div className='flex py-4 gap-3'>
            {cards.map((card) => {
              return (<ToogleCard key={card.title} isSet={card.isAdded} title={card.title} img={card.img} onClick={card.callback}/>);    
            })}
        </div>
    </div>
  )
}