//import {WorkerLogTag,TransportListenInfo,RtpCodecCapability} from "mediasoup/node/lib/types";

const config = {
    listenIp: '0.0.0.0',
    listenPort: 3016,
    mediasoup:{
        numWorkers: 2,
        worker:{
            rtcMinPort: 10000,
            rtcMaxPort: 10100,
            logLevel: 'debug',
            logTags:[
                'info',
                'ice',
                'dtls',
                'rtp',
                'srtp',
                'rtcp',
                'bwe',
            ],
        },
        router: {
            mediaCodecs:[
              {
                kind        : "audio",
                mimeType    : "audio/opus",
                clockRate   : 48000,
                channels    : 2
              },
              {
                kind       : "video",
                mimeType   : "video/VP9",
                clockRate  : 90000,
                parameters :
                {
                  "profile-id" : 1,
                },
              },
            ],
        },
        webRTCTransport: {
            listenIps:[
              {
                ip: "0.0.0.0",
                announcedIp:"127.0.0.1",
              },   
            ],
        }  
    },
} ;

export default config;