import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">Flights</a>
          <a href="#" className="text-gray-400 hover:text-white">Shipping</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Justice Airport, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
