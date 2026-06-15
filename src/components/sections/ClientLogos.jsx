import { clients } from '../../data/clients'

export default function ClientLogos() {
  const reversedClients = [...clients].reverse();

  return (
    <section id="trusted-brands" className="trusted-brands">
      {/* <p className="section-label">★ TRUSTED BY</p> */}
      <h2>Brands We've Worked With</h2>

      {/* Row 1: scrolls left */}
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

      {/* Row 2: scrolls right */}
      <div className="marquee-track">
        <div className="marquee-inner marquee-right">
          {reversedClients.map((client, i) => (
            <img key={`right-1-${i}`} src={client.logo} alt={client.name} />
          ))}
          {/* Duplicate set for seamless loop */}
          {reversedClients.map((client, i) => (
            <img key={`right-2-${i}`} src={client.logo} alt={client.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
