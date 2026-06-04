import React from 'react';
import '../styles/clients.css';

// List of client logos – replace these with real SVGs placed in public/assets/clients
const clientLogos = [
  '/assets/clients/dior.svg',
  '/assets/clients/rolex.svg',
  '/assets/clients/rapha.svg',
  '/assets/clients/waldorf-astoria.svg',
  '/assets/clients/aman.svg',
  '/assets/clients/boodles.svg',
  '/assets/clients/harvey-nichols.svg',
  '/assets/clients/dorchester.svg',
  '/assets/clients/claridges.svg',
  '/assets/clients/edition.svg',
  '/assets/clients/liberty.svg',
  '/assets/clients/maison-francis-kurkdjian.svg',
];

export default function Clients() {
  return (
    <section className="clients-section" id="clients">
      <div className="container">
        <h2 className="section-title">Our Clients</h2>
        <div className="clients-grid">
          {clientLogos.map((src, idx) => (
            <img key={idx} src={src} alt={`Client ${idx + 1}`} className="client-logo" />
          ))}
        </div>
      </div>
    </section>
  );
}
