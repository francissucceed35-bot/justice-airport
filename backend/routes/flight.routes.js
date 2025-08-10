const express = require('express');
const router = express.Router();
const FlightTicket = require('../models/flightTicket.model.js');

// ROUTE: POST /api/flights/book
// DESCRIPTION: Creates a new flight ticket request
router.post('/book', async (req, res) => {
  try {
    const newTicket = new FlightTicket(req.body);
    await newTicket.save();
    res.status(201).json({ message: 'Flight ticket booked successfully!', ticket: newTicket });
  } catch (error) {
    res.status(400).json({ message: 'Error booking flight ticket', error: error.message });
  }
});

module.exports = router;
