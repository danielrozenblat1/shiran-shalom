import React, { useEffect, useRef, useState } from 'react';
import styles from './StudioVideos.module.css';

const LazyVideo = ({ src, poster, label }) => {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Only download the video once its wrapper is near the viewport.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Autoplay only after the source has actually been attached.
  useEffect(() => {
    if (!inView || !videoRef.current) return;
    const play = videoRef.current.play();
    if (play && typeof play.catch === 'function') {
      play.catch(() => {});
    }
  }, [inView]);

  return (
    <div className={styles.videoWrapper} ref={wrapperRef}>
      <video
        ref={videoRef}
        className={styles.video}
        src={inView ? src : undefined}
        poster={poster}
        aria-label={label}
        preload="none"
        loop
        muted
        playsInline
        controls
      />
    </div>
  );
};

const VideoGallery = ({ videos }) => {
  return (
    <div className={styles.container}>
      {videos.map((video, index) => (
        <LazyVideo
          key={index}
          src={video.src}
          poster={video.poster}
          label={video.alt}
        />
      ))}
    </div>
  );
};

export default VideoGallery;
