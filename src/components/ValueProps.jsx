import React from 'react';

const valueProps = [
  { icon: '◐', title: '100% Customized Solutions', desc: 'No generic themes or bloated cookie-cutter builders' },
  { icon: '✦', title: 'Aesthetic Modern Design', desc: 'Curated typography, palettes, and micro-interactions' },
  { icon: '{ }', title: 'Modern React Architecture', desc: 'Modular components, performant rendering, and clean code' },
  { icon: '↻', title: 'Dedicated Ongoing Partnership', desc: 'Direct communication with the designers and builders' }
];

export default function ValueProps() {
  return (
    <section className="dark" id="value">
      <div className="wrap grid-2">
        <div className="reveal">
          <h2 className="big">Not Another Template.</h2>
          <p className="muted">
            Every digital artifact we create is crafted from a blank canvas around your distinct brand identity 
            and strategic ambitions.
          </p>

          <ul className="props">
            {valueProps.map((item, idx) => (
              <li key={idx}>
                <span>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--mute-d)', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <figure className="photo photo-vase reveal" aria-hidden="true" />
      </div>
    </section>
  );
}
