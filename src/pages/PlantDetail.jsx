import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Droplets, Sun, Leaf, MapPin } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import { getPlantBySlug, plants } from '../data/plants';
import './PlantDetail.css';

const JOURNEY_STEPS = ['Nursery', 'Preparation', 'Transplantation', 'Early Growth'];

export default function PlantDetail() {
  const { slug } = useParams();
  const plant = getPlantBySlug(slug);

  if (!plant) return <Navigate to="/plants" replace />;

  const related = plants.filter(p => p.category === plant.category && p.slug !== plant.slug).slice(0, 3);

  return (
    <PageWrapper>
      {/* Back nav */}
      <div className="detail-back container">
        <Link to="/plants" className="detail-back__link">
          <ArrowLeft size={15} /> All Plants
        </Link>
      </div>

      {/* Hero */}
      <section className="detail-hero">
        <div className="detail-hero__img-col">
          <motion.div
            className="detail-hero__img-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={plant.image} alt={plant.name} className="detail-hero__img" />
          </motion.div>
        </div>
        <div className="detail-hero__info-col">
          <motion.span
            className="detail-cat-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {plant.categoryLabel}
          </motion.span>
          <motion.h1
            className="detail-hero__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {plant.name}
          </motion.h1>
          <motion.p
            className="detail-hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {plant.shortDesc}
          </motion.p>

          {/* Info Grid */}
          <motion.div
            className="detail-info-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <div className="detail-info-item">
              <Leaf size={18} className="detail-info-icon" />
              <div>
                <span className="detail-info-label">Plant Type</span>
                <span className="detail-info-value">{plant.plantType}</span>
              </div>
            </div>
            <div className="detail-info-item">
              <MapPin size={18} className="detail-info-icon" />
              <div>
                <span className="detail-info-label">Application</span>
                <span className="detail-info-value">{plant.application}</span>
              </div>
            </div>
            <div className="detail-info-item">
              <Droplets size={18} className="detail-info-icon" />
              <div>
                <span className="detail-info-label">Water Requirement</span>
                <span className="detail-info-value">{plant.waterRequirement}</span>
              </div>
            </div>
            <div className="detail-info-item">
              <Sun size={18} className="detail-info-icon" />
              <div>
                <span className="detail-info-label">Sunlight</span>
                <span className="detail-info-value">{plant.sunlight}</span>
              </div>
            </div>
          </motion.div>

          {/* Growing Conditions */}
          <motion.div
            className="detail-growing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <h4 className="detail-growing__label">Growing Conditions</h4>
            <p className="detail-growing__value">{plant.growingConditions}</p>
          </motion.div>

          {/* Planting Notes */}
          <motion.div
            className="detail-notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
          >
            <h4 className="detail-notes__label">Planting Notes</h4>
            <p className="detail-notes__value">{plant.plantingNotes}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/contact" className="btn btn--primary detail-cta">
              Enquire About This Plant <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-padding detail-journey">
        <div className="container">
          <h2 className="heading-md" style={{ marginBottom: '3rem' }}>From Nursery to Farm</h2>
          <div className="journey__steps">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={step}
                className="journey-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="journey-step__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="journey-step__line" />
                <div className="journey-step__label">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Plants */}
      {related.length > 0 && (
        <section className="section-padding detail-related" style={{ background: '#f4f1eb' }}>
          <div className="container">
            <h2 className="heading-md" style={{ marginBottom: '2rem' }}>Related Plants</h2>
            <div className="detail-related__grid">
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="related-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/plants/${p.slug}`} className="related-card__link">
                    <div className="related-card__img-wrap">
                      <img src={p.image} alt={p.name} className="related-card__img" loading="lazy" />
                    </div>
                    <div className="related-card__body">
                      <span className="related-card__cat">{p.categoryLabel}</span>
                      <h3 className="related-card__name">{p.name}</h3>
                      <span className="related-card__cta">View Details <ArrowRight size={13} /></span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
