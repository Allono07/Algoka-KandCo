const footerLinks = {
  Services: ['Branding','Social Media Marketing','Performance Marketing',
             'Website Design & Development','AI-driven Solutions','Real Estate Marketing'],
  Company:  ['About Us','Our Work','Blog','Team','Contact'],
  Connect:  ['Instagram','LinkedIn','WhatsApp','Email'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-charcoal)', borderTop: '1px solid var(--color-border)',
                     padding: '80px 0 40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '80px' }}
          className="grid-responsive-footer">

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800,
                           letterSpacing: '0.08em', color: 'var(--color-white)', marginBottom: '20px' }}>
              KALP<span style={{ color: 'var(--color-accent)' }}>&</span>CO
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.8,
                         maxWidth: '280px', marginBottom: '32px' }}>
              A growth-focused creative and marketing agency. Strategy. Branding. Digital. AI.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-border)' }}>
              4th Floor, 33/1 Vittal Mallya Rd,<br />Bengaluru, Karnataka 560001
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: 'var(--color-accent)', marginBottom: '24px' }}>
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#"
                      style={{ fontSize: '14px', color: 'var(--color-muted)', textDecoration: 'none',
                                transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '32px',
                       display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                       flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '12px', color: 'var(--color-border)' }}>
              © {new Date().getFullYear()} Kalp & Co. All rights reserved.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-border)' }}>
              Bengaluru · India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
