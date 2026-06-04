import React from 'react';

import '../styles/services.css';

const services = [
  'Branding',
  'Social Media Marketing',
  'Performance Marketing',
  'Website Design & Development',
  'Content Strategy',
  'Content Marketing',
  'Product Marketing',
  'Strategic Planning',
  'AI-driven Marketing Solutions',
  'Product Launch Campaigns',
  'Talent / Brand Partnerships',
  'Real Estate Marketing',
  'Creative Design Services',
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <ul className="services-list">
          {services.map((s, i) => (
            <li key={i} className="service-item">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
