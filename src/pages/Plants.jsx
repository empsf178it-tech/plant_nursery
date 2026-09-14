import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import { plants, plantCategories, getPlantsByCategory } from '../data/plants';
import './Plants.css';

function PlantCatalogCard({ plant, index }) {
  return (
    <motion.div
      className="catalog-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/plants/${plant.slug}`} className="catalog-card__link">
        <div className="catalog-card__img-wrap">
          <img src={plant.image} alt={plant.name} className="catalog-card__img" loading="lazy" />
          <span className="catalog-card__badge">{plant.categoryLabel}</span>
        </div>
        <div className="catalog-card__body">
          <h3 className="catalog-card__name">{plant.name}</h3>
          <p className="catalog-card__app">{plant.application}</p>
          <p className="catalog-card__desc">{plant.shortDesc}</p>
          <span className="catalog-card__cta">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Plants() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = getPlantsByCategory(activeCategory);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero page-hero--plants">
        <div className="page-hero__bg">
          <img src="/images/nursery-wide.jpg" alt="Plants" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <motion.span
            className="page-hero__label label-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Plant Catalog
          </motion.span>
          <motion.h1
            className="page-hero__heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            Plants for farms, plantations and growing spaces.
          </motion.h1>
        </div>
      </section>

      {/* Filters */}
      <section className="plants-filters">
        <div className="container">
          <div className="plants-filters__inner">
            <span className="plants-filters__icon"><SlidersHorizontal size={16} /></span>
            {plantCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`plants-filter-btn${isActive ? ' plants-filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="plants-filter-btn__text">{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="plants-filter-btn__active-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding plants-catalog">
        <div className="container">
          <motion.div
            className="plants-catalog__grid"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            layout
          >
            {filtered.length > 0 ? (
              filtered.map((plant, i) => (
                <PlantCatalogCard key={plant.slug} plant={plant} index={i} />
              ))
            ) : (
              <div className="plants-empty">
                <p>No plants found in this category. <Link to="/contact">Enquire for more varieties →</Link></p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding plants-enquiry dark-section">
        <div className="container">
          <div className="plants-enquiry__inner">
            <div>
              <h2 className="heading-md">Can't find what you're looking for?</h2>
              <p style={{ color: 'rgba(248,245,239,0.65)', marginTop: '0.75rem', lineHeight: 1.7 }}>
                We stock a wide variety of plants depending on the season. Contact us with your specific requirements.
              </p>
            </div>
            <Link to="/contact" className="btn btn--cream">
              Contact Our Nursery <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
