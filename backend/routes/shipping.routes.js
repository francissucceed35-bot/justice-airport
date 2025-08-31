const express = require('express');
const router = express.Router();
const ShippingRequest = require('../models/ShippingRequest.model.js');
const auth = require('../middleware/auth.middleware.js'); // <-- Import the security middleware

// Route for customers to create a new shipping request
router.post('/', async (req, res) => {
  try {
    const newRequest = new ShippingRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Shipping request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- NEW SECURE ROUTE FOR ADMINS ---
// This route will get all shipping requests. It is protected by the auth middleware.
router.get('/', auth, async (req, res) => {
  try {
    const requests = await ShippingRequest.find().sort({ createdAt: -1 }); // Get newest first
    res.json(requests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
