import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gray-900 shadow-lg w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link to='/' className='text-2xl font-bold text-white cursor-pointer'>Justice Airport</Link>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <Link to='/flights' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Flights</Link>
              <Link to='/shipping' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Shipping</Link>
              <a href='#' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Contact Us</a>
              <a href='#' className='bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700'>Login</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
