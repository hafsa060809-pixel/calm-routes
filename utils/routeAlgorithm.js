// ============================================
// SMART ROUTE ALGORITHM
// This is the "brain" that finds calm routes
// ============================================

/**
 * Calculate a "Calm Score" for a route
 * Higher score = calmer, more peaceful route
 * 
 * Factors we consider:
 * - Noise level (traffic sounds)
 * - Crowd density (how many people)
 * - Road smoothness (bumpy = stressful)
 * - Traffic lights (stops = frustration)
 * - Visual complexity (busy = overwhelming)
 */

class CalmRouteAlgorithm {
  constructor() {
    this.weights = {
      noise: 0.25,           // 25% importance
      crowd: 0.20,           // 20% importance
      smoothness: 0.20,      // 20% importance
      trafficLights: 0.15,   // 15% importance
      visualComplexity: 0.20 // 20% importance
    };
  }

  /**
   * Main function - Find the calmest route
   */
  findCalmRoute(startPoint, endPoint, userPreferences) {
    console.log('🧭 Finding calm route...');
    console.log('From:', startPoint);
    console.log('To:', endPoint);
    console.log('User preferences:', userPreferences);

    // Get possible routes
    const possibleRoutes = this.getPossibleRoutes(startPoint, endPoint);

    // Score each route
    const scoredRoutes = possibleRoutes.map(route => {
      return {
        ...route,
        calmScore: this.calculateCalmScore(route, userPreferences)
      };
    });

    // Sort by calm score (highest = calmest)
    scoredRoutes.sort((a, b) => b.calmScore - a.calmScore);

    // Return the calmest route
    const calmestRoute = scoredRoutes[0];
    
    return {
      route: calmestRoute,
      allRoutes: scoredRoutes,
      recommendation: this.getRecommendation(calmestRoute, userPreferences)
    };
  }

  /**
   * Calculate calm score for a single route
   */
  calculateCalmScore(route, userPreferences) {
    let score = 0;

    // Noise score (1-10)
    const noiseScore = this.calculateNoiseScore(route, userPreferences.noisePreference);
    score += noiseScore * this.weights.noise;

    // Crowd score (1-10)
    const crowdScore = this.calculateCrowdScore(route, userPreferences.crowdPreference);
    score += crowdScore * this.weights.crowd;

    // Smoothness score (1-10)
    const smoothnessScore = this.calculateSmoothnessScore(route);
    score += smoothnessScore * this.weights.smoothness;

    // Traffic lights score (1-10)
    const trafficLightsScore = this.calculateTrafficLightsScore(route);
    score += trafficLightsScore * this.weights.trafficLights;

    // Visual complexity score (1-10)
    const visualScore = this.calculateVisualComplexityScore(route);
    score += visualScore * this.weights.visualComplexity;

    return Math.round(score * 10) / 10; // Round to 1 decimal
  }

  /**
   * Calculate noise score
   * User preference: 1 = very quiet, 5 = any noise okay
   */
  calculateNoiseScore(route, userNoisePreference) {
    const routeNoiseLevel = route.trafficDensity; // 1-10 (10 = very noisy)
    
    // If user prefers quiet (1-2) but route is noisy (7-10), score is low
    // If user doesn't mind noise (5), any route is okay
    const noiseDifference = Math.abs(userNoisePreference - (routeNoiseLevel / 2));
    
    return Math.max(0, 10 - noiseDifference);
  }

  /**
   * Calculate crowd score
   * User preference: 1 = very empty, 5 = crowded okay
   */
  calculateCrowdScore(route, userCrowdPreference) {
    const routeCrowdLevel = route.pedestrianDensity; // 1-10
    
    const crowdDifference = Math.abs(userCrowdPreference - (routeCrowdLevel / 2));
    
    return Math.max(0, 10 - crowdDifference);
  }

  /**
   * Calculate smoothness score
   * Smooth roads = less stressful for ADHD brains
   */
  calculateSmoothnessScore(route) {
    // Check for potholes, bumpy areas
    const roadQuality = route.roadQuality || 5; // 1-10
    return roadQuality;
  }

  /**
   * Calculate traffic lights score
   * Fewer traffic lights = less frustration
   */
  calculateTrafficLightsScore(route) {
    const trafficLightCount = route.trafficLights || 0;
    const routeLength = route.distance || 1;
    
    // Traffic lights per km
    const lightsPerKm = trafficLightCount / routeLength;
    
    // More lights = lower score
    if (lightsPerKm > 5) return 2;
    if (lightsPerKm > 3) return 4;
    if (lightsPerKm > 1) return 6;
    return 9; // Few lights = high score
  }

  /**
   * Calculate visual complexity score
   * Complex intersections = overwhelming
   */
  calculateVisualComplexityScore(route) {
    const complexity = route.visualComplexity || 5; // 1-10
    
    // Lower complexity is better
    return 11 - complexity;
  }

  /**
   * Get possible routes (mock data for now)
   * In real version, this would use Google Maps API
   */
  getPossibleRoutes(start, end) {
    // Mock routes - these are fake for testing
    return [
      {
        name: 'Route A - Main Streets',
        distance: 3.2,
        duration: 15,
        trafficDensity: 8,      // Busy
        pedestrianDensity: 7,   // Crowded
        roadQuality: 6,         // Okay
        trafficLights: 8,       // Many lights
        visualComplexity: 8     // Complex
      },
      {
        name: 'Route B - Residential',
        distance: 4.1,
        duration: 18,
        trafficDensity: 3,      // Light traffic
        pedestrianDensity: 2,   // Few people
        roadQuality: 8,         // Good
        trafficLights: 2,       // Few lights
        visualComplexity: 3     // Simple
      },
      {
        name: 'Route C - Park Path',
        distance: 4.5,
        duration: 20,
        trafficDensity: 1,      // No traffic
        pedestrianDensity: 4,   // Some people
        roadQuality: 9,         // Very smooth
        trafficLights: 0,       // No lights
        visualComplexity: 2     // Very simple
      }
    ];
  }

  /**
   * Get a friendly recommendation message
   */
  getRecommendation(route, userPreferences) {
    let message = '';
    
    if (route.calmScore >= 8) {
      message = '✨ This is a very calm route! Perfect for you.';
    } else if (route.calmScore >= 6) {
      message = '😊 This route is pretty calm and peaceful.';
    } else {
      message = '⚠️ This route might be busy. Consider Route B or C.';
    }

    return message;
  }
}

// Export for use in other files
module.exports = CalmRouteAlgorithm;
