import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectDetailModal from './ProjectDetailModal';

const categories = ['All', 'Personal Websites', 'Portfolios', 'Business Websites', 'Custom Projects'];

export default function WhatWeBuild({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

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
              From personal websites to brand experiences, explore selected digital products 
              crafted with high precision, bespoke aesthetics, and purposeful interactions.
            </p>
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="projects-filter-bar reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`project-filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Showcase Grid */}
        <div className="projects-showcase-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-showcase-card reveal"
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
              {/* Media Preview Box */}
              <div className="project-card-media">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-card-img"
                  loading="lazy"
                />
                <div className="project-card-badge">
                  {project.category}
                </div>
                <div className="project-card-overlay">
                  <span className="project-overlay-btn">
                    <span>View Project</span>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

              {/* Card Content (Black box, white text) */}
              <div className="project-card-content">
                <div className="project-card-header">
                  <span className="project-card-num">{project.num}</span>
                  <span className="project-card-year">{project.year}</span>
                </div>

                <h3 className="project-card-title">
                  <span>{project.title}</span>
                  <ArrowUpRight size={18} className="project-title-arrow" />
                </h3>

                <p className="project-card-tagline">{project.tagline}</p>

                {/* Tech Pills */}
                <div className="project-card-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="project-mini-tag">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="project-mini-tag project-mini-tag-more">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
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
