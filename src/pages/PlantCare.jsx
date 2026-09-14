import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Plants.css';
import './SharedPages.css';

const CARE_CATEGORIES = [
  { id: 'all', label: 'All Pillars', icon: '🌿' },
  { id: 'prep', label: 'Pit & Soil Prep', icon: '🌍' },
  { id: 'watering', label: 'Irrigation & Moisture', icon: '💧' },
  { id: 'nutrition', label: 'Fertiliser & Organic', icon: '🌾' },
  { id: 'protection', label: 'Pest Defense', icon: '🛡️' },
  { id: 'pruning', label: 'Pruning & Training', icon: '✂️' },
];

const CARE_STEPS = [
  {
    num: '01',
    category: 'prep',
    icon: '🌍',
    title: 'Pit Preparation & Soil Aeration',
    desc: 'Dig pits at least 14 days before planting to allow sunlight solarisation. Add 5-10 kg of well-decomposed FYM or vermicompost mixed with topsoil. Avoid waterlogging zones.',
    tip: '💡 Recommended pit dimensions: 60×60×60 cm for fruit trees, 1×1×1 m for dwarf coconut.',
  },
  {
    num: '02',
    category: 'prep',
    icon: '🌱',
    title: 'Transplantation Technique',
    desc: 'Handle sapling bags gently without disturbing the root ball. Cut polybag side vertically. Align collar at ground surface level and firm soil smoothly around root zone.',
    tip: '💡 Water deeply immediately after planting to expel root-zone air pockets.',
  },
  {
    num: '03',
    category: 'watering',
    icon: '💧',
    title: 'Irrigation Schedule (First 90 Days)',
    desc: 'Newly transplanted saplings require consistent moisture in the root zone. Avoid dry stress and standing water. Drip irrigation is highly recommended for uniform water delivery.',
    tip: '💡 Water early morning or late evening for maximum soil retention & minimal evaporation.',
  },
  {
    num: '04',
    category: 'nutrition',
    icon: '🌾',
    title: 'Organic Fertilisation & Micro-nutrients',
    desc: 'Apply light doses of organic inputs 30 days after planting once roots begin searching. Avoid heavy chemical nitrogen during initial root establishment to prevent root burn.',
    tip: '💡 Bio-fertilisers like Azospirillum & Phosphobacteria enhance nutrient uptake.',
  },
  {
    num: '05',
    category: 'protection',
    icon: '🛡️',
    title: 'Pest & Disease Shielding',
    desc: 'Inspect leaf undersides and new shoots weekly. Spray neem oil (5ml/L) preventively for sucking pests. Maintain clean basin weed clearance around the trunk.',
    tip: '💡 Keep a 1-meter radius around the main trunk completely free of weeds and debris.',
  },
  {
    num: '06',
    category: 'pruning',
    icon: '✂️',
    title: 'Formative Pruning & Canopy Architecture',
    desc: 'Remove lower rootstock suckers emerging below the graft union. Pinch primary terminal growth at 3-4 feet height to encourage strong lateral branching.',
    tip: '💡 Always sterilise secateurs before pruning to prevent fungal pathogen transmission.',
  },
];

const TIMELINE_STEPS = [
  {
    period: 'Days 1 – 30',
    title: 'Transplant Shock & Rooting',
    desc: 'Daily light moisture, shade protection if sun is harsh, zero heavy chemical fertilisers.',
  },
  {
    period: 'Days 31 – 90',
    title: 'Vegetative Canopy Growth',
    desc: 'Starter organic doses, weeding basin maintenance, preventive bio-pesticide sprays.',
  },
  {
    period: 'Days 91 – 180',
    title: 'Formative Branch Training',
    desc: 'Prune rootstock suckers, pinch terminal shoot, establish drip lines for deep rooting.',
  },
  {
    period: 'Day 180+',
    title: 'Orchard Production Phase',
    desc: 'Seasonal micronutrient sprays, canopy management, transition to full yield care.',
  },
];

const FAQS = [
  {
    q: 'How long does transplant shock last for young saplings?',
    a: 'Most nursery saplings settle within 14 to 28 days after field planting, depending on moisture consistency, soil temperature, and root integrity during bag removal.',
  },
  {
    q: 'When should I start applying fertilisers after planting?',
    a: 'Wait 3 to 4 weeks after transplantation until new leaf flushes appear (indicating active root growth). Start with gentle organic compost or dilute seaweed extract.',
  },
  {
    q: 'What is the best irrigation method for commercial fruit orchards?',
    a: 'Drip irrigation with 2 drippers per plant (positioned 30-45 cm from trunk base) provides uniform moisture, saves 60% water, and eliminates weed growth around root zones.',
  },
  {
    q: 'How do I identify and remove rootstock suckers on grafted plants?',
    a: 'Check below the diagonal graft union line near soil level. Any shoots sprouting from the rootstock below the graft line must be cleanly pruned off immediately.',
  },
  {
    q: 'Do you offer field advisory for large plantation setup?',
    a: 'Yes, our agronomy team provides spacing charts, variety recommendations, and pit preparation guidance for large farm projects across South India.',
  },
];

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

export default function PlantCare() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredSteps =
    activeCategory === 'all'
      ? CARE_STEPS
      : CARE_STEPS.filter((step) => step.category === activeCategory);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img src="/images/macro-leaf.jpg" alt="Plant Care" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span
            className="page-hero__label label-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Plant Care & Growth Guide
          </motion.span>
          <motion.h1
            className="page-hero__heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Essential Pillars of Plantation Care
          </motion.h1>
        </div>
      </section>

      {/* Main Interactive Care Pillars */}
      <section className="section-padding care-page-wrap">
        <div className="container">
          {/* Category Tabs */}
          <div className="care-tabs">
            {CARE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`care-tab-btn${isActive ? ' care-tab-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <motion.div className="care-card-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="care-step-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  layout
                >
                  <div>
                    <div className="care-step-card__top">
                      <div className="care-step-card__icon-wrap">{step.icon}</div>
                      <span className="care-step-card__badge">{step.num}</span>
                    </div>
                    <h3 className="care-step-card__title">{step.title}</h3>
                    <p className="care-step-card__desc">{step.desc}</p>
                  </div>
                  <div className="care-step-card__tip">{step.tip}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 180-Day Establishment Roadmap */}
      <section className="section-padding care-timeline">
        <div className="container">
          <Reveal>
            <span
              className="label-sm"
              style={{ color: 'var(--color-muted-terracotta)', display: 'block', marginBottom: '0.5rem' }}
            >
              Field Roadmap
            </span>
            <h2 className="heading-md">The First 180 Days Care Timeline</h2>
          </Reveal>

          <div className="care-timeline__grid">
            {TIMELINE_STEPS.map((item, i) => (
              <motion.div
                key={item.period}
                className="care-timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="care-timeline-item__period">{item.period}</span>
                <h3 className="care-timeline-item__title">{item.title}</h3>
                <p className="care-timeline-item__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-padding" style={{ background: 'var(--color-warm-cream)' }}>
        <div className="container">
          <div style={{ maxWidth: 850, margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span
                  className="label-sm"
                  style={{ color: 'var(--color-soft-sage)', display: 'block', marginBottom: '0.5rem' }}
                >
                  Expert Advice
                </span>
                <h2 className="heading-md">Grower FAQs & Field Guidance</h2>
              </div>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {FAQS.map((faq, i) => {
                const isFaqOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    className="care-faq-card"
                    onClick={() => setOpenFaq(isFaqOpen ? null : i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: 'var(--color-deep-forest-green)',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                        }}
                      >
                        <CheckCircle2 size={18} color="var(--color-soft-sage)" />
                        {faq.q}
                      </h3>
                      <motion.div
                        animate={{ rotate: isFaqOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} color="var(--color-deep-forest-green)" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {isFaqOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p
                            style={{
                              marginTop: '1rem',
                              fontSize: '0.9375rem',
                              color: '#555',
                              lineHeight: 1.7,
                              paddingTop: '0.75rem',
                              borderTop: '1px solid rgba(0,0,0,0.06)',
                            }}
                          >
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Call to Action */}
      <section className="section-padding dark-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="heading-lg">Need custom advice for your plantation?</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              style={{
                color: 'rgba(248,245,239,0.7)',
                margin: '1.25rem auto 2.5rem',
                lineHeight: 1.7,
                maxWidth: 580,
                fontSize: '1.05rem',
              }}
            >
              Share your land details, soil type, and target crops with our agronomy team. We'll outline a tailored plant care schedule for your farm.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
              <Link to="/contact" className="btn btn--cream">
                Consult Our Agronomy Team <ArrowRight size={16} />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
}
