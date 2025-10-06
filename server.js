const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const testRoutes = require('./routes/testRoutes'); // <-- IMPORT THIS

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/users', userRoutes);
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// Define the port
app.use('/api/tests', testRoutes); // <-- USE THIS
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});