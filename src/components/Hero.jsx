import React from 'react';
import InteractiveCanvas from './InteractiveCanvas';

export default function Hero({ onOpenProjectModal }) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden flex items-center justify-start hero-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        minHeight: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#080808',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* 3D Antigravity Floating Character Layer (Placed on right-middle with soft radial mask) */}
      <InteractiveCanvas />

      {/* Foreground Content Layer (Left Side, Sharp White Typography, Sitting on Top) */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pointer-events-none hero-content-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
          pointerEvents: 'none'
        }}
      >
        <div
          className="max-w-xl lg:max-w-2xl text-left pointer-events-auto flex flex-col items-start hero-inner"
          style={{
            maxWidth: '680px',
            textAlign: 'left',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          {/* Badge Tag */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-xs font-mono tracking-widest uppercase text-white/90 mb-7 shadow-lg shadow-black/40"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '26px'
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#E07A5F] shadow-[0_0_8px_#E07A5F]"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#E07A5F',
                boxShadow: '0 0 8px #E07A5F',
                display: 'inline-block'
              }}
            />
            <span>Ideas into digital experiences</span>
          </div>

          {/* Sharp White Heading */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-6 drop-shadow-2xl"
            style={{
              fontSize: 'clamp(42px, 5.8vw, 82px)',
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 24px 0',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)'
            }}
          >
            Not just websites, <br />
            <em
              className="font-serif italic font-normal text-neutral-100"
              style={{
                fontFamily: 'var(--serif, "Instrument Serif", Georgia, serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#F5F4EE'
              }}
            >
              experiences.
            </em>
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p
            className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed mb-10 max-w-lg"
            style={{
              maxWidth: '540px',
              color: 'rgba(240, 240, 245, 0.85)',
              fontSize: 'clamp(16px, 1.2vw, 19px)',
              lineHeight: 1.7,
              marginBottom: '38px',
              textShadow: '0 2px 18px rgba(0, 0, 0, 0.8)'
            }}
          >
            We design and build digital experiences shaped around your idea — never around a template.
          </p>

          {/* CTA Buttons */}
          <div
            className="relative z-20 flex flex-wrap items-center gap-4.5"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 20
            }}
          >
            <button
              type="button"
              onClick={onOpenProjectModal}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10 active:translate-y-0 cursor-pointer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <span>Start a Project</span>
              <span
                className="arr transition-transform duration-300 group-hover:translate-x-1"
                style={{ display: 'inline-block' }}
              >
                →
              </span>
            </button>

            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm text-white font-semibold text-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 active:translate-y-0"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 26px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
              }}
            >
              <span>Explore Our Work</span>
              <span
                className="arr transition-transform duration-300 group-hover:translate-y-0.5"
                style={{ display: 'inline-block' }}
              >
                ↓
              </span>
            </a>
          </div>

          {/* Bottom Hero Tagline (Editorial Micro-Detail) */}
          <div
            className="hero-editorial-tagline"
            style={{
              marginTop: '56px',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)',
              userSelect: 'none'
            }}
          >
            DESIGNED, DEVELOPED &amp; ANIMATED BY PIXAP
          </div>
        </div>
      </div>
    </section>
  );
}
