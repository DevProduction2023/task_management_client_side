const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [{ title: String, id: mongoose.Schema.Types.ObjectId }]
});

module.exports = mongoose.model('User', userSchema);
