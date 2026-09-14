import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Plants.css';
import './SharedPages.css';

const PROJECTS = [
  {
    title: 'Mango Orchard — 10 Acres',
    type: 'Fruit Orchard',
    image: './images/1.png',
    desc: 'Grafted Alphonso mango saplings supplied and planned for a 10-acre commercial orchard development.',
  },
  {
    title: 'Coconut Plantation — 5 Acres',
    type: 'Coconut Plantation',
    image: './images/4.png',
    desc: 'Malayan Dwarf coconut saplings prepared in our nursery for field planting in coastal soil conditions.',
  },
  {
    title: 'Commercial Vegetable Plot',
    type: 'Vegetable Cultivation',
    image: './images/6.png',
    desc: 'Hybrid tomato and chilli seedling trays prepared for seasonal high-yield commercial cultivation.',
  },
  {
    title: 'Red Sandalwood & Agroforestry',
    type: 'Native & Timber Forestry',
    image: './images/9.png',
    desc: 'Red Sandalwood and native timber trees supplied for mixed agroforestry across farmland boundaries.',
  },
  {
    title: 'High-Yield Pomegranate Orchard',
    type: 'Mixed Fruit Orchard',
    image: './images/11.png',
    desc: 'Bhagwa pomegranate saplings combined with guava and lemon for a high-density 3-acre fruit farm.',
  },
  {
    title: 'Nursery Infrastructure & Shade House',
    type: 'Nursery Development',
    image: './images/nursery-wide.jpg',
    desc: 'Internal nursery expansion with climate-controlled shade-net structures to boost production capacity.',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Land & Soil Assessment',
    desc: 'We evaluate land acreage, soil chemistry, water availability, and local micro-climate before recommending plant species.',
  },
  {
    num: '02',
    title: 'Custom Nursery Batching',
    desc: 'High-yielding rootstocks and tissue culture saplings are hardened and batched specifically for your project timeline.',
  },
  {
    num: '03',
    title: 'Field Layout & Spacing',
    desc: 'Guidance on optimal pit dimensions, spacing charts, intercropping layouts, and organic soil preparation.',
  },
  {
    num: '04',
    title: 'Growth & Field Advisory',
    desc: 'Post-plantation support including watering schedules, early-phase pruning, and pest management guidance.',
  },
];

const IMPACT_METRICS = [
  { val: '1,200+', label: 'Acres Planted', sub: 'Across South Indian agricultural zones' },
  { val: '96%+', label: 'Sapling Survival Rate', sub: 'Thanks to nursery hardening & care' },
  { val: '250+', label: 'Commercial Orchards', sub: 'Mango, Guava, Coconut & Timber plots' },
  { val: '100%', label: 'Certified Nursery Stock', sub: 'Bred under strict quality controls' },
];

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <PageWrapper>
      <section className="page-hero">
        <div className="page-hero__bg">
          <img src="./images/plantation.jpg" alt="Projects" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span className="page-hero__label label-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Our Projects
          </motion.span>
          <motion.h1 className="page-hero__heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            From young plants to growing farms.
          </motion.h1>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="section-padding" style={{ background: 'var(--color-warm-cream)' }}>
        <div className="container">
          <div className="projects-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.title}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="project-card__img-wrap">
                  <img src={proj.image} alt={proj.title} className="project-card__img" loading="lazy" />
                </div>
                <div className="project-card__body">
                  <span className="project-card__type">{proj.type}</span>
                  <h3 className="project-card__name">{proj.title}</h3>
                  <p className="project-card__desc">{proj.desc}</p>
                  <Link to="/contact" className="project-card__cta">
                    Discuss Similar Project <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW SECTION 1: Project Execution Process ── */}
      <section className="section-padding project-process">
        <div className="container">
          <Reveal>
            <span className="label-sm" style={{ color: 'var(--color-muted-terracotta)', display: 'block', marginBottom: '0.5rem' }}>
              Structured Methodology
            </span>
            <h2 className="heading-md">How We Execute Plantation Projects</h2>
          </Reveal>

          <div className="project-process__grid">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="project-process-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="project-process-step__num">{step.num}</div>
                <h3 className="project-process-step__title">{step.title}</h3>
                <p className="project-process-step__desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW SECTION 2: Project Impact Metrics ── */}
      <section className="section-padding project-impact">
        <div className="container">
          <Reveal>
            <span className="label-sm" style={{ color: 'var(--color-soft-sage)', display: 'block', marginBottom: '0.5rem' }}>
              Proven Regional Track Record
            </span>
            <h2 className="heading-md">Project Scale & Field Performance</h2>
          </Reveal>

          <div className="project-impact__grid">
            {IMPACT_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="project-impact-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="project-impact-card__val">{metric.val}</div>
                <div className="project-impact-card__label">{metric.label}</div>
                <div className="project-impact-card__sub">{metric.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding dark-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal><h2 className="heading-lg">Have a project in mind?</h2></Reveal>
          <Reveal delay={0.15}>
            <p style={{ color: 'rgba(248,245,239,0.65)', margin: '1rem auto 2rem', lineHeight: 1.7, maxWidth: 500 }}>
              Tell us about your land and planting goals. We'll advise on the right plants and approach for your project.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link to="/contact" className="btn btn--cream">Start a Project Conversation <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
}
