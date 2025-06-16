const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    dueDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: true });

const listSchema = new mongoose.Schema({
  title: { type: String, required: true , unique: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [taskSchema]
});

module.exports = mongoose.model('List', listSchema);
