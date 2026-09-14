import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Plants.css';
import './SharedPages.css';

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const STAGES = [
  { title: 'Propagation', desc: 'Seeds and cuttings are carefully selected and propagated in controlled nursery conditions to ensure strong initial germination and root development.', image: '/images/6.png' },
  { title: 'Seedling Care', desc: 'Young seedlings are monitored daily — watering schedules are maintained, weak plants are removed, and healthy growth is encouraged.', image: '/images/1.png' },
  { title: 'Irrigation & Moisture Control', desc: 'Drip and sprinkler irrigation systems maintain consistent moisture levels across the nursery, preventing water stress and overwatering.', image: '/images/4.png' },
  { title: 'Plant Nutrition & Soil Management', desc: 'Appropriate organic fertiliser applications support healthy foliage and root growth during the nursery phase.', image: '/images/9.png' },
  { title: 'Sunlight Hardening', desc: 'Plants are gradually exposed to open field sunlight conditions before dispatch, reducing transplantation shock.', image: '/images/13.png' },
  { title: 'Dispatch & Packing', desc: 'Plants are checked for root health, root-ball trimmed, labelled and prepared for safe transport to your farm.', image: '/images/14.png' },
];

export default function Nursery() {
  return (
    <PageWrapper>
      <section className="page-hero">
        <div className="page-hero__bg">
          <img src="/images/nursery-wide.jpg" alt="Nursery" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span className="page-hero__label label-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Our Nursery
          </motion.span>
          <motion.h1 className="page-hero__heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            See where the plants begin.
          </motion.h1>
        </div>
      </section>



      <section className="section-padding" style={{ background: 'var(--color-warm-cream)' }}>
        <div className="container">
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.title}
              className={`nursery-stage${i % 2 !== 0 ? ' nursery-stage--alt' : ''}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="nursery-stage__img">
                <img src={stage.image} alt={stage.title} loading="lazy" />
              </div>
              <div className="nursery-stage__text">
                <div className="nursery-stage__num">{String(i + 1).padStart(2, '0')}</div>
                <h2 className="nursery-stage__title">{stage.title}</h2>
                <p className="nursery-stage__desc">{stage.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding dark-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal><h2 className="heading-lg">Interested in visiting our nursery?</h2></Reveal>
          <Reveal delay={0.1}>
            <p style={{ color: 'rgba(248,245,239,0.65)', margin: '1rem auto 2rem', lineHeight: 1.7, maxWidth: 500 }}>
              Contact us to arrange a visit or discuss your plant requirements directly with our nursery team.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="btn btn--cream">Contact Our Nursery <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
}
