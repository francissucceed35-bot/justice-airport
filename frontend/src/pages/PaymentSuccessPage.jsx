import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentSuccessPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen flex items-center justify-center"
    >
      <div className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mt-6">Payment Successful!</h1>
        <p className="text-gray-600 mt-4">
          Thank you for your request. A confirmation and receipt have been sent to your email address. Our team will be in touch with you shortly.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccessPage;
