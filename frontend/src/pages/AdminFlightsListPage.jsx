import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminFlightsListPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/api/flights`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const viewDetails = (id) => {
    // We will build this page next
    alert(`Navigating to details for flight ID: ${id}. Page coming soon!`);
  };

  if (loading) return <div className="p-8">Loading flight bookings...</div>;
  if (flights.length === 0) return <div className="p-8">No flight bookings found.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
      <h1 className="text-3xl font-bold mb-6">Flight Booking Requests</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map(flight => (
              <tr key={flight._id} onClick={() => viewDetails(flight._id)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{flight.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${flight.departureCity} ? ${flight.arrivalCity}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(flight.departureDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">{flight.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminFlightsListPage;
