import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <Link to="/flights" className="text-gray-400 hover:text-white">Flights</Link>
          <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
          <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
        </div>
        <div className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Justice Airport, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
