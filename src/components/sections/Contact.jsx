import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { fadeUp, staggerContainer } from '../../utils/animations'

// Setup: https://www.emailjs.com/
// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY)
      toast.success('Message sent! We\'ll be in touch shortly.')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '16px 0',
    background: 'transparent', border: 'none',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-white)', fontSize: '16px',
    fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section id="contact" ref={ref} className="section-padding"
      style={{ background: 'var(--color-black)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}
          className="grid-responsive">

          {/* Left */}
          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.span variants={fadeUp}
              style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                       textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
              Let's Talk
            </motion.span>
            <motion.h2 variants={fadeUp}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 5vw, 72px)',
                       fontWeight: 800, lineHeight: 1.0, color: 'var(--color-white)',
                       marginBottom: '40px', letterSpacing: '-0.02em' }}>
              Start Something Great
            </motion.h2>
            <motion.p variants={fadeUp}
              style={{ fontSize: '17px', color: 'var(--color-muted)', lineHeight: 1.7,
                       marginBottom: '60px' }}>
              Whether you're launching a brand, scaling a product, or rethinking your marketing —
              we'd love to hear from you.
            </motion.p>

            {/* Contact Details */}
            {[
              { label: 'Email',   value: 'contact@kalpandco.com',   href: 'mailto:contact@kalpandco.com' },
              { label: 'Phone',   value: '+91 94822 12222',          href: 'tel:+919482212222' },
              { label: 'Address', value: '4th Floor, 33/1 Vittal Mallya Rd, Bengaluru 560001', href: '#' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ marginBottom: '24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: 'var(--color-accent)', minWidth: '80px', paddingTop: '2px' }}>
                  {item.label}
                </span>
                <a href={item.href}
                  style={{ fontSize: '16px', color: 'var(--color-muted)', textDecoration: 'none',
                            transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
                  {item.value}
                </a>
              </motion.div>
            ))}

            {/* WhatsApp & Instagram icon buttons */}
            <motion.div variants={fadeUp} style={{ marginTop: '40px', display: 'flex', gap: '14px' }}>
              <a
                href="https://wa.me/919482212222"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="contact-social-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kalpandco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="contact-social-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'name',    placeholder: 'Your Name',         type: 'text' },
                { name: 'email',   placeholder: 'Email Address',     type: 'email' },
                { name: 'phone',   placeholder: 'Phone Number',      type: 'tel' },
              ].map(field => (
                <input key={field.name} {...field}
                  value={form[field.name]} onChange={handleChange} required
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--color-border)'}
                />
              ))}

              <select name="service" value={form.service} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'none' }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--color-accent)'}
                onBlur={e => e.target.style.borderBottomColor = 'var(--color-border)'}>
                <option value="" style={{ background: '#FFFFFF', color: '#0A0A0A' }}>Select a Service</option>
                {['Branding','Social Media Marketing','Performance Marketing',
                  'Website Design & Development','Content Strategy','AI-driven Marketing Solutions',
                  'Product Launch Campaigns','Real Estate Marketing','Other'].map(s => (
                  <option key={s} value={s} style={{ background: '#FFFFFF', color: '#0A0A0A' }}>{s}</option>
                ))}
              </select>

              <textarea name="message" placeholder="Tell us about your project"
                value={form.message} onChange={handleChange} rows={5} required
                style={{ ...inputStyle, resize: 'none', paddingTop: '20px' }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--color-accent)'}
                onBlur={e => e.target.style.borderBottomColor = 'var(--color-border)'}
              />

              <motion.button type="submit"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{ marginTop: '32px', padding: '18px 48px',
                          background: loading ? 'var(--color-border)' : 'var(--color-accent)',
                          color: 'var(--color-black)', border: 'none', cursor: 'none',
                          fontFamily: 'var(--font-body)', fontSize: '14px',
                          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
                          alignSelf: 'flex-start', transition: 'all 0.3s' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
