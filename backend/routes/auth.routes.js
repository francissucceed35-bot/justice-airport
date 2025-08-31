const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model.js');
const User = require('../models/User.model.js');

// This route is for creating the initial admin account only
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const adminExists = await Admin.countDocuments();
    if (adminExists > 0) {
        return res.status(400).send({ message: 'An admin account already exists.' });
    }
    const admin = new Admin({ username, email, password });
    await admin.save();
    res.status(201).send({ message: 'Admin user created successfully!' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating admin user', error: error.message });
  }
});

// This route now correctly handles encrypted passwords for BOTH admins and customers
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const admin = await Admin.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({ token });
      }
    }

    const user = await User.findOne({ email: identifier });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({ token });
      }
    }
    
    return res.status(401).send({ message: 'Invalid credentials' });

  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
