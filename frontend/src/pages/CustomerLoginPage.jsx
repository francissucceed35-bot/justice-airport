import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/api/users/login`, formData);
      localStorage.setItem('customerToken', response.data.token);
      navigate('/'); 
      window.location.reload();
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Customer Sign In</h2></div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" name="email" type="email" required onChange={handleChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} // Toggle type
                  required 
                  onChange={handleChange} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <svg onClick={() => setShowPassword(!showPassword)} className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242" />
                    )}
                     {showPassword && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" onClick={() => alert('Password reset feature coming soon!')} className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div><button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Sign in</button></div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">Not a member? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link></p>
        </div>
      </div>
    </motion.div>
  );
};
export default CustomerLoginPage;
