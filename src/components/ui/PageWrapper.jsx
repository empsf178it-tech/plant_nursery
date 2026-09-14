import { useEffect } from 'react';
import { motion } from 'framer-motion';

export const pageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08
    } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    scale: 0.99,
    transition: { duration: 0.25, ease: 'easeIn' } 
  },
};

export default function PageWrapper({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
