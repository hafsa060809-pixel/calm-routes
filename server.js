// Import libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const apiRoutes = require('./routes/api');

// Create app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE (Setup)
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============================================
// DATABASE CONNECTION
// Connect to MongoDB
// ============================================

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/calm-routes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB!');
})
.catch((error) => {
  console.log('❌ MongoDB connection error:', error);
});

// ============================================
// ROUTES
// ============================================

// Home route
app.get('/', (req, res) => {
  res.send('✅ Calm Routes Server is Running!');
});

// Test API route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is working',
    status: 'online',
    database: 'connected'
  });
});

// Use API routes
app.use('/api', apiRoutes);

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('✨ Calm Routes is ready!');
  console.log('📚 API Documentation:');
  console.log('   POST /api/users - Create user');
  console.log('   GET /api/users/:id - Get user');
  console.log('   PUT /api/users/:id/preferences - Update preferences');
  console.log('   POST /api/users/:id/routes - Save a route');
  console.log('   GET /api/users/:id/routes - Get saved routes');
  console.log('   POST /api/users/:id/favorites - Add favorite');
  console.log('   GET /api/users/:id/favorites - Get favorites');
});
