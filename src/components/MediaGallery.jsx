import React from 'react';
import '../styles/mediaGallery.css';

// Placeholder images – replace ...
const placeholderImages = Array.from({ length: 6 }).map((_, i) => `/assets/placeholder-media-${i + 1}.jpg`);

export default function MediaGallery() {
  return (
    <section className="media-gallery-section" id="media-gallery">
      <div className="container">
        <h2 className="section-title">Our Work</h2>
        <div className="media-grid">
          {placeholderImages.map((src, idx) => (
            <div key={idx} className="media-item">
              <img src={src} alt={`Media ${idx + 1}`} className="media-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
