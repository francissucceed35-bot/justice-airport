const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js');

// ROUTE: POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
});

// ROUTE: POST /api/users/login (with debugging)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`); // DEBUG LOG
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found in database.'); // DEBUG LOG
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    console.log('User found. Comparing passwords...'); // DEBUG LOG
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match.'); // DEBUG LOG
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    console.log('Login successful. Creating token.'); // DEBUG LOG
    const token = jwt.sign({ id: user._id, name: user.firstName }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).send({ token });
  } catch (error) {
    console.error('Server error during login:', error); // DEBUG LOG
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
