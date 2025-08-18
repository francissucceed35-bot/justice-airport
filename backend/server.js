const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const flightRoutes = require('./routes/flight.routes.js');
const shippingRoutes = require('./routes/shipping.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js'); // <-- NEW

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

// Use Routes
app.use('/api/flights', flightRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // <-- NEW

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
