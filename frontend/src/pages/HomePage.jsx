import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Footer from '../components/Footer.jsx';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <Footer />
    </motion.div>
  );
};

export default HomePage;
