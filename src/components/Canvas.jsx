import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollArrow from './ScrollArrow';

const DESKTOP_FRAME_COUNT = 120;
const MOBILE_FRAME_COUNT = 120;
const MOBILE_FRAME_STEP = 2;
const FRAME_CACHE = new Map();

function getFrameManifest() {
  const isMobile = window.innerWidth < 768;
  const folder = isMobile ? 'mobile' : 'desktop';
  const total = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
  const step = isMobile ? MOBILE_FRAME_STEP : 1;
  const frameSources = [];
  const publicRoot = process.env.PUBLIC_URL || '';

  for (let frame = 1; frame <= total; frame += step) {
    frameSources.push(
      `${publicRoot}/frames/${folder}/frame_${String(frame).padStart(4, '0')}.png`
    );
  }

  const finalFrame = `${publicRoot}/frames/${folder}/frame_${String(total).padStart(4, '0')}.png`;

  if (frameSources[frameSources.length - 1] !== finalFrame) {
    frameSources.push(finalFrame);
  }

  return {
    cacheKey: `${folder}-${step}`,
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
  const rafRef = useRef(0);
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
        cancelAnimationFrame(rafRef.current);
      };
    }

    let loadedFrames = 0;

    Promise.all(
      frameSources.map(
        (source) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.decoding = 'async';
            image.src = source;
            image.onload = () => {
              loadedFrames += 1;

              if (isMounted) {
                setLoadProgress(loadedFrames / frameSources.length);
              }

              resolve(image);
            };
            image.onerror = () => reject(new Error(`Unable to load ${source}.`));
          })
      )
    )
      .then((images) => {
        if (!isMounted) {
          return;
        }

        FRAME_CACHE.set(cacheKey, images);
        imagesRef.current = images;
        setLoadProgress(1);
        setIsReady(true);
        unlockScroll();
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setLoadProgress(1);
        setIsReady(true);
        unlockScroll();
      });

    return () => {
      isMounted = false;
      unlockScroll();
      cancelAnimationFrame(rafRef.current);
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
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    }

    function requestDraw(frameIndex) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
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
      requestDraw(currentFrameRef.current);
    }

    resizeCanvas();
    requestDraw(0);

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
        scrub: 0.72,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value) => {
            if (value < 0.04) {
              return 0;
            }
            
            if (value > 0.992 && value < 1) {
              return 1;
            }

            return value;
          },
          duration: { min: 0.08, max: 0.18 },
          ease: 'power2.out',
        },
        onUpdate: (self) => {
          const frameProgress = gsap.utils.clamp(0, 1, self.progress / holdStart);
          const frameIndex = Math.round(frameProgress * (imagesRef.current.length - 1));
          const arrowOpacity = gsap.utils.clamp(0, 1, 1 - self.progress / 0.09);
          const blendProgress = gsap.utils.clamp(0, 1, (self.progress - 0.972) / 0.028);

          if (frameIndex !== currentFrameRef.current) {
            requestDraw(frameIndex);
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
          requestDraw(currentFrameRef.current);
        },
      });
    }, sectionRef);

    function handleResize() {
      resizeCanvas();
    }

    window.addEventListener('resize', handleResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
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
