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
    removeBroadcast : (id : number) => void,
}

function BroadcastItem({ 
    id,
    yt_title,
    yt_description,
    yt_policy,
    twitch_title,
    fb_title,
    removeBroadcast
 } : BroadcastitemProps) {

  return (
    <div className='border-2 border-border rounded-md p-4 flex justify-between gap-2 max-w-2xl'>
        <div className="flex flex-col gap-2">
          <h3 className='text-xl font-semibold tracking-tight'>Brodcast No. {id}</h3>
          <div className="flex gap-2">
            { yt_title && <Badge className='bg-red-600 hover:bg-red-700'>Youtube</Badge>}
            { twitch_title && <Badge className='bg-purple-600 hover:bg-purple-700'>Twitch</Badge>}
            { fb_title && <Badge className='bg-blue-600 hover:bg-blue-700'>Facebook</Badge>}
          </div>
        </div>
        <div className="self-center flex gap-2">
          <Button asChild>
            <Link to={`/studio/${id}`}>Go Live</Link>
          </Button>
          <Button variant="outline" onClick={() => removeBroadcast(id)}>
            Remove
          </Button>
        </div>
    </div>
  )
}

export default BroadcastItem;