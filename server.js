// Import libraries
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (setup)
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============================================
// ROUTES (The paths for our app)
// ============================================

// Home route - just to check if server is working
app.get('/', (req, res) => {
  res.send('✅ Calm Routes Server is Running!');
});

// Test API route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is working',
    status: 'online'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('✨ Calm Routes is ready!');
});
