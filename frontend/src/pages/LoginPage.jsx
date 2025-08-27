import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode'; // <-- NEW

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/api/auth/login`, { identifier, password });
      
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      // Decode the token to check the user's role
      const decodedToken = jwtDecode(token);
      
      // Redirect based on role
      if (decodedToken.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // Redirect customers to the homepage
      }

    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login failed:', err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2></div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Email or Username</label>
              <input id="identifier" name="identifier" type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div><button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Sign in</button></div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Not a member?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up now</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default LoginPage;
