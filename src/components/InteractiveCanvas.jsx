import React, { useEffect, useRef, useState } from 'react';

// 5x5 Grid frames mapping (r1c1 to r5c5)
const IDLE = { row: 3, col: 3 };
const AMBIENT_WAYPOINTS = [
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
  const floatWrapperRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // High performance tracking state stored entirely in ref:
  // ZERO React re-renders during mouse moves for 120fps buttery smooth performance
  const physicsRef = useRef({
    // Canvas frame mapping
    currentFrame: { ...IDLE },
    targetFrame: { ...IDLE },
    drawnKey: null,
    lastInteraction: Date.now(),
    ambientIdx: 0,

    // Smooth cursor tracking with LERP & Damping
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    targetTransX: 0,
    targetTransY: 0,
    currentTransX: 0,
    currentTransY: 0,

    // RAF handle
    rafId: null,
    isDestroyed: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const floatWrapper = floatWrapperRef.current;
    if (!canvas || !container || !floatWrapper) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const frameCache = {};
    const state = physicsRef.current;
    state.isDestroyed = false;

    // Preload all 25 frame images into cache
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
          // Support both absolute and relative public path
          img.src = `/assets/frames/r${r}c${c}.jpg`;
        });
      });

      await Promise.all(promises);
      if (!state.isDestroyed) {
        setIsReady(true);
        resizeCanvas();
        drawCurrentFrame();
      }
    };

    function resizeCanvas() {
      if (!canvas || state.isDestroyed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        state.drawnKey = null; // Force redraw on resize
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

    function drawCurrentFrame() {
      if (state.isDestroyed || !canvas) return;
      const key = `${state.currentFrame.row}-${state.currentFrame.col}`;
      if (key === state.drawnKey) return;

      const img = frameCache[key];
      if (!img || !img.naturalWidth) return;

      drawImageCover(img);
      state.drawnKey = key;
    }

    // Map cursor position to 5x5 gaze grid and 3D antigravity tilt targets
    function updateCursorTargets(clientX, clientY) {
      state.lastInteraction = Date.now();

      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;

      // Normalized coordinates from -1 to 1 (0 at center)
      const normX = (clientX / winW - 0.5) * 2;
      const normY = (clientY / winH - 0.5) * 2;

      // Antigravity 3D tilt targets (degrees) & subtle translation (px)
      state.targetTiltX = -normY * 11; // Tilt up/down on Y cursor movement
      state.targetTiltY = normX * 13;  // Tilt left/right on X cursor movement
      state.targetTransX = normX * 18; // Subtle drift towards mouse
      state.targetTransY = normY * 14;

      // Gaze sector for 5x5 grid (0 to 1)
      const uX = Math.min(Math.max(clientX / winW, 0), 1);
      const uY = Math.min(Math.max(clientY / winH, 0), 1);

      const col = uX < 0.20 ? 1 : uX < 0.40 ? 2 : uX < 0.60 ? 3 : uX < 0.80 ? 4 : 5;
      const row = uY < 0.20 ? 1 : uY < 0.40 ? 2 : uY < 0.60 ? 3 : uY < 0.80 ? 4 : 5;

      state.targetFrame = { row, col };
    }

    function resetToIdle() {
      state.targetTiltX = 0;
      state.targetTiltY = 0;
      state.targetTransX = 0;
      state.targetTransY = 0;
      state.targetFrame = { ...IDLE };
    }

    // Main Antigravity Animation Loop (LERP + Zero-G Sinusoidal Float)
    function loop(timestamp) {
      if (state.isDestroyed) return;

      // 1. Ambient idle wandering when mouse is inactive for > 3.5s
      if (Date.now() - state.lastInteraction > 3500) {
        const cycle = Math.floor(timestamp / 2200);
        const waypoint = AMBIENT_WAYPOINTS[cycle % AMBIENT_WAYPOINTS.length];
        state.targetFrame = waypoint;
      }

      // 2. Linear Interpolation (LERP) with damping factor (0.05) for smooth inertia
      const damping = 0.055;
      state.currentTiltX += (state.targetTiltX - state.currentTiltX) * damping;
      state.currentTiltY += (state.targetTiltY - state.currentTiltY) * damping;
      state.currentTransX += (state.targetTransX - state.currentTransX) * damping;
      state.currentTransY += (state.targetTransY - state.currentTransY) * damping;

      // 3. Continuous zero-gravity antigravity float (multi-frequency harmonics)
      const t = timestamp * 0.0015;
      const floatY = Math.sin(t) * 14 + Math.sin(t * 0.5) * 4;
      const floatX = Math.cos(t * 0.75) * 6;
      const floatRotZ = Math.sin(t * 0.8) * 1.8;

      // 4. Update 3D Transform on DOM element without React re-renders
      if (floatWrapper) {
        const transX = state.currentTransX + floatX;
        const transY = state.currentTransY + floatY;
        const rotX = state.currentTiltX;
        const rotY = state.currentTiltY;
        const rotZ = floatRotZ;

        floatWrapper.style.transform = `perspective(1200px) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
      }

      // 5. Update canvas frame if target changed
      if (
        state.currentFrame.row !== state.targetFrame.row ||
        state.currentFrame.col !== state.targetFrame.col
      ) {
        state.currentFrame = { ...state.targetFrame };
        drawCurrentFrame();
      }

      state.rafId = requestAnimationFrame(loop);
    }

    // High performance event listeners without React useState
    const handleMouseMove = (e) => {
      updateCursorTargets(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updateCursorTargets(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', resetToIdle);
    window.addEventListener('blur', resetToIdle);
    window.addEventListener('touchend', resetToIdle);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    preloadFrames();
    state.rafId = requestAnimationFrame(loop);

    return () => {
      state.isDestroyed = true;
      if (state.rafId) cancelAnimationFrame(state.rafId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', resetToIdle);
      window.removeEventListener('blur', resetToIdle);
      window.removeEventListener('touchend', resetToIdle);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-[850px] aspect-[16/9] pointer-events-none select-none z-[1]"
      style={{
        position: 'absolute',
        right: 'clamp(0px, 3vw, 48px)',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(360px, 52vw, 850px)',
        maxWidth: '850px',
        aspectRatio: '16 / 9',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1,
        // Seamless radial mask to fade all edges cleanly into pitch black (#000000)
        maskImage: 'radial-gradient(circle at 50% 50%, black 45%, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 0.3) 78%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 45%, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 0.3) 78%, transparent 95%)'
      }}
      aria-hidden="true"
    >
      {/* Antigravity floating wrapper with 3D perspective and physics */}
      <div
        ref={floatWrapperRef}
        className="w-full h-full will-change-transform flex items-center justify-center pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <canvas
          id="characterCanvas"
          ref={canvasRef}
          className="w-full h-full object-cover block pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
            background: 'transparent'
          }}
          aria-label="Antigravity 3D character animation"
          role="img"
        />
      </div>

      {/* Subtle loading badge until initial frames are primed */}
      {!isReady && (
        <div
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121215]/80 backdrop-blur-md border border-white/10 text-xs text-neutral-400 pointer-events-none"
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(18, 18, 21, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '11px',
            color: '#8C8C94',
            pointerEvents: 'none'
          }}
        >
          <div
            className="w-2.5 h-2.5 border-2 border-white/20 border-t-[#E07A5F] rounded-full animate-spin"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: '#E07A5F',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <span>Loading 3D asset</span>
        </div>
      )}
    </div>
  );
}
