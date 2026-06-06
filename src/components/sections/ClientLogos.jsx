import { motion } from 'framer-motion'
import { clients } from '../../data/clients'

function LogoRow({ direction = 1, items }) {
  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        padding: '20px 0',
      }}
    >
      <motion.div
        animate={{
          x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{
          display: 'flex',
          gap: '64px',
          width: 'max-content',
        }}
      >
        {[...items, ...items].map((client, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '140px',
              opacity: 0.4,
              transition: 'opacity 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.4'
            }}
          >
            <img
              src={client.logo}
              alt={client.name}
              style={{
                maxWidth: '120px',
                maxHeight: '40px',
                filter: 'brightness(0)',
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section
      style={{
        background: 'var(--color-charcoal)',
        padding: '80px 0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
          }}
        >
          Trusted by Brands That Mean Business
        </p>
      </div>

      <LogoRow direction={1} items={clients} />
      <LogoRow direction={-1} items={clients.slice().reverse()} />
    </section>
  )
}
