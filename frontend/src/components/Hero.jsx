import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Define base classes and animation classes separately to avoid PowerShell errors
  const h1BaseClasses = 'text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl transition-all duration-1000 ease-out';
  const pBaseClasses = 'mt-6 max-w-2xl mx-auto text-xl text-gray-300 transition-all duration-1000 ease-out delay-300';
  const divBaseClasses = 'mt-10 flex justify-center space-x-4 transition-all duration-1000 ease-out delay-500';
  
  const animationClasses = isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 -translate-y-5';

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white overflow-hidden'>
      <div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center'>
        
        <h1 className={h1BaseClasses + animationClasses}>
          Seamless Travel and Shipping
        </h1>
        
        <p className={pBaseClasses + animationClasses}>
          Book your flights and manage your cargo with ease. Your journey and logistics, simplified.
        </p>
        
        <div className={divBaseClasses + animationClasses}>
          <a href='#' className='inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-colors'>
            Book a Flight
          </a>
          <a href='#' className='inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors'>
            Request Shipping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
