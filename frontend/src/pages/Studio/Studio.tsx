import { useState, useEffect, useRef } from 'react';
import Video from '@/components/Video/Video';
import { Button } from '@/components/ui/button';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";
import { TbShare2 } from "react-icons/tb";
import io from 'socket.io-client';

const Studio = () => {
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement | null>(null);
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [videoText , setVideoText] = useState<boolean>(false);
  const [micText, setMicText] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(false);
  const VIDEO_BUTTON_TEXT : JSX.Element = videoText ? <FaVideoSlash size='23'/> : <FaVideo size='20'/>;
  const MIC_BUTTON_TEXT : JSX.Element = micText ? <FaMicrophoneSlash size='24'/> : <FaMicrophone size='20'/>;
  const GO_LIVE_TEXT : string = live ? "End Live" : "Go Live";
  const SCREEN_SHARE_BUTTON_TEXT : JSX.Element = <TbShare2 size='25'/>;
  const [socket, setSocket] = useState<any | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasStreamRef = useRef<MediaStream | null>(null);
  const height = 800/1.77;
  const width = 800;
  useEffect(() => {
    const newSocket = io('ws://localhost:5001', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); 
  
  useEffect(() => {
    const startUserMediaStream = async () => {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setUserStream(userMediaStream);
        const videoRefCurrent = userVideoRef.current;
        if (videoRefCurrent) {
          videoRefCurrent.srcObject = userMediaStream;
        }
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    startUserMediaStream();

    // Clean up the user media stream when the component unmounts
    return () => {
      if (userStream) {
        userStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  useEffect(() => {
    if (screenShareStream) {
      screenShareStream.getVideoTracks()[0].addEventListener("ended", () => {
        toggleScreenShare();
      });
    }
  }, [screenShareStream])

 
  useEffect(() => {
    const drawOnCanvas = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && userVideoRef.current && screenShareVideoRef.current) {
        ctx.clearRect(0, 0, width, height);

        if (!isScreenSharing) {
          ctx.drawImage(userVideoRef.current, 0, 0, (height*1.33), height);
        }else{
          ctx.drawImage(screenShareVideoRef.current, 0, 0, width, height);
          ctx.drawImage(userVideoRef.current, 0, 0, width / 4, (width/1.33) / 4);
        }
      }
      requestAnimationFrame(drawOnCanvas);
      // if (canvasRef.current) {
      //   const canvasStream = canvasRef.current.captureStream(30); // Capture canvas as a stream
      //   canvasStreamRef.current = canvasStream;
      // }
    };

    requestAnimationFrame(drawOnCanvas);
  }, [isScreenSharing, screenShareStream, userStream]);

  const toggleVideo = () => {
    if (userStream) {
      const videoTrack = userStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoText(prev => !prev);
    }
  };

  const toggleAudio = () => {
    if (userStream) {
      const audioTrack = userStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicText(prev => !prev);
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenShareStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setScreenShareStream(screenShareStream);
        const screenShareRef = screenShareVideoRef.current;
        if (screenShareRef) {
          screenShareRef.srcObject = screenShareStream;
        }
        setIsScreenSharing(true);
      } catch (error) {
        console.error('Error accessing screen share:', error);
      }
    } else {
      const tracks = screenShareStream?.getTracks();
      tracks?.forEach((track) => track.stop());
      setScreenShareStream(null);
      setIsScreenSharing(false);
    }
  };

  const handleLive =()=>{
    setLive(live => !live);
    // if(socket == undefined){
    //   socket = io('ws://localhost:5001', {
    //     transports: ['websocket'],  
    //   });
    // }
    console.log(socket);
    console.log(userStream);
    if(userStream){
      socket.emit('Message',userStream.id,(response:any)=>{
        console.log(response);
      });
    }
    recorderInit();
  };

  const recorderInit = () => {
    
    if (canvasRef.current) {
      //@ts-ignore
      const liveStream = (userVideoRef.current as any).captureStream(30);
      //const liveStream = (screenShareVideoRef.current as any).captureStream(30);
      //const liveStream = (canvasRef.current as any).captureStream(30); 
      const audioStream = userStream?.getAudioTracks()[0];
      const liveStreamTrack = liveStream.getVideoTracks()[0];

      const merge = new MediaStream([
        liveStreamTrack,
        audioStream,
      ])
      let mediaRecorder = new MediaRecorder(merge, {
        mimeType: 'video/webm;codecs=h264',
        videoBitsPerSecond: 3 * 1024 * 1024,
      });

      console.log(mediaRecorder, mediaRecorder.ondataavailable);
      mediaRecorder.ondataavailable = (e: any) => {
          console.log('sending chunks', e.data, socket);
          socket.send(e.data);
      };
      mediaRecorder.start(1000);
    } else {
      console.error('Canvas stream is not available');
    }
  };

  

  return (
    <div className='flex'>
      <div className='w-4/6 p-4 bg-secondary'>
        <div className='flex gap-3'>
          <Video className='w-[1000px] h-[1000px] hidden' videoRef={userVideoRef} />
          <Video className={`w-[1000px] h-[1000px] hidden`} videoRef={screenShareVideoRef} />
        </div>
        <div className='flex items-center justify-center mt-4'>
          <canvas ref={canvasRef} width= {width} height={height}/>
        </div>
        <div className='border border-lime-500 p-10'>
        </div>
        <div className='flex gap-2'>
          <Button onClick={toggleAudio} className={`w-16 h-16 p-3 rounded-full ${micText && ('bg-red-700 hover:bg-red-800')}`}>
            {MIC_BUTTON_TEXT}
          </Button>
          <Button onClick={toggleVideo} className={`w-16 h-16 p-3 rounded-full ${videoText && ('bg-red-700 hover:bg-red-800')}`}>
            {VIDEO_BUTTON_TEXT}
          </Button>
          <Button onClick={toggleScreenShare} className={`w-16 h-16 p-3 rounded-full ${isScreenSharing && ('bg-blue-500 hover:bg-blue-600')}`}>
            {SCREEN_SHARE_BUTTON_TEXT}
          </Button>
        </div>
      </div>
      <div className='w-2/6 border border-green-600 text-center'>
        <div className='border border-red-600'>
          <Button onClick={handleLive}>{GO_LIVE_TEXT}</Button>
        </div>
        <div className='border border-red-600'>
          <p>Live Chat goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Studio;
  
