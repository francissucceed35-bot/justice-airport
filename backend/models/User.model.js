const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// We will add password hashing later for security
const User = mongoose.model('User', userSchema);
module.exports = User;
