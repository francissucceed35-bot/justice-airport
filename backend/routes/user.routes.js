const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js');
const userAuthMiddleware = require('../middleware/userAuth.middleware.js');

// --- PUBLIC ROUTES ---

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User with this email already exists.' });
    
    user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user' });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, name: user.firstName }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// --- PROTECTED ROUTES (Require a valid customer token) ---

// GET /api/users/profile
router.get('/profile', userAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
});

// POST /api/users/change-password
router.post('/change-password', userAuthMiddleware, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
});

module.exports = router;
