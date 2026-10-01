import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectDetailModal from './ProjectDetailModal';

export default function WhatWeBuild({ onOpenInquiry }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="what-we-build-section" id="work" aria-label="Selected Projects">
      <div className="what-we-build-container">
        
        {/* Header Block */}
        <div className="what-we-build-header reveal">
          <p className="what-we-build-index">01 / SELECTED WORK</p>
          <div className="what-we-build-title-row">
            <h2 className="what-we-build-headline">
              We build what<br />
              <span className="what-we-build-headline-serif">should exist.</span>
            </h2>
            <p className="what-we-build-subhead">
              From personal websites to brand experiences, explore selected work 
              crafted with high precision, bespoke aesthetics, and purposeful interactions.
            </p>
          </div>
        </div>

        {/* Compact Projects Grid (Optimized for 1-2 projects) */}
        <div className="compact-projects-wrapper">
          <div className="compact-projects-grid">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="compact-project-card reveal"
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                {/* Compact Thumbnail */}
                <div className="compact-project-media">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="compact-project-img"
                    loading="lazy"
                  />
                  <span className="compact-project-badge">{project.category}</span>
                </div>

                {/* Card Content (Black box, white text) */}
                <div className="compact-project-content">
                  <div className="compact-project-header">
                    <span className="compact-project-num">{project.num}</span>
                    <span className="compact-project-year">{project.year}</span>
                  </div>

                  <h3 className="compact-project-title">
                    <span>{project.title}</span>
                    <ArrowUpRight size={16} className="compact-project-arrow" />
                  </h3>

                  <p className="compact-project-tagline">{project.tagline}</p>

                  <div className="compact-project-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="compact-project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Footer Manifesto */}
        <div className="what-we-build-manifesto reveal">
          <p className="manifesto-line-1">
            No fixed templates. No one-size-fits-all solutions.
          </p>
          <p className="manifesto-line-2">
            Just ideas, designed around you.
          </p>
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        isOpen={Boolean(selectedProject)}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={onOpenInquiry}
      />
    </section>
  );
}
