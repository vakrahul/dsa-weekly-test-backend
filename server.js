const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const testRoutes = require('./routes/testRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// ====================================================================
// CORS CONFIGURATION FIX
// ====================================================================
// Define the allowed origin (your Vercel frontend URL)
const corsOptions = {
  origin: 'https://dsa-weekly-test-frontend.vercel.app',
  optionsSuccessStatus: 200 // For legacy browser support
};

// Use the configured CORS options
app.use(cors(corsOptions));
// ====================================================================

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tests', testRoutes);

// Define the port
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});