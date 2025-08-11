import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CustomerSettingsPage = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('customerToken');
      if (token) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
          const res = await axios.get(`${apiUrl}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('customerToken');
    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const res = await axios.post(`${apiUrl}/api/users/change-password`, 
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating password.');
    }
  };

  if (!user) return <div className="p-8">Loading profile...</div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Account</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <form className="space-y-4" onSubmit={handlePasswordChange}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Old Password</label>
              <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
            </div>
            {message && <p className="text-sm text-gray-600">{message}</p>}
            <div>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerSettingsPage;
