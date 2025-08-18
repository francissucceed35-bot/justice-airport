import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = false; // This should be managed by your app's state

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    // Your logout logic here
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-900 shadow-lg w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-10 w-auto" src="/logo.jpg" alt="Justice Airport" />
              <span className="text-white font-bold text-xl">Justice Airport</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/flights" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Flights</Link>
              <Link to="/shipping" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Shipping</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Contact Us</Link>

              {isLoggedIn ? (
                <>
                  <Link to="/settings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Settings</Link>
                  <button onClick={handleLogout} className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Logout</button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/signup" className="font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-5 py-2 rounded-md transition-all duration-300 shadow-lg">
                    Sign Up
                  </Link>
                  <Link to="/login" className="font-semibold text-blue-400 bg-transparent border border-blue-500 px-5 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Button for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMobileMenu} type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU PANEL --- */}
      {/* This section will show or hide based on the isMobileMenuOpen state */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/flights" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Flights</Link>
          <Link to="/shipping" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Shipping</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</Link>
        </div>
        {/* Adds a separator line */}
        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="px-2 space-y-2">
            <Link to="/signup" className="block text-center font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-5 py-2 rounded-md transition-all duration-300 shadow-lg">
              Sign Up
            </Link>
            <Link to="/login" className="block text-center font-semibold text-blue-400 bg-transparent border border-blue-500 px-5 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;