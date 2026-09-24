import React, { useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We explore your core goals, target audience, and the distinctive story worth communicating to the world.'
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Layouts, aesthetic typography, responsive flow, and motion are iteratively shaped and refined with you.'
  },
  {
    num: '03',
    title: 'Develop',
    desc: 'Clean, performant, modern React code engineered for lightning load speeds and responsiveness on every screen.'
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'We launch into production together seamlessly, monitoring performance and supporting continuous evolution.'
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section className="light" id="process">
      <div className="wrap">
        <p className="label">03 / Our process</p>
        <div className="head-row reveal">
          <h2>From Idea to Impact</h2>
          <span className="script">Process that works</span>
        </div>

        <ol className="steps">
          {steps.map((step, idx) => (
            <li 
              key={idx}
              className={`step-card reveal ${activeStep === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <i className="step-indicator" />
              <span className="step-num">{step.num}</span>
              <b className="step-title">{step.title}</b>
              <p className="step-desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
