// ============================================
// USER PROFILE MANAGEMENT
// Save and load user preferences
// ============================================

class UserProfile {
  constructor(userId, name) {
    this.userId = userId;
    this.name = name;
    this.preferences = {
      condition: 'adhd',           // What condition they have
      noisePreference: 3,          // 1-5 scale
      crowdPreference: 3,          // 1-5 scale
      avoidHighways: true,         // Avoid main roads?
      preferShaded: false,         // Like shaded paths?
      allowStairs: false,          // Can use stairs?
      needAccessibleRooms: false,  // Need bathrooms?
      preferQuietHours: true       // Avoid rush hour?
    };
    this.savedRoutes = [];         // Save favorite routes
    this.favoriteDestinations = []; // Quick locations
    this.createdAt = new Date();
    this.lastUpdated = new Date();
  }

  /**
   * Update user preferences
   */
  updatePreferences(newPreferences) {
    this.preferences = {
      ...this.preferences,
      ...newPreferences
    };
    this.lastUpdated = new Date();
    console.log('✅ Preferences updated!');
  }

  /**
   * Save a favorite route
   */
  saveRoute(routeData) {
    const savedRoute = {
      id: Date.now(),
      name: routeData.name || 'My Route',
      from: routeData.from,
      to: routeData.to,
      calmScore: routeData.calmScore,
      distance: routeData.distance,
      duration: routeData.duration,
      savedAt: new Date()
    };

    this.savedRoutes.push(savedRoute);
    console.log('📍 Route saved!', savedRoute);
    return savedRoute;
  }

  /**
   * Add favorite destination
   */
  addFavoriteDestination(name, address) {
    const favorite = {
      id: Date.now(),
      name: name,
      address: address,
      addedAt: new Date()
    };

    this.favoriteDestinations.push(favorite);
    console.log('⭐ Favorite added!', favorite);
    return favorite;
  }

  /**
   * Get all saved routes
   */
  getSavedRoutes() {
    return this.savedRoutes;
  }

  /**
   * Get all favorite destinations
   */
  getFavoriteDestinations() {
    return this.favoriteDestinations;
  }

  /**
   * Delete a saved route
   */
  deleteRoute(routeId) {
    this.savedRoutes = this.savedRoutes.filter(r => r.id !== routeId);
    console.log('🗑️ Route deleted!');
  }

  /**
   * Get user summary
   */
  getSummary() {
    return {
      userId: this.userId,
      name: this.name,
      preferences: this.preferences,
      totalSavedRoutes: this.savedRoutes.length,
      totalFavorites: this.favoriteDestinations.length,
      createdAt: this.createdAt,
      lastUpdated: this.lastUpdated
    };
  }
}

module.exports = UserProfile;
