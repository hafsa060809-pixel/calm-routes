// ============================================
// API ROUTES - Handle user requests
// ============================================

const express = require('express');
const router = express.Router();
const { User, SavedRoute, FavoriteDestination } = require('../models/index');

// ============================================
// USER ROUTES
// ============================================

/**
 * GET - Get user profile
 * Example: GET /api/users/123
 */
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST - Create new user
 * Example: POST /api/users
 */
router.post('/users', async (req, res) => {
  try {
    const { username, email, password, preferences } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      preferences: preferences || {}
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: '✅ User created!',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT - Update user preferences
 * Example: PUT /api/users/123/preferences
 */
router.put('/users/:userId/preferences', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { preferences: req.body.preferences, lastUpdated: Date.now() },
      { new: true }
    );

    res.json({
      success: true,
      message: '✅ Preferences updated!',
      user: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SAVED ROUTES
// ============================================

/**
 * GET - Get all saved routes for a user
 * Example: GET /api/users/123/routes
 */
router.get('/users/:userId/routes', async (req, res) => {
  try {
    const routes = await SavedRoute.find({ userId: req.params.userId });

    res.json({
      success: true,
      totalRoutes: routes.length,
      routes: routes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST - Save a new route
 * Example: POST /api/users/123/routes
 */
router.post('/users/:userId/routes', async (req, res) => {
  try {
    const { name, from, to, calmScore, distance, duration } = req.body;

    const newRoute = new SavedRoute({
      userId: req.params.userId,
      name: name,
      from: from,
      to: to,
      calmScore: calmScore,
      distance: distance,
      duration: duration
    });

    await newRoute.save();

    res.status(201).json({
      success: true,
      message: '📍 Route saved!',
      route: newRoute
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE - Delete a saved route
 * Example: DELETE /api/routes/456
 */
router.delete('/routes/:routeId', async (req, res) => {
  try {
    await SavedRoute.findByIdAndDelete(req.params.routeId);

    res.json({
      success: true,
      message: '🗑️ Route deleted!'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// FAVORITE DESTINATIONS
// ============================================

/**
 * GET - Get all favorites for a user
 * Example: GET /api/users/123/favorites
 */
router.get('/users/:userId/favorites', async (req, res) => {
  try {
    const favorites = await FavoriteDestination.find({ userId: req.params.userId });

    res.json({
      success: true,
      totalFavorites: favorites.length,
      favorites: favorites
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST - Add a favorite destination
 * Example: POST /api/users/123/favorites
 */
router.post('/users/:userId/favorites', async (req, res) => {
  try {
    const { name, address, category } = req.body;

    const newFavorite = new FavoriteDestination({
      userId: req.params.userId,
      name: name,
      address: address,
      category: category
    });

    await newFavorite.save();

    res.status(201).json({
      success: true,
      message: '⭐ Favorite added!',
      favorite: newFavorite
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE - Delete a favorite
 * Example: DELETE /api/favorites/789
 */
router.delete('/favorites/:favoriteId', async (req, res) => {
  try {
    await FavoriteDestination.findByIdAndDelete(req.params.favoriteId);

    res.json({
      success: true,
      message: '🗑️ Favorite deleted!'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
