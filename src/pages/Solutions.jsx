import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './SharedPages.css';

const SOLUTIONS = [
  {
    id: 'orchard',
    title: 'Fruit Orchard Planning',
    image: '/images/1.png',
    desc: 'Plan and establish fruit orchards with selected mango, guava, lemon and dragon fruit varieties. We advise on spacing, variety selection and early care to ensure productive orchards.',
    plants: ['Mango Sapling', 'Guava Sapling', 'Lemon Sapling', 'Dragon Fruit'],
    slug: 'orchard',
  },
  {
    id: 'coconut',
    title: 'Coconut Plantation',
    image: '/images/4.png',
    desc: 'Establish coconut plantations with selected dwarf seedlings suited to your land type. Guidance on spacing, soil preparation, drip irrigation and nutrient management.',
    plants: ['Dwarf Coconut Sapling'],
    slug: 'coconut',
  },
  {
    id: 'timber',
    title: 'Timber & Teak Forestry',
    image: '/images/5.png',
    desc: 'Teak wood, mahogany and red sandalwood plantations for long-term high value investment and ecological boundary protection.',
    plants: ['Teak Wood Sapling', 'Red Sandalwood', 'Mahogany'],
    slug: 'timber',
  },
  {
    id: 'vegetable',
    title: 'Vegetable Cultivation',
    image: '/images/6.png',
    desc: 'Healthy seedlings for commercial vegetable cultivation. We prepare seedlings in controlled nursery conditions, ready for field transplantation.',
    plants: ['Hybrid Tomato', 'Chilli Seedling Tray', 'Brinjal'],
    slug: 'vegetable',
  },
  {
    id: 'mixed',
    title: 'Mixed Agroforestry System',
    image: '/images/9.png',
    desc: 'Combine fruit trees, coconut, native species and vegetables in an integrated farming layout that maximizes yield and soil health.',
    plants: ['Multiple Plant Types'],
    slug: 'mixed',
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

export default function Solutions() {
  return (
    <PageWrapper>
      <section className="page-hero">
        <div className="page-hero__bg">
          <img src="/images/plantation.jpg" alt="Solutions" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span className="page-hero__label label-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Plantation Solutions
          </motion.span>
          <motion.h1 className="page-hero__heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Planting solutions built around your land.
          </motion.h1>
        </div>
      </section>

      {SOLUTIONS.map((sol, i) => (
        <section
          key={sol.id}
          className={`section-padding sol-section${i % 2 === 1 ? ' sol-section--alt' : ''}`}
        >
          <div className="container">
            <div className="sol-grid">
              <Reveal className="sol-img-wrap" delay={0.1}>
                <img src={sol.image} alt={sol.title} className="sol-img" loading="lazy" />
              </Reveal>
              <div className="sol-text">
                <Reveal>
                  <span className="label-sm sol-num">{String(i + 1).padStart(2, '0')}</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="sol-title">{sol.title}</h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="sol-desc">{sol.desc}</p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="sol-plants">
                    <span className="sol-plants__label">Recommended Plants:</span>
                    <div className="sol-plants__tags">
                      {sol.plants.map(p => <span key={p} className="sol-plant-tag">{p}</span>)}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.35}>
                  <Link to="/contact" className="btn btn--outline-dark">
                    Discuss This Solution <ArrowRight size={15} />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding dark-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal><h2 className="heading-lg">Ready to plan your plantation?</h2></Reveal>
          <Reveal delay={0.1}>
            <p style={{ color: 'rgba(248,245,239,0.65)', margin: '1rem 0 2rem', lineHeight: 1.7, maxWidth: 500, marginInline: 'auto' }}>
              Contact us to discuss your land, requirements and the right plants for your project.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="btn btn--cream">Start a Conversation <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
}
