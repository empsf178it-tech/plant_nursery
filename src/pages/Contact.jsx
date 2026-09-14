import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Plants.css';
import './SharedPages.css';

const InstagramIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const WhatsappIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', requirement: '', farmSize: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', location: '', requirement: '', farmSize: '', message: '' });
  };

  return (
    <PageWrapper>
      <section className="page-hero">
        <div className="page-hero__bg">
          <img src="/images/worker.jpg" alt="Contact" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span className="page-hero__label label-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Get In Touch
          </motion.span>
          <motion.h1 className="page-hero__heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Let's grow something together.
          </motion.h1>
        </div>
      </section>

      <section className="section-padding contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Form & Social Links */}
            <div>
              <Reveal>
                <h2 className="heading-md" style={{ marginBottom: '0.75rem' }}>Send an Enquiry</h2>
                <p style={{ color: '#6a6a6a', marginBottom: '2rem', lineHeight: 1.65 }}>
                  Tell us about your plant needs, land and location. We'll get back to you with practical advice.
                </p>
              </Reveal>

              {submitted ? (
                <motion.div
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="contact-success__icon">🌱</span>
                  <h3>Thank you for reaching out.</h3>
                  <p>We've received your enquiry and will be in touch shortly.</p>
                </motion.div>
              ) : (
                <Reveal delay={0.1}>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} required placeholder="Your name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" className="form-input" value={form.phone} onChange={handleChange} required placeholder="Your phone number" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} placeholder="Your email address" />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input id="location" name="location" type="text" className="form-input" value={form.location} onChange={handleChange} placeholder="City / District" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="requirement">Plant Requirement</label>
                        <select id="requirement" name="requirement" className="form-select" value={form.requirement} onChange={handleChange}>
                          <option value="">Select a category</option>
                          <option>Fruit Plants</option>
                          <option>Coconut Saplings</option>
                          <option>Vegetable Seedlings</option>
                          <option>Native Trees</option>
                          <option>Timber Plantation</option>
                          <option>Mixed Plantation</option>
                          <option>Other / Not Sure</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="farmSize">Farm Size (approx.)</label>
                        <input id="farmSize" name="farmSize" type="text" className="form-input" value={form.farmSize} onChange={handleChange} placeholder="e.g. 2 acres, 500 sq m" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Message</label>
                      <textarea id="message" name="message" className="form-textarea" value={form.message} onChange={handleChange} placeholder="Tell us about your project or requirements..." />
                    </div>
                    <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Send Enquiry <ArrowRight size={16} />
                    </button>
                  </form>
                </Reveal>
              )}

              {/* Social Media Connect Box */}
              <Reveal delay={0.2}>
                <div className="contact-social-box">
                  <h3 className="contact-social-title">Connect With Us</h3>
                  <p className="contact-social-subtitle">Follow our nursery updates, farm stories & fresh plant arrivals.</p>
                  <div className="contact-social-links">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--instagram">
                      <InstagramIcon />
                      <span>Instagram</span>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--facebook">
                      <FacebookIcon />
                      <span>Facebook</span>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--youtube">
                      <YoutubeIcon />
                      <span>YouTube</span>
                    </a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--whatsapp">
                      <WhatsappIcon />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Banner, Info Cards & Google Map */}
            <div>
              <Reveal className="contact-img">
                <img src="/images/nursery-wide.jpg" alt="NATIVERA nursery" loading="lazy" />
              </Reveal>

              <Reveal delay={0.15}>
                <div className="contact-info-cards">
                  <div className="contact-info-card">
                    <MapPin size={18} />
                    <div>
                      <strong>Location</strong>
                      <p>South India Growing Region<br />Serving Tamil Nadu, Karnataka, Kerala & Andhra Pradesh</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <Phone size={18} />
                    <div>
                      <strong>Phone & Enquiry</strong>
                      <p>+91 98765 43210 / Enquiry Line Available Mon-Sat</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <Mail size={18} />
                    <div>
                      <strong>Email</strong>
                      <p>hello@nativera.in</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <Clock size={18} />
                    <div>
                      <strong>Nursery Hours</strong>
                      <p>Mon - Sat: 8:00 AM - 6:00 PM<br />Sunday: Closed for maintenance</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Google Map Section */}
              <Reveal delay={0.3}>
                <div className="contact-map-card">
                  <div className="contact-map-header">
                    <div className="contact-map-header__title">
                      <MapPin size={18} />
                      <span>Nursery Location Map</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-map-badge"
                    >
                      Get Directions <ExternalLink size={13} />
                    </a>
                  </div>
                  <iframe
                    title="NATIVERA Nursery Google Map Location"
                    className="contact-map-iframe"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3262793139366!2d76.955832!3d11.016844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1081e1844e19!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
