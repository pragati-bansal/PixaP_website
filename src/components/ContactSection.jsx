import React from 'react';

export default function ContactSection({ onOpenProjectModal }) {
  return (
    <section className="light cta" id="contact">
      <div className="wrap cta-row">
        <h2 className="big reveal">
          Got an Idea? <em className="scribble">Let's Build It.</em>
        </h2>
        <div className="reveal">
          <p className="muted">
            Custom websites engineered for an inspiring, vibrant digital future.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="pill pill-black" 
              onClick={onOpenProjectModal}
            >
              <span>Start a Project</span>
              <span className="arr">→</span>
            </button>
            <a 
              className="pill" 
              style={{ border: '1px solid rgba(18,18,20,0.2)', color: 'var(--ink-l)' }}
              href="mailto:hello@pixap.studio"
            >
              hello@pixap.studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
