import { clients } from '../../data/clients'

export default function ClientLogos() {
  return (
    <section id="trusted-brands" className="trusted-brands">
      {/* <p className="section-label">★ TRUSTED BY</p> */}
      <h2>Brands We've Worked With</h2>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#94847D', marginTop: '8px', marginBottom: '4px' }}>
        Trusted By Businesses That Think Bigger
      </p>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: '#7F736E', marginTop: '4px', marginBottom: '0' }}>
        Partnering with hospitality, healthcare, retail, real estate, manufacturing, education and technology brands.
      </p>

      {/* Single scroll line: scrolls left */}
      <div className="marquee-track">
        <div className="marquee-inner marquee-left">
          {clients.map((client, i) => (
            <img loading="lazy" decoding="async" 
              key={`left-1-${i}`} 
              src={client.logo} 
              alt={client.name} 
              className={client.name === 'Client 3' ? 'client3-logo' : ''}
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, i) => (
            <img loading="lazy" decoding="async" 
              key={`left-2-${i}`} 
              src={client.logo} 
              alt={client.name} 
              className={client.name === 'Client 3' ? 'client3-logo' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
