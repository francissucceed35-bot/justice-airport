import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerSignupPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      await axios.post(`${apiUrl}/api/users/register`, formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a Customer Account</h2></div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div><label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label><input id="firstName" name="firstName" type="text" required onChange={handleChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
              <div><label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label><input id="lastName" name="lastName" type="text" required onChange={handleChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
            </div>
            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label><input id="email" name="email" type="email" required onChange={handleChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
            <div><label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label><input id="password" name="password" type="password" required onChange={handleChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div><button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Sign Up</button></div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign In</Link></p>
        </div>
      </div>
    </motion.div>
  );
};
export default CustomerSignupPage;
