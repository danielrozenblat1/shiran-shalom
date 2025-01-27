import React from 'react';
import styles from './StudioVideos.module.css';

const VideoGallery = ({ videos }) => {
  return (
    <div className={styles.container}>
      {videos.map((video, index) => (
        <div key={index} className={styles.videoWrapper}>
          <video 
            className={styles.video} 
            src={video.src} 
            alt={video.alt} 
            autoPlay 
            loop 
            muted 
            playsInline 
            controls
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;