import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminShippingListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/api/shipping`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching shipping requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const viewDetails = (id) => {
    alert(`Navigating to details for shipping ID: ${id}. Page coming soon!`);
  };

  if (loading) return <div className="p-8">Loading shipping requests...</div>;
  if (requests.length === 0) return <div className="p-8">No shipping requests found.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shipping Requests</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map(req => (
              <tr key={req._id} onClick={() => viewDetails(req._id)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{req.senderFirstName} {req.senderLastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{req.receiverFirstName} {req.receiverLastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{req.itemDescription}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">{req.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminShippingListPage;
