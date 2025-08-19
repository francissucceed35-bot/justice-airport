const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
// We will add security packages later
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// Route for customer registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    // IMPORTANT: In a real app, you must hash the password before saving!
    // For now, we save it as plain text for simplicity.
    const newUser = new User({ name, email, password }); 
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- NEW CUSTOMER LOGIN ROUTE ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // IMPORTANT: In a real app, you would use bcrypt.compare() to check the hashed password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // For now, we just send a success message. We will add JWT tokens later.
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
