const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of 4 options
  correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema);