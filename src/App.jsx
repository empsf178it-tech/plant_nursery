import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Plants from './pages/Plants';
import PlantDetail from './pages/PlantDetail';
import Solutions from './pages/Solutions';
import Nursery from './pages/Nursery';
import Projects from './pages/Projects';
import PlantCare from './pages/PlantCare';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/:slug" element={<PlantDetail />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/nursery" element={<Nursery />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/plant-care" element={<PlantCare />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
