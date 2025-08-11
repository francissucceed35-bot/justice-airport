// FINAL WORKING VERSION of FlightForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FlightForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    ticketType: 'Economy',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      await axios.post(`${apiUrl}/api/flights/book`, formData);
      alert('Flight request submitted successfully!');
      setFormData({ fullName: '', email: '', departureCity: '', arrivalCity: '', departureDate: '', ticketType: 'Economy' });
    } catch (error) {
      alert('Error submitting request. Please check the console.');
      console.error('There was an error submitting the form:', error);
    }
  };

  const inputStyles = "mt-1 block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md p-2 transition ease-in-out duration-200";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className={inputStyles} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className={inputStyles} />
        </div>
        <div>
          <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700">Departure City</label>
          <input type="text" name="departureCity" id="departureCity" value={formData.departureCity} onChange={handleChange} required className={inputStyles} />
        </div>
        <div>
          <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700">Arrival City</label>
          <input type="text" name="arrivalCity" id="arrivalCity" value={formData.arrivalCity} onChange={handleChange} required className={inputStyles} />
        </div>
        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Departure Date</label>
          <input type="date" name="departureDate" id="departureDate" value={formData.departureDate} onChange={handleChange} required className={inputStyles} />
        </div>
        <div>
          <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">Ticket Type</label>
          <select id="ticketType" name="ticketType" value={formData.ticketType} onChange={handleChange} required className={inputStyles}>
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Submit Booking Request
        </button>
      </div>
    </form>
  );
};

export default FlightForm;