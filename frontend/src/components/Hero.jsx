import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white overflow-hidden'>
      <div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center'>
        
        <h1 className={`text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          Seamless Travel and Shipping
        </h1>
        
        <p className={`mt-6 max-w-2xl mx-auto text-xl text-gray-300 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          Book your flights and manage your cargo with ease. Your journey and logistics, simplified.
        </p>
        
        <div className={`mt-10 flex justify-center space-x-4 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          {/* --- NEW ATTRACTIVE BOOK A FLIGHT BUTTON --- */}
          <Link to="/flights" className='font-semibold text-blue-400 bg-transparent border border-blue-500 px-8 py-3 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
            Book a Flight
          </Link>
          {/* --- NEW ATTRACTIVE REQUEST SHIPPING BUTTON --- */}
          <Link to="/shipping" className='font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-8 py-3 rounded-md transition-all duration-300 shadow-lg'>
            Request Shipping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;