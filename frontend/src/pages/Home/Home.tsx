import React, { useState, useEffect, useRef } from 'react';
import Video from '../../components/Video/Video.tsx';
import { Button } from '@/components/ui/button';

const Home = () => {
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement | null>(null);
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [videoText , setVideoText] = useState<boolean>(false);
  const [micText, setMicText] = useState<boolean>(false);

  const VIDEO_BUTTON_TEXT : string = videoText ? 'Start Video' : 'Stop Video';
  const MIC_BUTTON_TEXT : string = micText ? 'Unmute Mic' : 'Mute Mic';
  const SCREEN_SHARE_BUTTON_TEXT : string = isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share';

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

  return (
    <div className='p-4 bg-slate-300'>
      <h1 className='text-5xl font-bold '>StreamSync User Video Stream</h1>
      <div className='flex gap-3'>
        <Video styles='w-[450px] h-[350px]' videoRef={userVideoRef} />
        <Video styles={`w-[450px] h-[350px] ${!isScreenSharing ? "hidden" : ""}`} videoRef={screenShareVideoRef} />
      </div>
      <div className='flex gap-2'>
        <Button onClick={toggleVideo}>
          {VIDEO_BUTTON_TEXT}
        </Button>
        <Button onClick={toggleAudio}>
          {MIC_BUTTON_TEXT}
        </Button>
        <Button onClick={toggleScreenShare}>
          {SCREEN_SHARE_BUTTON_TEXT}
        </Button>
      </div>
    </div>
  );
};

export default Home;
  
