import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './SharedPages.css';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="not-found">
        <div className="not-found__img">
          <img src="./images/macro-leaf.jpg" alt="" />
        </div>
        <div className="not-found__content">
          <motion.div
            className="not-found__num"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            404
          </motion.div>
          <motion.h1
            className="not-found__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            This page hasn't taken root.
          </motion.h1>
          <motion.p
            className="not-found__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            The page you're looking for could not be found.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Link to="/" className="btn btn--primary">
              Return Home <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
