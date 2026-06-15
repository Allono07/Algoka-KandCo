import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { fadeUp, staggerContainer } from '../../utils/animations'
import contactImage from '../../assets/contact/contact.jpeg'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('message', form.message)

    try {
      const response = await fetch('https://algoka.io/api/submit.ph', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Message sent successfully!')
        setForm({ name: '', email: '', message: '' })
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 0',
    background: 'transparent', border: 'none',
    borderBottom: '1.5px solid #C1B6AF',
    color: '#2D2926', fontSize: '15px',
    fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" ref={ref} className="section-padding" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }} className="grid-responsive">

          {/* Left Column: Info + Form */}
          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.span variants={fadeUp}
              style={{ display: 'block', fontSize: '12px', letterSpacing: '0.15em',
                       textTransform: 'uppercase', color: '#94847D', marginBottom: '16px',
                       fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              {/* ★ GET IN TOUCH */}
            </motion.span>
            <motion.h2 variants={fadeUp}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(40px, 5vw, 72px)',
                       fontWeight: 700, lineHeight: 1.1, color: '#2D2926',
                       marginBottom: '40px' }}>
              Contact Us
            </motion.h2>

            {/* Contact Details */}
            <div style={{ marginBottom: '48px' }}>
              {[
                { label: 'Email',   value: 'contact@kalpandco.com',   href: 'mailto:contact@kalpandco.com', icon: '✉️' },
                { label: 'Phone',   value: '+91 94822 12222',          href: 'tel:+919482212222', icon: '📞' },
                { label: 'Address', value: '4th Floor, 33/1 Vittal Mallya Rd, Bengaluru 560001', href: '#', icon: '📍' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <a href={item.href}
                      style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: '#2D2926', fontWeight: 400, textDecoration: 'none',
                                transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#94847D'}
                      onMouseLeave={e => e.target.style.color = '#2D2926'}>
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <div className="contact-form-box">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <input name="name" placeholder="Name" type="text"
                value={form.name} onChange={handleChange} required
                style={inputStyle}
                onFocus={e => e.target.style.borderBottomColor = '#94847D'}
                onBlur={e => e.target.style.borderBottomColor = '#C1B6AF'}
              />
              <input name="email" placeholder="Email Address" type="email"
                value={form.email} onChange={handleChange} required
                style={inputStyle}
                onFocus={e => e.target.style.borderBottomColor = '#94847D'}
                onBlur={e => e.target.style.borderBottomColor = '#C1B6AF'}
              />
              <textarea name="message" placeholder="Message"
                value={form.message} onChange={handleChange} rows={4} required
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderBottomColor = '#94847D'}
                onBlur={e => e.target.style.borderBottomColor = '#C1B6AF'}
              />

              <motion.button type="submit"
                disabled={loading}
                className="cta-btn"
                style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Image + Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={contactImage} alt="Studio Space" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ width: '100%', height: '240px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #C1B6AF' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.5945627153676!3d12.971598690856006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167a57a5cfa7%3A0xcf958bb4829370bb!2sVittal%20Mallya%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
