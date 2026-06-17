import { useEffect, useRef, useState } from 'react'
import desktopVideo from '../../../Intro - video/laptop-video.mp4'
import mobileVideo from '../../../Intro - video/intro-mobile-samyak.mp4'

export default function Hero() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const unlockedRef = useRef(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }

    // Unmute on first user interaction (browser policy requires this)
    const unlock = () => {
      if (unlockedRef.current) return
      unlockedRef.current = true
      if (videoRef.current) {
        videoRef.current.muted = false
        setMuted(false)
      }
      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }

    window.addEventListener('click', unlock, { once: true })
    window.addEventListener('touchstart', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })

    // IntersectionObserver to mute/unmute audio based on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0
        if (videoRef.current) {
          // Only change muted state if needed
          if (videoRef.current.muted !== !isVisible) {
            videoRef.current.muted = !isVisible
            setMuted(!isVisible)
          }
        }
      },
      { threshold: [0] }
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
      if (observer) observer.disconnect()
    }
  }, [])

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const next = !videoRef.current.muted
    videoRef.current.muted = next
    setMuted(next)
    unlockedRef.current = true
  }

  return (
    <section
      ref={sectionRef}
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

      {/* Mute / Unmute toggle */}
      <button
        onClick={toggleMute}
        title={muted ? 'Unmute' : 'Mute'}
        className="hero-mute-btn"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 10,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          fontSize: '18px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
      >
        {muted ? (
          /* Muted icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          /* Unmuted icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>
    </section>
  )
}