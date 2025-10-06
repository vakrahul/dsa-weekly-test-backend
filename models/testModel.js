const mongoose = require('mongoose');

// Test Schema
const testSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // e.g., "Week 1 Test"
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Test', testSchema);