import { Server } from 'socket.io';
import { ChildProcess, spawn } from 'child_process';
import { inputSettings , twitchSettings , youtubeSettings} from "./ffmpeg.js";
import { createWorker } from './worker.js';
import cors  from "cors";

let mediasoupRouter;
const WebSocket=(()=>{

    const io = new Server(5001, {
        cors: {
          origin: '*',
        },
      });  
    
    io.on('connection', async (socket) => {
        console.log('Client connected');
        console.log(`socket connected to ${socket.id}`);
        try{
          mediasoupRouter = await createWorker()
        }catch(err){
          throw err;
        }
        console.log(`id: ${JSON.stringify(mediasoupRouter.rtpCapabilities)}`);
    });
    
});

  export default WebSocket;