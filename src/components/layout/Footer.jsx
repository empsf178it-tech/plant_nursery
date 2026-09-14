import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Logo from '../common/Logo';
import './Footer.css';

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
