import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type BroadcastitemProps = {
    id : number,
    yt_title : string,
    yt_description? : string,
    yt_policy? : string,
    twitch_title : string,
    fb_title : string,
}

function BroadcastItem({ 
    id,
    yt_title,
    yt_description,
    yt_policy,
    twitch_title,
    fb_title
 } : BroadcastitemProps) {
  return (
    <div className='border-2 border-border rounded-md p-4 flex justify-between gap-2 max-w-xl'>
        <div className="flex flex-col gap-2">
          <h3 className='text-xl font-semibold tracking-tight'>Brodcast No. {id}</h3>
          <div className="flex gap-2">
            { yt_title && <Badge className='bg-red-600'>Youtube</Badge>}
            { twitch_title && <Badge className='bg-purple-600'>Twitch</Badge>}
            { fb_title && <Badge className='bg-blue-600'>Facebook</Badge>}
          </div>
        </div>
        <div>
          <Button asChild>
            <Link to={`/studio/${id}`}>Go Live</Link>
          </Button>
        </div>
    </div>
  )
}

export default BroadcastItem;