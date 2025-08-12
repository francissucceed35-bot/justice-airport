import { motion } from 'framer-motion';
import FlightForm from '../components/FlightForm.jsx';

const FlightsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h1 className='text-4xl font-extrabold text-gray-900'>Your Next Journey Starts Here</h1>
          <p className='mt-4 text-lg text-gray-600'>Enter your details below for a fast and secure booking experience.</p>
        </div>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-2xl">
          <FlightForm />
        </div>
      </div>
    </motion.div>
  );
};

export default FlightsPage;
