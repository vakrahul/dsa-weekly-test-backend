const mongoose = require('mongoose');

const testCaseSchema = mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
});

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  // Example code to get the user started
  starterCode: { 
    type: String,
    required: true,
  },
  // An array of test cases to validate the user's code
  testCases: [testCaseSchema], 
}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;