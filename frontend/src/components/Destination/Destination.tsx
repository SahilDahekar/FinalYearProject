import axios from 'axios';
import ToogleCard from './ToogleCard';
import api from '@/lib/api';

type Toggle = {
  title : string;
  img : string;
  callback : () => void;
}

export default function Destination() {

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
    if(window.google){
      const client = google.accounts.oauth2.initCodeClient({
        client_id: 'YOUR_CLIENT_ID',
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        ux_mode: 'popup',
        callback: (response : any) => {
          const code_receiver_uri = 'http://localhost:8000/api/authorize/yt';

          // Send auth code to your backend platform using Axios
          axios.post(code_receiver_uri, 'code=' + response.code, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then(function (axiosResponse) {
            console.log('Signed in as: ' + axiosResponse.data);
          })
          .catch(function (error) {
            console.error('Error signing in:', error);
          });
        }
      });

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
