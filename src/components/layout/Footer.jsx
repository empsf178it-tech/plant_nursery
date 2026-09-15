import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Logo from '../common/Logo';
import './Footer.css';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="var(--color-deep-forest-green)" />
  </svg>
);

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__top">
        <div className="container">
          <motion.div
            className="footer__grid"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Brand */}
            <div className="footer__brand-col">
              <Link to="/" className="footer__logo-link" aria-label="NATIVERA Homepage">
                <Logo variant="light" size="large" />
              </Link>
              <p className="footer__tagline">Grow What Matters.</p>
              <p className="footer__desc">
                Healthy plants, dependable saplings and practical plantation solutions for South India&apos;s farms.
              </p>
              <div className="footer__socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
                  <TwitterIcon />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="YouTube">
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Plants */}
            <div className="footer__col">
              <h4 className="footer__col-title">Plants</h4>
              <ul className="footer__col-links">
                <li><Link to="/plants?cat=fruit">Fruit Plants</Link></li>
                <li><Link to="/plants?cat=plantation">Plantation Plants</Link></li>
                <li><Link to="/plants?cat=vegetable">Vegetable Seedlings</Link></li>
                <li><Link to="/plants?cat=native">Native Trees</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="footer__col">
              <h4 className="footer__col-title">Solutions</h4>
              <ul className="footer__col-links">
                <li><Link to="/solutions">Orchard Planning</Link></li>
                <li><Link to="/solutions">Coconut Plantation</Link></li>
                <li><Link to="/solutions">Timber Plantation</Link></li>
                <li><Link to="/solutions">Vegetable Cultivation</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer__col">
              <h4 className="footer__col-title">Support</h4>
              <ul className="footer__col-links">
                <li><Link to="/plant-care">Plant Care</Link></li>
                <li><Link to="/nursery">Nursery</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Company & Newsletter */}
            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              <ul className="footer__col-links">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/plant-care">Plant Guides</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
              <div className="footer__newsletter">
                <p className="footer__newsletter-label">Get growing tips and seasonal updates.</p>
                <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="footer__newsletter-input"
                    required
                  />
                  <button type="submit" className="footer__newsletter-btn" aria-label="Subscribe">
                    <ArrowRight size={16} />
                  </button>
                </form>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="footer__newsletter-success"
                  >
                    🌱 Thanks for subscribing!
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© 2026 NATIVERA. All rights reserved.</p>
            <p className="footer__bottom-region">South India Growing Region</p>
          </div>
        </div>
      </div>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
