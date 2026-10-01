import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, User, Layers, ArrowRight } from 'lucide-react';

export default function ProjectDetailModal({ isOpen, project, onClose, onInquire }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="project-detail-overlay open" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="project-detail-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close project preview"
        >
          <X size={20} />
        </button>

        {/* Modal Banner / Screenshot */}
        <div className="project-detail-hero">
          <img 
            src={project.image} 
            alt={project.title} 
            className="project-detail-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="project-detail-category-badge">
            {project.category}
          </div>
        </div>

        {/* Modal Body */}
        <div className="project-detail-body">
          <div className="project-detail-header-row">
            <div>
              <span className="project-detail-counter">{project.num} / FEATURED WORK</span>
              <h2 className="project-detail-title">{project.title}</h2>
              <p className="project-detail-tagline">{project.tagline}</p>
            </div>
            
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="pill pill-accent project-live-btn"
              >
                <span>Live Preview</span>
                <ExternalLink size={15} />
              </a>
            )}
          </div>

          {/* Meta Info Grid */}
          <div className="project-meta-grid">
            {project.year && (
              <div className="project-meta-item">
                <span className="project-meta-label">
                  <Calendar size={13} /> Year
                </span>
                <span className="project-meta-val">{project.year}</span>
              </div>
            )}
            {project.client && (
              <div className="project-meta-item">
                <span className="project-meta-label">
                  <User size={13} /> Client
                </span>
                <span className="project-meta-val">{project.client}</span>
              </div>
            )}
            {project.role && (
              <div className="project-meta-item">
                <span className="project-meta-label">
                  <Layers size={13} /> Role
                </span>
                <span className="project-meta-val">{project.role}</span>
              </div>
            )}
          </div>

          {/* Case Study / Description */}
          <div className="project-detail-desc-block">
            <h4 className="project-detail-section-title">Overview & Impact</h4>
            <p className="project-detail-text">{project.description}</p>
            {project.caseStudy && (
              <p className="project-detail-text" style={{ marginTop: '12px' }}>
                {project.caseStudy}
              </p>
            )}
          </div>

          {/* Tech Stack Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="project-detail-tech-block">
              <h4 className="project-detail-section-title">Technologies & Disciplines</h4>
              <div className="project-tags-list">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action / Inquire */}
          <div className="project-detail-footer">
            <p className="project-detail-footer-text">
              Looking for something tailored like this?
            </p>
            <button 
              className="pill pill-solid project-inquire-btn"
              onClick={() => {
                onClose();
                if (onInquire) onInquire(project.category);
              }}
            >
              <span>Build A Project Like This</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
