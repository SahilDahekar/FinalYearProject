import React from 'react';

const Video = ({styles, videoRef}) => {
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