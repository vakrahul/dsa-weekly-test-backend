/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  // The user object is attached to the request in the `protect` middleware.
  // We can just send it back.
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      scores: req.user.scores, // Includes the user's past scores for the dashboard
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getUserProfile };