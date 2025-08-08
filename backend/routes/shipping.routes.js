const express = require('express');
const router = express.Router();
const ShippingRequest = require('../models/shippingRequest.model.js');

// ROUTE: POST /api/shipping/request
router.post('/request', async (req, res) => {
  try {
    const newRequest = new ShippingRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Shipping request created successfully!', request: newRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error creating shipping request', error: error.message });
  }
});

module.exports = router;
