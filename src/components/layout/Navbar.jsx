import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Plants', path: '/plants' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Nursery', path: '/nursery' },
  { label: 'Projects', path: '/projects' },
  { label: 'Plant Care', path: '/plant-care' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand" aria-label="NATIVERA Homepage">
            <Logo variant={menuOpen ? 'light' : (scrolled ? 'dark' : 'light')} size="medium" />
          </Link>

          <nav className="navbar__links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                >
                  <span className="navbar__link-text">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="navbar__active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/plants" className="navbar__cta">
              Find Your Plant <span>→</span>
            </Link>
          </motion.div>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} color="#F8F5EF" /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Dimming Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Compact Dropdown Menu Panel (Content Height Only) */}
            <motion.div
              className="mobile-dropdown-panel"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-dropdown__inner">
                <div className="mobile-dropdown__header">
                  <span className="live-badge__dot" style={{ background: '#4caf50' }}></span>
                  Navigation Menu
                </div>

                <nav className="mobile-dropdown__nav" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    const numStr = String(i + 1).padStart(2, '0');
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`mobile-dropdown__link${isActive ? ' mobile-dropdown__link--active' : ''}`}
                      >
                        <span className="mobile-dropdown__num">{numStr}</span>
                        <span className="mobile-dropdown__label">{link.label}</span>
                        {isActive && <span className="mobile-dropdown__active-dot">●</span>}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mobile-dropdown__footer">
                  <Link to="/plants" className="mobile-dropdown__cta">
                    Find Your Plant <span>→</span>
                  </Link>
                  <div className="mobile-dropdown__info-bar">
                    <div className="mobile-dropdown__info-item">
                      <span>🌱 Location</span>
                      <strong>South India Nursery</strong>
                    </div>
                    <div className="mobile-dropdown__info-item">
                      <span>📞 Contact</span>
                      <strong>+91 98765 43210</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
