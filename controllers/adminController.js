const Question = require('../models/questionModel');
const Test = require('../models/testModel');

/**
 * @desc    Get all questions
 * @route   GET /api/admin/questions
 * @access  Private/Admin
 */
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    console.error('GET_ALL_QUESTIONS_ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Add a new question
 * @route   POST /api/admin/questions
 * @access  Private/Admin
 */
const addQuestion = async (req, res) => {
  const { questionText, options, correctAnswer } = req.body;

  try {
    const question = new Question({
      questionText,
      options,
      correctAnswer,
    });

    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error('ADD_QUESTION_ERROR:', error);
    res.status(400).json({ message: 'Invalid question data', error: error.message });
  }
};

/**
 * @desc    Create a new test
 * @route   POST /api/admin/tests
 * @access  Private/Admin
 */
const createTest = async (req, res) => {
  const { title, questions } = req.body; // questions should be an array of question IDs

  try {
    const test = new Test({
      title,
      questions,
    });

    const createdTest = await test.save();
    res.status(201).json(createdTest);
  } catch (error) {
    console.error('CREATE_TEST_ERROR:', error);
    res.status(400).json({ message: 'Invalid test data', error: error.message });
  }
};

module.exports = { addQuestion, createTest, getAllQuestions };