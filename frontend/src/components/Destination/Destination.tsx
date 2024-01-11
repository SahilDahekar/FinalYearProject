import { useAuth } from '@/context/AuthContext';
import ToogleCard from './ToogleCard';
import api from '@/lib/api';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from '../ui/toast';
import { useState } from 'react';

type Toggle = {
  title : string;
  img : string;
  isAdded : boolean;
  callback : () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function Destination() {
  const [ytAdded, setYtAdded] = useState<boolean>(false);
  const [twitchAdded, setTwitchAdded] = useState<boolean>(false);
  const [fbAdded, setFbAdded] = useState<boolean>(false);

  const { toast } = useToast();
  const auth = useAuth();

  console.log("Your google client id : " + import.meta.env.VITE_GOOGLE_CLIENT_ID);

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

  function handleYoutubeAuth(){
    /*global google*/ 
    console.log("Inside Youtube Auth function");
    if(ytAdded){
      toast({
        title : "Youtube is already added as destination!",
        description : "Do you want to remove youtube from destination",
        action : <ToastAction onClick={() => setYtAdded(false)} altText="Remove">Remove</ToastAction>
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
            code : response.code,
            user_name : auth?.user?.name,
            user_email : auth?.user?.email
          }

          // Send auth code to your backend platform using Axios
          api.post('/authorize/yt', payload)
          .then(function (axiosResponse) {
            console.log(axiosResponse.data);
            toast({
              title: "Youtube added as destination",
            });
            setYtAdded(true);
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

  function handleTwitchAuth(){
    if(twitchAdded){
      toast({
        title : "Twitch is already added as destination!",
        description : "Do you want to remove twitch from destination",
        action : <ToastAction onClick={() => setTwitchAdded(false)} altText="Remove">Remove</ToastAction>
      });
      return;
    }
    setTwitchAdded(true);
    console.log("Twitch Auth");
    toast({
      title: "Twitch added as destination",
    });
  }

  function handleFacebookAuth(){
    if(fbAdded){
      toast({
        title : "Facebook is already added as destination!",
        description : "Do you want to remove facebook from destination",
        action : <ToastAction onClick={() => setFbAdded(false)} altText="Remove">Remove</ToastAction>
      });
      return;
    }
    setFbAdded(true);
    console.log("Facebook Auth");
    toast({
      title: "Facebook added as destination",
    });
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
