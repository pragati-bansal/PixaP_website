import React, { useEffect, useRef, useState } from 'react';

// Grid frames: 5 rows x 5 columns = 25 frames
// Row 1 (top) -> Row 5 (bottom)
// Col 1 (left) -> Col 5 (right)
const IDLE = { row: 3, col: 3 };
const AMBIENT = [
  { row: 3, col: 3 }, // center
  { row: 2, col: 3 }, // up
  { row: 2, col: 4 }, // up-right
  { row: 3, col: 4 }, // right
  { row: 4, col: 4 }, // down-right
  { row: 4, col: 3 }, // down
  { row: 4, col: 2 }, // down-left
  { row: 3, col: 2 }, // left
  { row: 2, col: 2 }  // up-left
];

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // High performance tracking state stored in ref - 0 React state re-renders during mouse moves
  const trackingState = useRef({
    current: { ...IDLE },
    target: { ...IDLE },
    drawnKey: null,
    isHovering: false,
    lastInteraction: Date.now(),
    ambientIdx: 0,
    queued: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const frameCache = {};
    let isDestroyed = false;

    // Preload all 25 frame images into memory
    const preloadFrames = async () => {
      const promises = Array.from({ length: 25 }, (_, i) => {
        const r = Math.floor(i / 5) + 1;
        const c = (i % 5) + 1;
        const key = `${r}-${c}`;
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            frameCache[key] = img;
            resolve();
          };
          img.src = `assets/frames/r${r}c${c}.jpg`;
        });
      });

      await Promise.all(promises);
      if (!isDestroyed) {
        setIsReady(true);
        resizeCanvas();
        drawCurrentFrame();
        startAmbientLoop();
      }
    };

    function resizeCanvas() {
      if (!canvas || isDestroyed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        trackingState.current.drawnKey = null; // Force redraw on resize
        drawCurrentFrame();
      }
    }

    // Helper to draw image maintaining aspect ratio cover without distortion
    function drawImageCover(img) {
      if (!img || !img.naturalWidth || !img.naturalHeight) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let dw, dh, dx, dy;
      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imgRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Immediate frame drawer on requestAnimationFrame
    function drawCurrentFrame() {
      trackingState.current.queued = false;
      if (isDestroyed || !canvas) return;

      const state = trackingState.current;
      const key = `${state.current.row}-${state.current.col}`;
      if (key === state.drawnKey) return;

      const img = frameCache[key];
      if (!img || !img.naturalWidth) return;

      drawImageCover(img);
      state.drawnKey = key;
    }

    function scheduleDraw() {
      if (!trackingState.current.queued && !isDestroyed) {
        trackingState.current.queued = true;
        requestAnimationFrame(drawCurrentFrame);
      }
    }

    // Map exact cursor coordinates across the screen to 5x5 gaze grid
    function setFromCursor(clientX, clientY) {
      const state = trackingState.current;
      state.isHovering = true;
      state.lastInteraction = Date.now();

      const normX = Math.min(Math.max(clientX / window.innerWidth, 0), 1);
      const normY = Math.min(Math.max(clientY / window.innerHeight, 0), 1);

      // Exact sector mapping
      const col = normX < 0.20 ? 1 : normX < 0.40 ? 2 : normX < 0.60 ? 3 : normX < 0.80 ? 4 : 5;
      const row = normY < 0.20 ? 1 : normY < 0.40 ? 2 : normY < 0.60 ? 3 : normY < 0.80 ? 4 : 5;

      const next = { row, col };
      if (next.row !== state.current.row || next.col !== state.current.col) {
        state.current = next;
        scheduleDraw();
      }
    }

    function setIdle() {
      const state = trackingState.current;
      state.isHovering = false;
      state.lastInteraction = Date.now();
      if (state.current.row !== IDLE.row || state.current.col !== IDLE.col) {
        state.current = { ...IDLE };
        scheduleDraw();
      }
    }

    // Ambient gaze wandering when user is not moving mouse
    let ambientTimer = null;
    function startAmbientLoop() {
      if (ambientTimer) clearInterval(ambientTimer);
      ambientTimer = setInterval(() => {
        if (isDestroyed || document.hidden) return;
        const state = trackingState.current;
        if (Date.now() - state.lastInteraction < 3000) return;

        const nextWaypoint = AMBIENT[state.ambientIdx++ % AMBIENT.length];
        state.current = { ...nextWaypoint };
        scheduleDraw();
      }, 1800);
    }

    // Pointer Event Listeners
    function onPointerMove(e) {
      setFromCursor(e.clientX, e.clientY);
    }

    function onTouchMove(e) {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        setFromCursor(t.clientX, t.clientY);
      }
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', setIdle);
    window.addEventListener('blur', setIdle);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', setIdle, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    preloadFrames();

    return () => {
      isDestroyed = true;
      if (ambientTimer) clearInterval(ambientTimer);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', setIdle);
      window.removeEventListener('blur', setIdle);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', setIdle);
    };
  }, []);

  return (
    <div className="hero-canvas-bg-layer hero-canvas-fullscreen" aria-hidden="true">
      {/* Fullscreen Character Container */}
      <div 
        ref={containerRef} 
        className="hero-canvas-container hero-canvas-cover"
      >
        <canvas
          id="characterCanvas"
          ref={canvasRef}
          aria-label="Interactive character background animation"
          role="img"
        />
      </div>

      {!isReady && (
        <div className="canvas-loading-badge">
          <div className="canvas-loading-spinner" />
          <span>Loading 3D asset</span>
        </div>
      )}
    </div>
  );
}
