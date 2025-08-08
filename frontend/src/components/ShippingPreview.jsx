import React from 'react';
import { motion } from 'framer-motion';

const ShippingPreview = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-lg shadow-2xl p-8 text-white h-full"
    >
      <h3 className="text-2xl font-bold border-b border-gray-700 pb-4 mb-4">Shipment Summary</h3>
      
      <div className="space-y-6">
        {/* SENDER */}
        <div>
          <p className="text-sm font-semibold text-blue-400">FROM:</p>
          <p className="text-lg font-medium">{data.senderFirstName} {data.senderLastName}</p>
          <p className="text-gray-400">{data.senderEmail}</p>
        </div>

        {/* RECEIVER */}
        <div>
          <p className="text-sm font-semibold text-blue-400">TO:</p>
          <p className="text-lg font-medium">{data.receiverFirstName} {data.receiverLastName}</p>
          <p className="text-gray-400">{data.deliveryAddress}, {data.receiverCity}, {data.receiverState}</p>
          <p className="text-gray-400">{data.receiverCountry}</p>
        </div>

        {/* SHIPMENT */}
        <div>
          <p className="text-sm font-semibold text-blue-400">DETAILS:</p>
          <p className="text-lg font-medium">{data.itemDescription}</p>
          <p className="text-gray-400">Weight: {data.weightKg || '0'} kg</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingPreview;
