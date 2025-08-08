import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ShippingForm from '../components/ShippingForm.jsx';
import ShippingPreview from '../components/ShippingPreview.jsx';

// This is the complete and correct initial state for our form
const initialFormData = {
    senderFirstName: '', senderLastName: '', senderEmail: '', senderPhone: '', senderCountry: '', senderState: '', senderCity: '', senderAddress: '',
    receiverFirstName: '', receiverLastName: '', receiverEmail: '', receiverPhone: '', receiverCountry: '', receiverState: '', receiverCity: '', deliveryAddress: '',
    itemDescription: '', weightKg: '', deliveryOption: ''
};

const ShippingPage = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (e) => {
    // This logic handles both regular inputs and custom component data
    if (typeof e === 'object' && e !== null && !e.target) {
      setFormData(e);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/shipping/request', formData);
      alert('Success! Your shipping request has been submitted.');
      setFormData(initialFormData); // Reset form after submission
    } catch (error) {
      alert('Error: Could not submit your request. Please check the details and try again.');
      console.error(error);
    }
  };

  // Condition to show the preview card
  const showPreview = formData.senderFirstName && formData.receiverFirstName;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-100 to-blue-200 min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className='text-4xl font-extrabold text-gray-900'>Create a New Shipment</h1>
          <p className='mt-4 text-lg text-gray-600'>Please provide all the details for your shipment below.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-gray-200">
            <ShippingForm 
              formData={formData} 
              onFormChange={handleFormChange} 
              onSubmit={handleSubmit} 
            />
          </div>
          <div className="relative h-full">
            {showPreview && <ShippingPreview data={formData} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingPage;
