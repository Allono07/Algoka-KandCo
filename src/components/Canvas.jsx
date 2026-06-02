import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollArrow from './ScrollArrow';

const DESKTOP_FRAME_COUNT = 100;
// Updated to match files in public/frames/mobile (numeric 3-digit names)
const MOBILE_FRAME_COUNT = 100;
const MOBILE_FRAME_STEP = 1;
const FRAME_CACHE = new Map();

function getFrameManifest() {
  const isMobile = window.innerWidth < 768;
  const folder = isMobile ? 'mobile' : 'desktop';
  const total = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
  const step = isMobile ? MOBILE_FRAME_STEP : 1;
  const frameSources = [];
  const publicRoot = process.env.PUBLIC_URL || '';

  if (isMobile) {
    // Mobile frames are provided as numeric 3-digit files (e.g. 001.png .. 145.png).
    for (let frame = 1; frame <= MOBILE_FRAME_COUNT; frame += step) {
      frameSources.push(
        `${publicRoot}/frames/${folder}/${String(frame).padStart(3, '0')}.png`
      );
    }

    const finalFrame = `${publicRoot}/frames/${folder}/${String(MOBILE_FRAME_COUNT).padStart(3, '0')}.png`;

    if (frameSources[frameSources.length - 1] !== finalFrame) {
      frameSources.push(finalFrame);
    }
  } else {
    for (let frame = 1; frame <= total; frame += 1) {
      frameSources.push(
        `${publicRoot}/frames/${folder}/${String(frame).padStart(3, '0')}.png`
      );
    }
  }

  return {
    cacheKey: isMobile ? `${folder}-${step}` : `desktop-${total}`,
    frameSources,
  };
}

export default function Canvas({ onReadyChange }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const arrowRef = useRef(null);
  const blendRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const displayFrameRef = useRef(0);
  const tickerFrameRef = useRef(0);
  const endHoldRef = useRef(false);
  const endHoldConsumedRef = useRef(false);
  const releaseArmedRef = useRef(false);
  const releaseTimerRef = useRef(0);
  const lockScrollYRef = useRef(0);
  const scrollClampRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof onReadyChange === 'function') {
      onReadyChange(isReady);
    }
  }, [isReady, onReadyChange]);

  useEffect(() => {
    let isMounted = true;
    const { cacheKey, frameSources } = getFrameManifest();
    const cachedFrames = FRAME_CACHE.get(cacheKey);
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    function unlockScroll() {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      Observer.getAll().forEach((observer) => {
        if (observer.vars.id === 'frame-preload-lock') {
          observer.kill();
        }
      });
    }

    setLoadProgress(0);
    setIsReady(false);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    Observer.create({
      id: 'frame-preload-lock',
      target: window,
      type: 'wheel,scroll,touch,pointer',
      preventDefault: true,
      allowClicks: true,
    });

    if (cachedFrames) {
      imagesRef.current = cachedFrames;
      setLoadProgress(1);
      setIsReady(true);
      unlockScroll();

      return () => {
        gsap.ticker.remove(tickerFrameRef.current);
      };
    }

    let loadedFrames = 0;

    const loaders = frameSources.map((source) =>
      new Promise((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = source;
        image.onload = () => {
          loadedFrames += 1;

          if (isMounted) {
            setLoadProgress(loadedFrames / frameSources.length);
          }

          resolve({ status: 'fulfilled', value: image, source });
        };
        image.onerror = () => {
          console.warn(`Canvas: failed to load frame ${source}`);
          // Resolve with rejected status but don't short-circuit other loads
          resolve({ status: 'rejected', reason: new Error(`Unable to load ${source}`), source });
        };
      })
    );

    Promise.all(loaders).then((results) => {
      if (!isMounted) return;

      const images = results
        .filter((r) => r && r.status === 'fulfilled')
        .map((r) => r.value);

      // If nothing loaded, still allow app to continue (avoid dead state)
      FRAME_CACHE.set(cacheKey, images);
      imagesRef.current = images;
      setLoadProgress(1);
      setIsReady(true);
      unlockScroll();
    });

    return () => {
      isMounted = false;
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!isReady || !imagesRef.current.length) {
      return undefined;
    }

    function drawFrame(frameIndex) {
      const canvas = canvasRef.current;
      const image = imagesRef.current[frameIndex];

      if (!canvas || !image) {
        return;
      }

      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scale = Math.max(viewportWidth / image.width, viewportHeight / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const drawX = (viewportWidth - drawWidth) / 2;
      const drawY = (viewportHeight - drawHeight) / 2;

      currentFrameRef.current = frameIndex;
      context.clearRect(0, 0, viewportWidth, viewportHeight);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    }

    function resizeCanvas() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewportWidth * ratio);
      canvas.height = Math.floor(viewportHeight * ratio);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawFrame(currentFrameRef.current);
    }

    resizeCanvas();

    const updateFrame = () => {
      const current = displayFrameRef.current;
      const target = targetFrameRef.current;
      const next = current + (target - current) * 0.1;

      displayFrameRef.current = next;

      const frameIndex = Math.round(next);

      if (frameIndex !== currentFrameRef.current) {
        drawFrame(frameIndex);
      }
    };

    tickerFrameRef.current = updateFrame;
    gsap.ticker.add(tickerFrameRef.current);

    function activateEndHold() {
      if (endHoldConsumedRef.current) {
        return;
      }

      endHoldRef.current = true;
      releaseArmedRef.current = false;
      lockScrollYRef.current = window.scrollY;
      if (!scrollClampRef.current) {
        const clampScroll = () => {
          if (!endHoldRef.current) {
            return;
          }

          if (window.scrollY !== lockScrollYRef.current) {
            window.scrollTo(0, lockScrollYRef.current);
          }
        };

        scrollClampRef.current = clampScroll;
        window.addEventListener('scroll', clampScroll, { passive: true });
      }
    }

    function releaseEndHold() {
      endHoldRef.current = false;
      releaseArmedRef.current = false;
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = 0;
      endHoldConsumedRef.current = true;
      if (scrollClampRef.current) {
        window.removeEventListener('scroll', scrollClampRef.current);
        scrollClampRef.current = 0;
      }
    }

    function handleHoldGesture(event) {
      if (!endHoldRef.current) {
        return;
      }

      event.preventDefault();
      window.scrollTo(0, lockScrollYRef.current);

      if (releaseArmedRef.current) {
        releaseEndHold();
        return;
      }

      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = window.setTimeout(() => {
        releaseArmedRef.current = true;
      }, 180);
    }

    const context = gsap.context(() => {
      const holdStart = 0.94;

      gsap.set(arrowRef.current, {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set(blendRef.current, {
        autoAlpha: 0,
        yPercent: 8,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${Math.max(imagesRef.current.length * 5, window.innerHeight * 1.35)}`,
        scrub: 1.3,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const frameProgress = gsap.utils.clamp(0, 1, self.progress / holdStart);
          const arrowOpacity = gsap.utils.clamp(0, 1, 1 - self.progress / 0.09);
          const blendProgress = gsap.utils.clamp(0, 1, (self.progress - 0.972) / 0.028);

          targetFrameRef.current = frameProgress * (imagesRef.current.length - 1);

          if (self.progress >= holdStart && !endHoldConsumedRef.current) {
            activateEndHold();
          } else if (self.progress < 0.92) {
            endHoldConsumedRef.current = false;
            releaseEndHold();
          }

          gsap.set(arrowRef.current, {
            autoAlpha: arrowOpacity,
            y: gsap.utils.interpolate(0, 24, Math.min(self.progress / 0.09, 1)),
          });

          gsap.set(blendRef.current, {
            autoAlpha: blendProgress,
            yPercent: gsap.utils.interpolate(8, 0, blendProgress),
          });
        },
        onRefresh: () => {
          drawFrame(currentFrameRef.current);
        },
      });
    }, sectionRef);

    function handleResize() {
      resizeCanvas();
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleHoldGesture, { passive: false, capture: true });
    window.addEventListener('touchmove', handleHoldGesture, { passive: false, capture: true });
    window.addEventListener('keydown', handleHoldGesture, { capture: true });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleHoldGesture, true);
      window.removeEventListener('touchmove', handleHoldGesture, true);
      window.removeEventListener('keydown', handleHoldGesture, true);
      if (scrollClampRef.current) {
        window.removeEventListener('scroll', scrollClampRef.current);
      }
      window.clearTimeout(releaseTimerRef.current);
      gsap.ticker.remove(tickerFrameRef.current);
      context.revert();
    };
  }, [isReady]);

  return (
    <section ref={sectionRef} className="canvas-hero">
      <div className={`canvas-hero__loading ${isReady ? 'is-complete' : ''}`}>
        <div
          className="canvas-hero__loading-bar"
          style={{ transform: `scaleX(${loadProgress})` }}
        />
      </div>

      <div className="canvas-hero__stage">
        <canvas ref={canvasRef} className="canvas-hero__canvas" />
        <div ref={blendRef} className="canvas-hero__blend" aria-hidden="true" />

        <div ref={arrowRef} className="canvas-hero__arrow" style={{ opacity: isReady ? 1 : 0 }}>
          <ScrollArrow />
        </div>
      </div>
    </section>
  );
}
