const jwt = require('jsonwebtoken');

// Generates a JWT signed with the user's ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will be valid for 30 days
  });
};

module.exports = generateToken;