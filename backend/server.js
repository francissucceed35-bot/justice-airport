const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const flightRoutes = require('./routes/flight.routes.js');
const shippingRoutes = require('./routes/shipping.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');

const app = express();

// === FINAL CORS CONFIGURATION ===
// This explicitly tells your backend to trust your Vercel frontend URLs
const whitelist = [
    'https://justice-airport.vercel.app', 
    'https://justice-airport-1.vercel.app',
    'https://justice-airport-j65d.vercel.app',
    'https://justice-airport-pbls.vercel.app',
    'https://justice-airport-jbr4lfp-francis-projects-4577d5d4.vercel.app'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

// Other middleware
app.use(express.json()); 

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

// API Routes
app.use('/api/flights', flightRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

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
