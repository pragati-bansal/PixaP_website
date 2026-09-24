import React from 'react';
import { Layout, Palette, Zap, Sparkles } from 'lucide-react';

const services = [
  {
    id: 'web-dev',
    title: 'Website Development',
    tag: 'Engineering',
    desc: 'Lightning fast, bespoke coded web applications built with modern frontend frameworks and clean architecture.',
    artClass: 'a1'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    tag: 'Visual Identity',
    desc: 'Intuitive user experiences, thoughtful typography, and micro-interactions people genuinely enjoy.',
    artClass: 'a2'
  },
  {
    id: 'landing',
    title: 'Landing Pages',
    tag: 'High Conversion',
    desc: 'One laser-focused page designed to tell your product story and convert visitors into loyal customers.',
    artClass: 'a3'
  },
  {
    id: 'custom',
    title: 'Custom Projects',
    tag: 'Special Builds',
    desc: 'Have an unconventional interactive idea or creative experimental vision? We turn the unusual into reality.',
    artClass: 'a4'
  }
];

export default function Services({ onSelectService }) {
  return (
    <section className="dark" id="services">
      <div className="wrap">
        <p className="label">02 / Our services</p>
        <div className="head-row reveal">
          <div>
            <h2>What We Do</h2>
            <p className="muted" style={{ marginTop: '8px' }}>
              Four specialized disciplines to help ambitious ideas become working, memorable websites.
            </p>
          </div>
          <a className="link" href="#contact">
            <span>Explore Services</span>
            <span className="arr">→</span>
          </a>
        </div>

        <div className="cards">
          {services.map((s) => (
            <article 
              key={s.id} 
              className="card reveal"
              onClick={() => onSelectService && onSelectService(s.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-art-container">
                <div className={`art ${s.artClass}`} />
              </div>
              <div className="card-content">
                <span className="card-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
