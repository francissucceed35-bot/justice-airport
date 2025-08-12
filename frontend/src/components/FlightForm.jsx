import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Tooltip from './Tooltip.jsx';

const FlightForm = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', departureCity: '', arrivalCity: '', departureDate: '', ticketType: 'Economy' });
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      await axios.post(`${apiUrl}/api/flights/book`, formData);
      navigate('/payment-success');
    } catch (error) {
      alert('Error submitting request. Please check the console.');
      console.error('There was an error submitting the form:', error);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const inputStyles = "mt-1 block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md p-2 transition ease-in-out duration-200";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <div className="flex items-center space-x-2 mb-1"><label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label><Tooltip text="Please enter your full legal name." /></div>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputStyles} />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1"><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label><Tooltip text="We use this to send your booking confirmation." /></div>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className={inputStyles} />
        </div>
        <div><label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-1">Departure City</label><input type="text" name="departureCity" value={formData.departureCity} onChange={handleChange} required className={inputStyles} /></div>
        <div><label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700 mb-1">Arrival City</label><input type="text" name="arrivalCity" value={formData.arrivalCity} onChange={handleChange} required className={inputStyles} /></div>
        <div><label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label><input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required className={inputStyles} /></div>
        <div><label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label><select id="ticketType" name="ticketType" value={formData.ticketType} onChange={handleChange} required className={inputStyles}><option>Economy</option><option>Business</option><option>First Class</option></select></div>
      </div>
      <div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400">
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            'Submit & Proceed to Payment'
          )}
        </button>
      </div>
    </form>
  );
};
export default FlightForm;
