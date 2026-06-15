import { useEffect, useRef } from 'react'
import desktopVideo from '../../../Intro - video/laptop-video.mp4'
import mobileVideo from '../../../Intro - video/intro-mobile-samyak.mp4'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 'min(680px, 100svh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
        clipPath: 'inset(0 0 0 0)',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={mobileVideo} type="video/mp4" media="(max-width: 768px)" />
        <source src={desktopVideo} type="video/mp4" />
      </video>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 58%, rgba(0,0,0,0.42) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
