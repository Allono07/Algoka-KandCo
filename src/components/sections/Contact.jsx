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
              { label: 'WhatsApp',value: '+91 94822 12222',          href: 'https://wa.me/919482212222' },
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

            {/* Instagram */}
            <motion.div variants={fadeUp} style={{ marginTop: '40px' }}>
              <a href="https://www.instagram.com/kalpandco" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px',
                         color: 'var(--color-muted)', textDecoration: 'none',
                         fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}>
                <span>Instagram</span>
                <span>→</span>
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
