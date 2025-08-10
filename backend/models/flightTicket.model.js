const mongoose = require('mongoose');

const flightTicketSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureDate: { type: Date, required: true },
  ticketType: { type: String, enum: ['Economy', 'Business', 'First Class'], default: 'Economy' },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const FlightTicket = mongoose.model('FlightTicket', flightTicketSchema);

module.exports = FlightTicket;
