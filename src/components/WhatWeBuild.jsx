import React from 'react';

const categories = [
  {
    num: '01',
    title: 'PERSONAL WEBSITES',
    tagline: 'For people. For stories.',
    subList: 'Personal Sites · Digital Profiles · About Me',
    serviceKey: 'ui-ux'
  },
  {
    num: '02',
    title: 'PORTFOLIOS',
    tagline: 'For work. For ideas.',
    subList: 'Portfolio Sites · Case Studies · Resume Sites',
    serviceKey: 'web-dev'
  },
  {
    num: '03',
    title: 'BUSINESS WEBSITES',
    tagline: 'For brands. For businesses.',
    subList: 'Brand Websites · Landing Pages · Service Websites',
    serviceKey: 'landing'
  },
  {
    num: '04',
    title: 'CUSTOM PROJECTS',
    tagline: "Have an idea? Let's build it.",
    subList: 'Interactive Apps · Bespoke Web Concepts · Experiments',
    serviceKey: 'custom'
  }
];

export default function WhatWeBuild({ onSelectCategory }) {
  return (
    <section className="what-we-build-section" id="work" aria-label="What We Build">
      <div className="what-we-build-container">
        
        {/* Header Block */}
        <div className="what-we-build-header reveal">
          <p className="what-we-build-index">01 / WHAT WE BUILD</p>
          <div className="what-we-build-title-row">
            <h2 className="what-we-build-headline">
              We build what<br />
              <span className="what-we-build-headline-serif">should exist.</span>
            </h2>
            <p className="what-we-build-subhead">
              From personal websites to brand experiences, we turn ideas into digital products 
              designed around the people and brands behind them.
            </p>
          </div>
        </div>

        {/* 4-Column Typography-Driven Category Grid */}
        <div className="what-we-build-grid">
          {categories.map((cat) => (
            <div
              key={cat.num}
              className="what-we-build-card reveal"
              onClick={() => onSelectCategory && onSelectCategory(cat.serviceKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory && onSelectCategory(cat.serviceKey);
                }
              }}
            >
              {/* Top: Numeric Counter */}
              <div className="card-top">
                <span className="card-counter">{cat.num}</span>
                <span className="card-counter-sub">— CATEGORY</span>
              </div>

              {/* Middle: Large Bold Typography Title + Arrow Indicator */}
              <div className="card-middle">
                <h3 className="card-title">
                  <span>{cat.title}</span>
                  <span className="card-arrow" aria-hidden="true">→</span>
                </h3>
                <p className="card-tagline">{cat.tagline}</p>
              </div>

              {/* Bottom: Compact statement / sub-bullets */}
              <div className="card-bottom">
                <p className="card-sublist">{cat.subList}</p>
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
    </section>
  );
}
