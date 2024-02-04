import * as mediasoup from 'mediasoup';
import config  from './soup_config.js';
//import {Worker , Router} from "mediasoup/node/lib/types";

// const worker : Array <{
//     worker:Worker
//     router:Router
// }>=[];
let worker;


let nextMediasoupWorkerIdx = 0;
const createWorker = async() =>{
    console.log("created");
    worker = await mediasoup.createWorker({
        logLevel: config.mediasoup.worker.logLevel,
        logTags: config.mediasoup.worker.logTags,
        rtcMinPort: config.mediasoup.worker.rtcMinPort,
        rtcMaxPort: config.mediasoup.worker.rtcMaxPort,    
    });
    worker.on('died',()=>{
        console.error(`mediasoup worker died , [${worker.pid}]`);
        setTimeout(()=>{
            process.exit(1);
        },2000);
    })
    // const mediaCodecs = config.mediasoup.router.mediaCodecs;
    // const mediasoupRouter = await worker.createRouter({mediaCodecs});
    return worker;
}

export { createWorker };