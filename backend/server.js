const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const flightRoutes = require('./routes/flight.routes.js');
const shippingRoutes = require('./routes/shipping.routes.js'); // <-- ADD THIS

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

app.use('/api/flights', flightRoutes);
app.use('/api/shipping', shippingRoutes); // <-- AND ADD THIS

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
    app.listen(PORT, () => {
      console.log('Server is running on port ' + PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
