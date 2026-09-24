import React from 'react';
import InteractiveCanvas from './InteractiveCanvas';

export default function Hero({ onOpenProjectModal }) {
  return (
    <section className="hero hero-section hero-centered-layout" id="hero">
      {/* Background 3D Character with Ambient Blur & Depth */}
      <InteractiveCanvas />

      {/* Foreground Content Layer */}
      <div className="hero-foreground-container">
        <div className="wrap hero-wrap hero-wrap-centered">
          <div className="hero-text-content hero-text-centered">
            <div className="hero-badge-tag">
              Ideas into digital experiences
            </div>

            <h1 className="hero-heading">
              Not just websites, <br />
              <em>experiences.</em>
            </h1>

            <p className="lead hero-lead">
              PixaP is a boutique studio that designs and crafts bespoke digital experiences: 
              tailored to your unique brand story, never assembled from generic templates.
            </p>

            <div className="hero-cta-group hero-cta-centered">
              <button 
                type="button"
                className="pill pill-solid hero-btn-primary" 
                onClick={onOpenProjectModal}
              >
                <span>Start a Project</span>
                <span className="arr">→</span>
              </button>

              <a 
                className="pill pill-ghost hero-btn-secondary" 
                href="#about"
              >
                <span>Explore Our Work</span>
                <span className="arr">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
