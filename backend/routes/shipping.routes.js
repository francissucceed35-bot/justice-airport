const express = require('express');
const router = express.Router();
const ShippingRequest = require('../models/shippingRequest.model.js');
const authMiddleware = require('../middleware/auth.middleware.js');

// GET ALL shipping requests (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const requests = await ShippingRequest.find({}).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// UPDATE a shipping request status (Protected)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await ShippingRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request' });
  }
});

// DELETE a shipping request (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const request = await ShippingRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request' });
  }
});

// CREATE a new request (Public)
router.post('/request', async (req, res) => {
  try {
    const newRequest = new ShippingRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Shipping request created successfully!', request: newRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error creating shipping request' });
  }
});

module.exports = router;
