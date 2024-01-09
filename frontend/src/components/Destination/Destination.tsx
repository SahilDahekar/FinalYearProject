import { useAuth } from '@/context/AuthContext';
import ToogleCard from './ToogleCard';
import api from '@/lib/api';

type Toggle = {
  title : string;
  img : string;
  callback : () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function Destination() {

  const auth = useAuth();

  console.log("Your google client id : " + import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const cards : Toggle[] = [
    {
      title : "YouTube",
      img : "https://www.ohmystream.co/static/media/youtube.bdc1f583e488e2e672cff695a1c379d1.svg",
      callback : handleYoutubeAuth
    },
    {
      title : "Twitch",
      img : "https://www.ohmystream.co/static/media/twitch.ad8ab2f2e67d7ee904a135ed5bcd2c1f.svg",
      callback : handleTwitchAuth
    },
    {
      title : "Facebook",
      img : "https://www.ohmystream.co/static/media/facebook.c3402e464658a657669832c282de64a7.svg",
      callback : handleFacebookAuth
    }
  ];

  function handleYoutubeAuth(){
    /*global google*/ 
    console.log("Inside Youtube Auth function");

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
          })
          .catch(function (error) {
            console.error('Error signing in:', error);
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
    console.log("Twitch Auth");
  }

  function handleFacebookAuth(){
    console.log("Facebook Auth");
  }

  return (
    <div className='p-6'>
        <h2 className='text-3xl font-semibold tracking-tight'>Add a Destination</h2>
        <div className='flex py-4 gap-3'>
            {cards.map((card) => {
              return (<ToogleCard key={card.title} title={card.title} img={card.img} onClick={card.callback}/>);    
            })}
        </div>
    </div>
  )
}
