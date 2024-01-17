import { useCallback, useState } from 'react';
import { Button } from '../ui/button'
import { GrNewWindow } from "react-icons/gr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useAuth } from '@/context/AuthContext';
import useDestinations from '@/hooks/useDestinations';
import BroadcastForm from '../BroadcastForm/BroadcastForm';

function Broadcast() {
  const [value, setValue] = useState<string[]>([]);
  const [curr, setCurr] = useState<string>("");
  const auth = useAuth();
  const { ytAdded, twitchAdded, fbAdded } = useDestinations();
  console.log(auth);
  console.log(value);

  const check = useCallback(() => {
    if(!value.includes(curr) && value.length !== 0){
      setCurr(value[0]);
    }
    else if (!value.includes(curr) && value.length === 0) {
      setCurr("");
    } 
  }, [value]);

  return (
    <div className='p-6'>
        <h2 className='text-3xl font-semibold tracking-tight'>Create a Broadcast</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'secondary'} className='my-4'>
                <GrNewWindow className='mr-2'/> New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-xl'>Broadcast to :</DialogTitle>
            </DialogHeader>
            <ToggleGroup className='justify-start gap-2' type="multiple" value={value} onValueChange={(value) => setValue(value)}>
              <ToggleGroupItem className='h-14' variant='outline' size='lg' onClick={() => setCurr("Youtube")} value="Youtube" disabled={!ytAdded}>
                <img className='w-8 h-8' src="https://www.ohmystream.co/static/media/youtube.bdc1f583e488e2e672cff695a1c379d1.svg" alt="Youtube logo" />
              </ToggleGroupItem>
              <ToggleGroupItem className='h-14' variant='outline' size='lg' onClick={() => setCurr("Twitch")} value="Twitch" disabled={!twitchAdded}>
                <img className='w-8 h-8' src="https://www.ohmystream.co/static/media/twitch.ad8ab2f2e67d7ee904a135ed5bcd2c1f.svg" alt="Twitch logo" />
              </ToggleGroupItem>
              <ToggleGroupItem className='h-14' variant='outline' size='lg' onClick={() => setCurr("Facebook")} value="Facebook" disabled={!fbAdded}>
                <img className='w-8 h-8' src="https://www.ohmystream.co/static/media/facebook.c3402e464658a657669832c282de64a7.svg" alt="Facebook logo" />
              </ToggleGroupItem>
            </ToggleGroup>
            <div>
              <BroadcastForm platforms={value} currentPlatform={curr} check={check}/>
            </div>
          </DialogContent>
        </Dialog>

    </div>
  )
}

export default Broadcast