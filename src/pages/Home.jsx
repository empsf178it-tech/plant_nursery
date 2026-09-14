import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, X, Eye } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import { getFeaturedPlants } from '../data/plants';
import './Home.css';

// ─── Reusable Reveal ─────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────
function Counter({ target, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const duration = 1800;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">
        {typeof target === 'number' ? `${count}${suffix}` : target}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Quick View Modal ─────────────────────────────────────────────
function QuickViewModal({ plant, onClose }) {
  if (!plant) return null;
  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-box"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
          <div className="modal-grid">
            <div className="modal-img-wrap">
              <img src={plant.image} alt={plant.name} className="modal-img" />
            </div>
            <div className="modal-body">
              <span className="live-badge" style={{ marginBottom: '0.75rem' }}>{plant.categoryLabel}</span>
              <h2 className="modal-title">{plant.name}</h2>
              <p className="modal-desc">{plant.shortDesc}</p>
              
              <div className="modal-details-list">
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Plant Type</span>
                  <span className="modal-detail-value">{plant.plantType}</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Growing Conditions</span>
                  <span className="modal-detail-value">{plant.growingConditions}</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Water Requirement</span>
                  <span className="modal-detail-value">{plant.waterRequirement}</span>
                </div>
              </div>

              <div className="modal-footer-actions">
                <Link to={`/plants/${plant.slug}`} className="btn btn--primary" onClick={onClose}>
                  View Full Care & Planting Guide <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Plant Card ──────────────────────────────────────────────────
function PlantCard({ plant, delay = 0, onQuickView }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="plant-card shimmer-card-effect"
    >
      <div className="plant-card__image-wrap">
        <motion.img 
          src={plant.image} 
          alt={plant.name} 
          className="plant-card__img" 
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="plant-card__overlay" />
        <button 
          className="plant-card__quick-btn" 
          onClick={() => onQuickView(plant)}
          title="Quick View"
          aria-label="Quick Preview"
        >
          <Eye size={16} /> Quick Preview
        </button>
      </div>
      <Link to={`/plants/${plant.slug}`} className="plant-card__link">
        <div className="plant-card__body">
          <span className="plant-card__cat">{plant.categoryLabel}</span>
          <h3 className="plant-card__name">{plant.name}</h3>
          <p className="plant-card__desc">{plant.shortDesc}</p>
          <span className="plant-card__cta">
            View Details <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ display: 'inline-flex' }}><ArrowRight size={14} /></motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────
const STORY_STAGES = [
  { 
    num: '01', 
    title: 'SELECT', 
    subtitle: 'Variety & Soil Compatibility',
    desc: 'We match sapling varieties to your soil type, water availability, and local micro-climate to ensure maximal growth potential and yield.', 
    image: '/images/mango.jpg', 
    tag: 'Variety Selection' 
  },
  { 
    num: '02', 
    title: 'NURTURE', 
    subtitle: 'Controlled Nursery Care',
    desc: 'Saplings grow under expert nursery care with precision micro-irrigation, shaded structures, and optimal organic plant nutrition.', 
    image: '/images/worker.jpg', 
    tag: 'Nursery Growth' 
  },
  { 
    num: '03', 
    title: 'PREPARE', 
    subtitle: 'Root Audits & Hardening',
    desc: 'Prior to delivery, plants undergo root health audits, bag trimming, and field hardening so they transition smoothly without transplant shock.', 
    image: '/images/nursery-wide.jpg', 
    tag: 'Field Readiness' 
  },
  { 
    num: '04', 
    title: 'PLANT', 
    subtitle: 'Field Spacing & Establishment',
    desc: 'Move saplings into your field with our guidance on pit layout, spacing recommendations, initial organic fertilization, and watering.', 
    image: '/images/plantation.jpg', 
    tag: 'Field Planting' 
  },
];

const COLLECTION_CARDS = [
  { title: 'Fruit Plants', desc: 'Mango, guava, lemon and other fruit saplings for orchards.', image: '/images/1.png', cat: 'fruit' },
  { title: 'Plantation Crops', desc: 'Coconut, timber, red sandalwood and other plantation-ready species.', image: '/images/4.png', cat: 'plantation' },
  { title: 'Vegetable Seedlings', desc: 'Healthy seedling trays for commercial agricultural cultivation.', image: '/images/6.png', cat: 'vegetable' },
  { title: 'Native Trees', desc: 'Selected native tree species for agroforestry and shade.', image: '/images/9.png', cat: 'native' },
  { title: 'Garden & Flowering', desc: 'Selected ornamental, fragrant jasmine and flowering plants.', image: '/images/27.png', cat: 'flowering' },
];

const PLANTATION_OPTIONS = [
  { label: 'Fruit Orchard', icon: '🌿' },
  { label: 'Coconut Plantation', icon: '🌴' },
  { label: 'Timber Plantation', icon: '🪵' },
  { label: 'Mixed Farming', icon: '🌱' },
];

const CARE_CARDS = [
  { title: 'Water', desc: 'Adequate moisture at the right intervals is critical during the first 90 days.', icon: '💧' },
  { title: 'Soil', desc: 'Good soil preparation before planting supports strong root establishment.', icon: '🌍' },
  { title: 'Nutrition', desc: 'Balanced nutrients help saplings transition from nursery to field.', icon: '🌾' },
  { title: 'Protection', desc: 'Monitoring for pests and stress in early growth prevents long-term damage.', icon: '🛡' },
];

// ─── Interactive Plantation Calculator ─────────────────────────
function PlantationCalculator() {
  const [acres, setAcres] = useState(5);
  const [selectedCrop, setSelectedCrop] = useState('mango');

  const CROPS = [
    { id: 'mango', name: 'Alphonso Mango', density: 100, spacing: '6m × 6m', image: '/images/1.png' },
    { id: 'coconut', name: 'Dwarf Coconut', density: 60, spacing: '8m × 8m', image: '/images/4.png' },
    { id: 'guava', name: 'Pink Guava', density: 250, spacing: '4m × 4m', image: '/images/2.png' },
    { id: 'teak', name: 'Teak Timber', density: 400, spacing: '3m × 3m', image: '/images/5.png' },
    { id: 'vegetable', name: 'Hybrid Tomatoes', density: 8000, spacing: '45cm × 60cm', image: '/images/6.png' },
  ];

  const cropObj = CROPS.find(c => c.id === selectedCrop) || CROPS[0];
  const totalSaplings = acres * cropObj.density;

  return (
    <motion.div 
      className="calc-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="calc-header">
        <span className="live-badge"><span className="live-badge__dot"></span> Interactive Plantation Estimator</span>
        <h3 className="calc-title">Calculate Sapling Requirements for Your Land</h3>
      </div>
      <div className="calc-grid">
        <div className="calc-controls">
          <label className="calc-label">1. Select Variety</label>
          <div className="calc-crop-pills">
            {CROPS.map(c => (
              <button
                key={c.id}
                type="button"
                className={`calc-pill${selectedCrop === c.id ? ' calc-pill--active' : ''}`}
                onClick={() => setSelectedCrop(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <label className="calc-label" style={{ marginTop: '1.75rem' }}>
            2. Land Acreage: <strong className="calc-acre-highlight">{acres} {acres === 1 ? 'Acre' : 'Acres'}</strong>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={acres}
            onChange={(e) => setAcres(Number(e.target.value))}
            className="calc-range"
          />
          <div className="calc-range-labels">
            <span>1 Acre</span>
            <span>25 Acres</span>
            <span>50 Acres</span>
          </div>
        </div>

        <div className="calc-results">
          <div className="calc-preview-img-wrap">
            <motion.img 
              key={cropObj.id}
              src={cropObj.image} 
              alt={cropObj.name} 
              className="calc-preview-img"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="calc-stat-box">
            <span className="calc-stat-label">Estimated Saplings Needed</span>
            <motion.div key={totalSaplings} className="calc-stat-value" initial={{ scale: 1.1 }} animate={{ scale: 1 }}>
              {totalSaplings.toLocaleString()}
            </motion.div>
            <div className="calc-stat-sub">Recommended Spacing: <strong>{cropObj.spacing}</strong></div>
          </div>
          <Link to={`/contact`} className="btn btn--primary calc-cta">
            Request Nursery Reservation <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Nursery Journey Component ─────────────────────────────
function NurseryJourneySection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STORY_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const current = STORY_STAGES[activeStage];

  return (
    <section className="nursery-journey-section dark-section section-padding" id="story">
      <div className="container">
        <div className="journey-header">
          <Reveal>
            <span className="live-badge" style={{ background: 'rgba(248,245,239,0.1)', color: 'var(--color-warm-cream)', borderColor: 'rgba(248,245,239,0.2)' }}>
              <span className="live-badge__dot" style={{ background: '#4caf50' }}></span> Nursery To Field Process
            </span>
            <h2 className="heading-lg" style={{ marginTop: '0.75rem' }}>From Nursery to Field</h2>
            <p className="journey-header__sub">Four deliberate steps to guarantee your plants transition seamlessly into strong, healthy plantations.</p>
          </Reveal>
        </div>

        {/* Navigation Tabs */}
        <div className="journey-tabs">
          {STORY_STAGES.map((stage, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={stage.num}
                type="button"
                className={`journey-tab ${isActive ? 'journey-tab--active' : ''}`}
                onClick={() => {
                  setActiveStage(idx);
                  setIsAutoPlaying(false);
                }}
              >
                <span className="journey-tab__num">{stage.num}</span>
                <span className="journey-tab__title">{stage.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="journeyTabIndicator"
                    className="journey-tab__active-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Content Card */}
        <div 
          className="journey-card"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="journey-card__grid">
            <div className="journey-card__image-side">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="journey-card__image-frame"
                >
                  <img src={current.image} alt={current.title} className="journey-card__img" />
                  <div className="journey-card__image-badge">{current.tag}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="journey-card__text-side">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="journey-card__info"
                >
                  <span className="journey-card__step-tag">Step {current.num} of 04</span>
                  <h3 className="journey-card__stage-title">{current.title}</h3>
                  <h4 className="journey-card__subtitle">{current.subtitle}</h4>
                  <p className="journey-card__desc">{current.desc}</p>
                </motion.div>
              </AnimatePresence>

              <div className="journey-card__footer">
                <div className="journey-nav-btns">
                  <button
                    type="button"
                    className="journey-nav-btn"
                    onClick={() => {
                      setActiveStage((prev) => (prev === 0 ? STORY_STAGES.length - 1 : prev - 1));
                      setIsAutoPlaying(false);
                    }}
                    aria-label="Previous step"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="journey-nav-btn"
                    onClick={() => {
                      setActiveStage((prev) => (prev + 1) % STORY_STAGES.length);
                      setIsAutoPlaying(false);
                    }}
                    aria-label="Next step"
                  >
                    →
                  </button>
                </div>
                <Link to="/solutions" className="btn btn--cream">
                  Plan Plantation <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featuredPlants = getFeaturedPlants();
  const [quickPlant, setQuickPlant] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageWrapper>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" ref={heroRef} id="hero">
        <motion.div className="hero__bg" style={{ scale: heroScale }}>
          <img src="/images/hero.jpg" alt="NATIVERA nursery" className="hero__img" />
          <div className="hero__overlay" />
        </motion.div>

        <motion.div className="hero__content" style={{ opacity: heroOpacity }}>
          <div className="container">
            <motion.span
              className="hero__label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Agricultural Nursery · South India
            </motion.span>

            <div className="hero__heading-wrap">
              {['Grow What', 'Matters.'].map((line, i) => (
                <div key={i} className="hero__heading-line">
                  <motion.h1
                    className="hero__heading"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8 }}
            >
              Healthy plants, dependable saplings and practical plantation solutions for the next generation of farms.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
            >
              <Link to="/plants" className="btn btn--primary">
                Explore Plants <ArrowRight size={16} />
              </Link>
              <Link to="/solutions" className="btn btn--ghost">
                Plan Your Plantation
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} color="rgba(248,245,239,0.6)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────── */}
      <div className="marquee" aria-hidden>
        <motion.div
          className="marquee__track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        >
          {Array(4).fill('SAPLINGS · SEEDLINGS · PLANTATIONS · NURSERY · FARM SOLUTIONS · PLANT CARE · ').map((t, i) => (
            <span key={i} className="marquee__text">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* ── INTRODUCTION ──────────────────────────────────── */}
      <section className="section-padding intro-section">
        <div className="container">
          <div className="intro__grid">
            <div className="intro__text">
              <Reveal>
                <span className="label-sm intro__label">Rooted in Real Agriculture</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="intro__heading">A healthy plantation starts with the right beginning.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="intro__body">
                  The quality of a sapling can influence the early stages of a plantation. NATIVERA brings together carefully selected plants, practical growing knowledge and field-focused support to help farmers and landowners establish healthy, productive plantations.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link to="/about" className="btn btn--outline-dark">
                  Our Story <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="intro__image-wrap">
              <div className="intro__image-frame">
                <img src="/images/macro-leaf.jpg" alt="Healthy plant close-up" className="intro__image" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PLANT COLLECTION SCROLL ───────────────────────── */}
      <section className="section-padding collection-section">
        <div className="collection__header container">
          <Reveal>
            <h2 className="heading-lg">Choose Your Next Growth.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/plants" className="btn btn--outline-dark">
              View All Plants <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="collection__scroll">
          {COLLECTION_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="collection-card"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/plants?cat=${card.cat}`} className="collection-card__link">
                <div className="collection-card__img-wrap">
                  <img src={card.image} alt={card.title} className="collection-card__img" loading="lazy" />
                </div>
                <div className="collection-card__body">
                  <h3 className="collection-card__title">{card.title}</h3>
                  <p className="collection-card__desc">{card.desc}</p>
                  <span className="collection-card__cta">Explore <ArrowRight size={13} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PLANTS GRID ──────────────────────────── */}
      <section className="section-padding featured-section">
        <div className="container">
          <Reveal>
            <span className="label-sm" style={{ color: 'var(--color-soft-sage)' }}>From Our Nursery</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg" style={{ marginTop: '0.5rem', marginBottom: '3rem' }}>Featured Plants</h2>
          </Reveal>
          <div className="featured-grid">
            {featuredPlants.map((plant, i) => (
              <PlantCard key={plant.slug} plant={plant} delay={i * 0.08} onQuickView={(p) => setQuickPlant(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal plant={quickPlant} onClose={() => setQuickPlant(null)} />

      {/* ── NURSERY JOURNEY SECTION ────────────────────────── */}
      <NurseryJourneySection />

      {/* ── REAL NURSERY FEATURE SHOWCASE ─────────────────── */}
      <section className="nursery-fullwidth" id="nursery-cta">
        <div className="nursery-fullwidth__bg">
          <img src="/images/nursery-wide.jpg" alt="NATIVERA nursery facility" className="nursery-fullwidth__img" loading="lazy" />
          <div className="nursery-fullwidth__overlay" />
        </div>

        <div className="nursery-fullwidth__content container">
          <div className="nursery-fullwidth__top">
            <Reveal>
              <span className="live-badge" style={{ background: 'rgba(248,245,239,0.15)', color: 'var(--color-warm-cream)', borderColor: 'rgba(248,245,239,0.3)' }}>
                <span className="live-badge__dot" style={{ background: '#81c784' }}></span> State-of-the-Art Nursery Facility
              </span>
              <h2 className="nursery-fullwidth__heading">Where every plant gets its start.</h2>
              <p className="nursery-fullwidth__sub">
                Spanning over 25+ acres, our nursery combines controlled shade-net propagation, precision drip fertigation, and mother-tree root auditing to produce resilient saplings for commercial farms and orchards.
              </p>
            </Reveal>
          </div>

          <div className="nursery-fullwidth__grid">
            <Reveal delay={0.1}>
              <div className="nursery-feat-card">
                <div className="nursery-feat-icon">🌿</div>
                <h3 className="nursery-feat-title">Shade-Net Propagation</h3>
                <p className="nursery-feat-desc">Controlled environment shielding young saplings from extreme heat and moisture stress.</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="nursery-feat-card">
                <div className="nursery-feat-icon">💧</div>
                <h3 className="nursery-feat-title">Micro-Drip Irrigation</h3>
                <p className="nursery-feat-desc">Precision water and organic nutrient delivery directly to root zones for robust stem density.</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="nursery-feat-card">
                <div className="nursery-feat-icon">🛡️</div>
                <h3 className="nursery-feat-title">Hardened Mother-Stock</h3>
                <p className="nursery-feat-desc">Grafted from high-yield lineage with field hardening prior to dispatch for 95%+ survival rates.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4} className="nursery-fullwidth__actions">
            <Link to="/nursery" className="btn btn--cream">
              Explore Our Nursery <ArrowRight size={16} />
            </Link>
            <div className="nursery-stat-pill">
              <span className="nursery-stat-pill__dot"></span>
              <strong>500,000+</strong> Saplings Grown Annually
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PLANTATION PLANNING DARK SECTION ─────────────── */}
      <section className="section-padding planning-section dark-section">
        {/* Floating background particles */}
        <div className="floating-leaf floating-leaf--1" style={{ top: '10%', right: '5%' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(248,245,239,0.2)" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        </div>
        <div className="floating-leaf floating-leaf--2" style={{ bottom: '10%', left: '3%' }}>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgba(248,245,239,0.15)" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        </div>

        <div className="container">
          <Reveal>
            <span className="live-badge" style={{ background: 'rgba(248,245,239,0.1)', color: 'var(--color-warm-cream)', borderColor: 'rgba(248,245,239,0.2)' }}>
              <span className="live-badge__dot" style={{ background: '#4caf50' }}></span> Field Advisory & Calculator
            </span>
            <h2 className="heading-lg" style={{ marginTop: '0.75rem' }}>Planning a plantation?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="planning__sub">
              The right plant depends on your land acreage, water availability, soil type, and climate.
            </p>
          </Reveal>

          {/* Plantation Calculator */}
          <PlantationCalculator />

          <div className="planning__grid" style={{ marginTop: '4rem' }}>
            {PLANTATION_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.label}
                className="planning-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <span className="planning-card__icon">{opt.icon}</span>
                <h3 className="planning-card__label">{opt.label}</h3>
                <Link to="/solutions" className="planning-card__arrow">→</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FARMER STORY ──────────────────────────────────── */}
      <section className="section-padding farmer-section">
        <div className="container">
          <div className="farmer__grid">
            <Reveal className="farmer__image-wrap">
              <img src="/images/farmer.jpg" alt="South Indian farmer" className="farmer__img" loading="lazy" />
            </Reveal>
            <div className="farmer__text">
              <Reveal>
                <span className="label-sm" style={{ color: 'var(--color-muted-terracotta)' }}>Customer Story</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="farmer__heading">Growth doesn't stop at the nursery gate.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="farmer__body">
                  Choosing the right plant is only the first step. Good preparation, planting and aftercare help turn a sapling into a productive plantation. We support our customers through each stage of growth.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link to="/plant-care" className="btn btn--outline-dark">
                  Plant Care Guide <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANT CARE CARDS ──────────────────────────────── */}
      <section className="section-padding care-section">
        <div className="container">
          <Reveal>
            <span className="label-sm" style={{ color: 'var(--color-soft-sage)' }}>What makes a healthy plantation</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-md" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>Four pillars of plant care.</h2>
          </Reveal>
          <div className="care__grid">
            {CARE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                className="care-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4 }}
              >
                <span className="care-card__icon">{card.icon}</span>
                <h3 className="care-card__title">{card.title}</h3>
                <p className="care-card__desc">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="stats-section dark-section section-padding">
        <div className="container">
          <div className="stats__grid">
            <Counter target={50} suffix="+" label="Plant Varieties" />
            <Counter target={10} suffix="+" label="Years of Nursery Experience" />
            <Counter target={1000} suffix="+" label="Farm & Garden Customers" />
            <div className="stat-item">
              <div className="stat-number stat-number--text">South India</div>
              <div className="stat-label">Growing Region</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="final-cta" id="final-cta">
        <div className="final-cta__bg">
          <motion.img
            src="/images/plantation.jpg"
            alt="Plantation"
            className="final-cta__img"
            style={{ scale: useTransform(
              useScroll({ offset: ['start end', 'end start'] }).scrollYProgress,
              [0, 1], [1, 1.12]
            ) }}
          />
          <div className="final-cta__overlay" />
        </div>
        <div className="final-cta__content container">
          <Reveal>
            <h2 className="final-cta__heading">Start with something that grows.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="final-cta__sub">Explore our plants and find the right starting point for your farm or plantation.</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="final-cta__actions">
              <Link to="/plants" className="btn btn--cream">Explore Plants <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn--ghost-light">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
}
