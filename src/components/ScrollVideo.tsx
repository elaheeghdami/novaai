import { useEffect, useRef, useState } from 'react';

export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';
/** Local mirror of the same file — used only if the CloudFront source fails or taints the canvas. */
export const VIDEO_FALLBACK_URL = import.meta.env.BASE_URL + 'hero.mp4';
export const POSTER_URL = import.meta.env.BASE_URL + 'hero-poster.jpg';

const MAX_FRAMES = 90;
const MIN_FRAMES = 24;
const FRAMES_PER_SECOND = 12;
const MAX_FRAME_WIDTH = 960;
const LERP = 0.12;
const SEEK_EPSILON = 0.04;

type Frame = ImageBitmap | HTMLCanvasElement;

function waitFor(target: EventTarget, event: string, timeoutMs = 15000) {
  return new Promise<void>((resolve, reject) => {
    const onOk = () => {
      cleanup();
      resolve();
    };
    const onErr = () => {
      cleanup();
      reject(new Error(`${event} failed`));
    };
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error(`${event} timeout`));
    }, timeoutMs);
    const cleanup = () => {
      window.clearTimeout(timer);
      target.removeEventListener(event, onOk);
      target.removeEventListener('error', onErr);
    };
    target.addEventListener(event, onOk, { once: true });
    target.addEventListener('error', onErr, { once: true });
  });
}

async function extractFrames(src: string, isCancelled: () => boolean): Promise<Frame[]> {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = src;

  try {
    if (video.readyState < 1) await waitFor(video, 'loadedmetadata');
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) throw new Error('invalid duration');

    const count = Math.min(MAX_FRAMES, Math.max(MIN_FRAMES, Math.floor(duration * FRAMES_PER_SECOND)));
    const scale = Math.min(1, MAX_FRAME_WIDTH / (video.videoWidth || MAX_FRAME_WIDTH));
    const w = Math.max(1, Math.round((video.videoWidth || MAX_FRAME_WIDTH) * scale));
    const h = Math.max(1, Math.round((video.videoHeight || 540) * scale));

    const scratch = document.createElement('canvas');
    scratch.width = w;
    scratch.height = h;
    const sctx = scratch.getContext('2d', { willReadFrequently: false });
    if (!sctx) throw new Error('no 2d context');

    const frames: Frame[] = [];
    for (let i = 0; i < count; i++) {
      if (isCancelled()) break;
      const t = (i / (count - 1)) * Math.max(0, duration - 0.05);
      video.currentTime = t;
      await waitFor(video, 'seeked');
      sctx.drawImage(video, 0, 0, w, h);
      // Throws SecurityError if the canvas got tainted (no CORS) — caller falls back to the local mirror.
      if (i === 0) sctx.getImageData(0, 0, 1, 1);
      if (typeof createImageBitmap === 'function') {
        frames.push(await createImageBitmap(scratch));
      } else {
        const copy = document.createElement('canvas');
        copy.width = w;
        copy.height = h;
        copy.getContext('2d')?.drawImage(scratch, 0, 0);
        frames.push(copy);
      }
    }
    return frames;
  } finally {
    video.removeAttribute('src');
    video.load();
  }
}

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Frame[]>([]);
  const [src, setSrc] = useState(VIDEO_URL);
  const [videoHasFrame, setVideoHasFrame] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  // Visible video: switch to local mirror if the CloudFront source errors.
  const onVideoError = () => {
    if (src !== VIDEO_FALLBACK_URL) setSrc(VIDEO_FALLBACK_URL);
  };

  // Frame cache extraction: starts after visible video's loadeddata + 300ms yield.
  useEffect(() => {
    if (!videoHasFrame || framesReady) return;
    let cancelled = false;
    const isCancelled = () => cancelled;
    const timer = window.setTimeout(async () => {
      const sources = src === VIDEO_FALLBACK_URL ? [VIDEO_FALLBACK_URL] : [src, VIDEO_FALLBACK_URL];
      for (const s of sources) {
        try {
          const frames = await extractFrames(s, isCancelled);
          if (cancelled) return;
          if (frames.length >= 2) {
            framesRef.current = frames;
            setFramesReady(true);
            return;
          }
        } catch (err) {
          console.warn('[ScrollVideo] frame cache failed for', s, err);
        }
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [videoHasFrame, framesReady, src]);

  // Scroll → smoothed progress → draw / seek.
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let target = 0;
    let smoothed = 0;
    let raf = 0;
    let lastIndex = -1;
    let needsResizeDraw = true;

    const computeTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      needsResizeDraw = true;
      computeTarget();
    };

    const drawCover = (img: Frame) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const tick = () => {
      smoothed += (target - smoothed) * LERP;
      if (Math.abs(target - smoothed) < 0.0001) smoothed = target;

      const frames = framesRef.current;
      if (frames.length > 0) {
        const index = Math.min(frames.length - 1, Math.max(0, Math.round(smoothed * (frames.length - 1))));
        if (index !== lastIndex || needsResizeDraw) {
          drawCover(frames[index]);
          lastIndex = index;
          needsResizeDraw = false;
        }
      } else if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
        const t = smoothed * (video.duration - 0.05);
        if (Math.abs(video.currentTime - t) > SEEK_EPSILON && !video.seeking) {
          video.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const showVideo = videoHasFrame && !framesReady;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]" aria-hidden="true">
      <img
        src={POSTER_URL}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoHasFrame || framesReady ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <video
        ref={videoRef}
        src={src}
        crossOrigin="anonymous"
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoHasFrame(true)}
        onError={onVideoError}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          showVideo ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          framesReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Subtle scrim for text contrast — gradient only, never an opaque block */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
