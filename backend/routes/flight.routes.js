const express = require('express');
const router = express.Router();
const FlightTicket = require('../models/flightTicket.model.js');
const authMiddleware = require('../middleware/auth.middleware.js');

// GET ALL flight tickets (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tickets = await FlightTicket.find({}).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
});

// UPDATE a flight ticket status (Protected)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await FlightTicket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket' });
  }
});

// DELETE a flight ticket (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const ticket = await FlightTicket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket' });
  }
});

// CREATE a new flight ticket (Public)
router.post('/book', async (req, res) => {
  try {
    const newTicket = new FlightTicket(req.body);
    await newTicket.save();
    res.status(201).json({ message: 'Flight ticket booked successfully!', ticket: newTicket });
  } catch (error) {
    res.status(400).json({ message: 'Error booking flight ticket' });
  }
});

module.exports = router;
