const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected. The `protect` middleware will run first.
// If the token is valid, it will call getUserProfile. If not, it will send an error.
router.get('/profile', protect, getUserProfile);

module.exports = router;