const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  submitTest,
  getLeaderboard,
} = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');

// IMPORTANT: Specific routes like '/leaderboard' must be defined BEFORE
// dynamic routes like '/:id' to avoid conflicts.

router.get('/', protect, getAllTests);
router.get('/leaderboard', protect, getLeaderboard); // This comes before /:id
router.post('/submit', protect, submitTest);
router.get('/:id', protect, getTestById); // Dynamic route is last

module.exports = router;