const express = require('express');
const router = express.Router();
const { addQuestion, createTest, getAllQuestions } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// A request to any of these routes must have a valid token (protect) 
// AND the user must be an admin (isAdmin)

// GET all questions
router.get('/questions', protect, isAdmin, getAllQuestions);

// POST a new question
router.post('/questions', protect, isAdmin, addQuestion);

// POST a new test
router.post('/tests', protect, isAdmin, createTest);

module.exports = router;