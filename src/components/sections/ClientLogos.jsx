import { clients } from '../../data/clients'

export default function ClientLogos() {
  return (
    <section id="trusted-brands" className="trusted-brands">
      {/* <p className="section-label">★ TRUSTED BY</p> */}
      <h2>Brands We've Worked With</h2>

      {/* Single scroll line: scrolls left */}
      <div className="marquee-track">
        <div className="marquee-inner marquee-left">
          {clients.map((client, i) => (
            <img key={`left-1-${i}`} src={client.logo} alt={client.name} />
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, i) => (
            <img key={`left-2-${i}`} src={client.logo} alt={client.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
