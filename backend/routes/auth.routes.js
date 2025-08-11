const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model.js');

// ROUTE: POST /api/auth/register (To create the first admin)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminExists = await Admin.countDocuments();
    if (adminExists > 0) {
        return res.status(400).send({ message: 'An admin account already exists.' });
    }
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).send({ message: 'Admin user created successfully!' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating admin user', error: error.message });
  }
});

// ROUTE: POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
