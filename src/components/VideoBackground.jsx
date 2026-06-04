import { useEffect, useRef } from 'react';
import '../styles/videoBackground.css';

/**
 * VideoBackground renders a full‑screen looping video.
 * It chooses the appropriate source based on viewport width
 * (mobile < 768px). When the video can play, it calls the optional
 * onLoaded callback so the rest of the app knows the hero is ready.
 */
export default function VideoBackground({ onLoaded }) {
  const videoRef = useRef(null);
  const src = window.innerWidth < 768 ? '/Intro%20-%20video/mobile-video.mp4' : '/Intro%20-%20video/laptop-video.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleCanPlay = () => {
      if (typeof onLoaded === 'function') onLoaded();
    };
    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [onLoaded]);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      src={src}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
