import React from 'react';
import CodeTypingAnimation from './CodeTypingAnimation';

const metricsData = [
  { value: '10+', label: 'Projects Shipped' },
  { value: '100%', label: 'Custom Engineered' },
  { value: '∞', label: 'Creative Ideas' },
  { value: 'Real', label: 'Measurable Impact' }
];

export default function About() {
  return (
    <section className="light" id="about">
      <div className="wrap">
        <p className="label">01 / About us</p>
        <div className="grid-2">
          <div className="reveal">
            <h2>More Than Just a Studio.</h2>
            <p className="muted">
              We start with your authentic story, then shape it into a digital experience that feels 
              unmistakably yours. Design and engineering sit at one shared table, ensuring that what 
              gets imagined is precisely what gets brought to life.
            </p>
            <a className="link" href="#services">
              <span>Know More</span>
              <span className="arr">→</span>
            </a>

            <ul className="metrics">
              {metricsData.map((item, idx) => (
                <li key={idx}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <CodeTypingAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
