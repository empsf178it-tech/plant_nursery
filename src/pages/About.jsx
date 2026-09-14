import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Plants.css';
import './SharedPages.css';

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const VALUES = [
  {
    icon: '💎',
    label: 'Quality Selection',
    desc: 'We select healthy planting material and maintain nursery standards that result in consistently strong saplings.',
  },
  {
    icon: '🤝',
    label: 'Farmer Trust',
    desc: 'Farmers and landowners rely on NATIVERA for honest advice, transparent pricing and dependable plant supply.',
  },
  {
    icon: '🧠',
    label: 'Agricultural Knowledge',
    desc: 'Our agronomy team understands local growing conditions, crop requirements and practical farm realities.',
  },
  {
    icon: '🌿',
    label: 'Responsible Growing',
    desc: 'We promote sustainable, eco-conscious growing practices suitable for local South Indian micro-climates.',
  },
  {
    icon: '💬',
    label: 'Customer Support',
    desc: 'From plant selection to early establishment, we support customers throughout the 180-day growth process.',
  },
  {
    icon: '📍',
    label: 'Regional Adaptability',
    desc: 'Breeding and hardening crop varieties specifically for high resilience in regional red, loam and sandy soils.',
  },
];

const INFRASTRUCTURE_PILLARS = [
  {
    icon: '🏡',
    title: 'Protected Polyhouses',
    desc: 'Climate-controlled propagation shade houses for delicate grafted fruit saplings and seedling trays.',
  },
  {
    icon: '🔬',
    title: 'Certified Mother Stocks',
    desc: 'Parent plant stock sourced exclusively from accredited agricultural research stations to guarantee genetic purity.',
  },
  {
    icon: '💧',
    title: 'Micro-Drip Irrigation',
    desc: 'Precision fertigation and misting systems ensuring consistent moisture without root fungal stagnation.',
  },
  {
    icon: '☀️',
    title: 'Outdoor Hardening Yard',
    desc: 'Pre-dispatch outdoor sun exposure zone so saplings adapt smoothly to open-field transplanting conditions.',
  },
];

const EXPERTISE_HIGHLIGHTS = [
  {
    icon: '🚜',
    title: '10+ Years Regional Experience',
    desc: 'Deep hands-on agricultural expertise across Tamil Nadu, Karnataka, Andhra Pradesh and Kerala soil belts.',
  },
  {
    icon: '📋',
    title: 'Custom Acreage Planning',
    desc: 'Free advisory on spacing layouts, pit dimensions, companion intercropping, and irrigation line mapping.',
  },
  {
    icon: '🚚',
    title: 'Safe Field Delivery',
    desc: 'Custom-built protective transport crates ensuring zero stem breakage or root disturbance during transit.',
  },
];

export default function About() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img src="/images/farmer.jpg" alt="About NATIVERA" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span
            className="page-hero__label label-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About NATIVERA
          </motion.span>
          <motion.h1
            className="page-hero__heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Rooted in plants. Focused on farmers.
          </motion.h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding about-story">
        <div className="container">
          <div className="about-grid">
            <Reveal className="about-img">
              <img src="/images/nursery-wide.jpg" alt="Our nursery" loading="lazy" />
            </Reveal>
            <div>
              <Reveal>
                <span
                  className="label-sm"
                  style={{ color: 'var(--color-muted-terracotta)', display: 'block', marginBottom: '1rem' }}
                >
                  Our Story
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="about-heading">A nursery built around real agricultural needs.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="about-body">
                  NATIVERA was established with a clear focus: to supply healthy, reliable planting material to the farmers, landowners and agricultural professionals of South India. We recognised that many growers were working with inconsistent plant quality — and that better nursery practices could make a meaningful difference to their results.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="about-body">
                  Our nursery began with a small selection of fruit saplings and vegetable seedlings. Over time, we expanded our range to include coconut saplings, native trees, timber species and plantation plants — building each part of the business around what our customers actually needed in the field.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="about-body">
                  Today, NATIVERA operates as a modern commercial nursery combining traditional agricultural knowledge with improved nursery practices. We serve farmers, plantation owners, institutional buyers and smallholder growers across South India.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW SECTION 1: Nursery Infrastructure & Quality ── */}
      <section className="section-padding" style={{ background: 'var(--color-warm-cream)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container">
          <Reveal>
            <span className="label-sm" style={{ color: 'var(--color-muted-terracotta)', display: 'block', marginBottom: '0.5rem' }}>
              Facility & Standards
            </span>
            <h2 className="heading-md">Nursery Infrastructure & Quality Assurance</h2>
          </Reveal>

          <div className="about-infra-grid">
            {INFRASTRUCTURE_PILLARS.map((item, i) => (
              <motion.div
                key={item.title}
                className="about-infra-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="about-infra-card__icon">{item.icon}</span>
                <h3 className="about-infra-card__title">{item.title}</h3>
                <p className="about-infra-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding dark-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="label-sm" style={{ color: 'var(--color-soft-sage)', display: 'block', marginBottom: '1.5rem' }}>
              Our Philosophy
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg" style={{ maxWidth: 750, margin: '0 auto 2rem' }}>
              Select Carefully. Nurture Properly. Grow Responsibly.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                color: 'rgba(248,245,239,0.7)',
                maxWidth: 600,
                margin: '0 auto',
                lineHeight: 1.75,
                fontSize: '1.0625rem',
              }}
            >
              These three principles guide everything we do — from selecting the varieties we propagate to how we prepare plants for dispatch and advise customers on establishment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── NEW SECTION 2: Why South Indian Farmers Choose NATIVERA ── */}
      <section className="section-padding dark-section" style={{ background: '#0e2417', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center' }}>
              <span className="label-sm" style={{ color: 'var(--color-soft-sage)', display: 'block', marginBottom: '0.5rem' }}>
                Field Advantages
              </span>
              <h2 className="heading-md" style={{ color: 'var(--color-warm-cream)' }}>
                Why Growers Trust NATIVERA
              </h2>
            </div>
          </Reveal>

          <div className="about-expertise-grid">
            {EXPERTISE_HIGHLIGHTS.map((exp, i) => (
              <motion.div
                key={exp.title}
                className="about-expertise-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="about-expertise-card__icon">{exp.icon}</span>
                <h3 className="about-expertise-card__title">{exp.title}</h3>
                <p className="about-expertise-card__desc">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid (Balanced 6 Cards with Rich Framer Motion Animations) */}
      <section className="section-padding about-values-section">
        <div className="container">
          <Reveal>
            <span
              className="label-sm"
              style={{ color: 'var(--color-muted-terracotta)', display: 'block', marginBottom: '0.5rem' }}
            >
              What We Stand For
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg" style={{ marginBottom: '3.5rem' }}>
              Our Guiding Values & Commitments
            </h2>
          </Reveal>

          <div className="about-values-grid">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.label}
                className="about-value-card"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                <div>
                  <div className="about-value-card__top">
                    <div className="about-value-card__icon-wrap">{val.icon}</div>
                    <div className="about-value-card__num">{String(i + 1).padStart(2, '0')}</div>
                  </div>
                  <h3 className="about-value-card__title">{val.label}</h3>
                </div>
                <p className="about-value-card__desc">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding" style={{ background: 'var(--color-warm-cream)', textAlign: 'center' }}>
        <div className="container">
          <Reveal>
            <h2 className="heading-md">Let's grow something together.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link to="/plants" className="btn btn--primary">
                Explore Plants <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn btn--outline-dark">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
}
