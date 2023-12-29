import React from 'react';

type VideoProps = {
  styles: string,
  videoRef: React.Ref<HTMLVideoElement>
}

const Video = ({styles, videoRef} : VideoProps) => {
  return (
    <video
      className={styles}
      ref={videoRef}
      autoPlay
      playsInline
    />
  )
}

export default Video