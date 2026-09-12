// ============================================
// CALM ROUTES - FRONTEND JAVASCRIPT
// Handles user interactions and API calls
// ============================================

// API Base URL
const API_BASE = 'http://localhost:3000/api';

// Current user ID (in real app, this would come from login)
let currentUserId = localStorage.getItem('userId') || 'user-' + Date.now();

// ============================================
// PAGE LOAD
// ============================================

window.addEventListener('load', () => {
  console.log('🎉 Calm Routes loaded!');
  setupEventListeners();
  loadUserPreferences();
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Noise level slider
  const noiseSlider = document.getElementById('noise-level');
  const noiseText = document.getElementById('noise-text');
  
  if (noiseSlider) {
    noiseSlider.addEventListener('input', (e) => {
      updateNoiseText(e.target.value, noiseText);
    });
  }

  // Crowd level slider
  const crowdSlider = document.getElementById('crowd-level');
  const crowdText = document.getElementById('crowd-text');
  
  if (crowdSlider) {
    crowdSlider.addEventListener('input', (e) => {
      updateCrowdText(e.target.value, crowdText);
    });
  }

  // Find route button
  const findRouteBtn = document.getElementById('find-route-btn');
  if (findRouteBtn) {
    findRouteBtn.addEventListener('click', handleFindRoute);
  }
}

// ============================================
// UPDATE TEXT BASED ON SLIDER VALUE
// ============================================

function updateNoiseText(value, element) {
  const texts = {
    1: '🤫 Very Quiet - Peaceful streets only',
    2: '🔇 Quiet - Minimal traffic sounds',
    3: '📢 Medium - Some traffic is okay',
    4: '🔊 Moderate - Can handle busier roads',
    5: '🎺 Busy - Any road is fine'
  };
  
  if (element) {
    element.textContent = texts[value];
  }
}

function updateCrowdText(value, element) {
  const texts = {
    1: '👤 Very Empty - Almost no people',
    2: '👥 Quiet - Few people around',
    3: '👫 Medium - Some people are okay',
    4: '👪 Moderate - Busier areas fine',
    5: '🎉 Busy - Crowded areas are fine'
  };
  
  if (element) {
    element.textContent = texts[value];
  }
}

// ============================================
// FIND ROUTE
// ============================================

async function handleFindRoute() {
  const startLocation = document.getElementById('start-location')?.value;
  const endLocation = document.getElementById('end-location')?.value;
  const condition = document.getElementById('condition')?.value;
  const noiseLevel = document.getElementById('noise-level')?.value;
  const crowdLevel = document.getElementById('crowd-level')?.value;

  if (!startLocation || !endLocation) {
    alert('⚠️ Please enter both starting point and destination');
    return;
  }

  console.log('🗺️ Finding calm route...');
  console.log('From:', startLocation);
  console.log('To:', endLocation);

  // Show loading state
  const btn = document.getElementById('find-route-btn');
  const originalText = btn.textContent;
  btn.textContent = '⏳ Finding route...';
  btn.disabled = true;

  try {
    // Create user preferences object
    const preferences = {
      condition: condition,
      noisePreference: parseInt(noiseLevel),
      crowdPreference: parseInt(crowdLevel)
    };

    // In a real app, this would call the backend route algorithm
    // For now, we'll simulate the response
    const routes = simulateRouteSearch(startLocation, endLocation, preferences);

    // Display the routes
    displayRouteResults(routes);

    // Save this route to user's history
    saveRouteToHistory(startLocation, endLocation, routes[0]);

  } catch (error) {
    console.error('Error finding route:', error);
    alert('❌ Error finding route. Please try again.');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// ============================================
// SIMULATE ROUTE SEARCH
// In real version, this calls backend API
// ============================================

function simulateRouteSearch(start, end, preferences) {
  // Mock route data based on user preferences
  const baseRoutes = [
    {
      name: 'Route A - Main Streets',
      distance: 3.2,
      duration: 15,
      calmScore: 3,
      trafficDensity: 8,
      pedestrianDensity: 7,
      description: 'Busy main roads with traffic lights'
    },
    {
      name: 'Route B - Residential Streets',
      distance: 4.1,
      duration: 18,
      calmScore: 7,
      trafficDensity: 3,
      pedestrianDensity: 2,
      description: 'Quiet residential neighborhoods'
    },
    {
      name: 'Route C - Park Path',
      distance: 4.5,
      duration: 20,
      calmScore: 9,
      trafficDensity: 1,
      pedestrianDensity: 4,
      description: 'Beautiful park path with minimal traffic'
    }
  ];

  // Adjust scores based on user preferences
  const adjustedRoutes = baseRoutes.map(route => {
    let adjustedScore = route.calmScore;

    // Penalize if too busy for user's preference
    if (preferences.noisePreference <= 2 && route.trafficDensity > 5) {
      adjustedScore -= 2;
    }

    if (preferences.crowdPreference <= 2 && route.pedestrianDensity > 4) {
      adjustedScore -= 2;
    }

    return {
      ...route,
      calmScore: Math.max(0, adjustedScore)
    };
  });

  // Sort by calm score
  adjustedRoutes.sort((a, b) => b.calmScore - a.calmScore);

  return adjustedRoutes;
}

// ============================================
// DISPLAY ROUTE RESULTS
// ============================================

function displayRouteResults(routes) {
  const routeInfo = document.getElementById('route-info');
  const routeDetails = document.getElementById('route-details');

  if (!routeInfo || !routeDetails) return;

  // Show the section
  routeInfo.style.display = 'block';

  // Create HTML for routes
  let html = '<div style="display: grid; gap: 15px;">';

  routes.forEach((route, index) => {
    const stars = '⭐'.repeat(Math.round(route.calmScore / 2));
    const color = route.calmScore >= 8 ? '#10b981' : route.calmScore >= 6 ? '#f59e0b' : '#ef4444';

    html += `
      <div style="
        background: linear-gradient(135deg, #f8f7ff 0%, #f0e6ff 100%);
        padding: 20px;
        border-radius: 12px;
        border-left: 5px solid ${color};
      ">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
          <div>
            <h3 style="color: var(--primary-color); margin: 0 0 5px 0;">🛣️ ${route.name}</h3>
            <p style="margin: 5px 0; color: #666;">${route.description}</p>
          </div>
          <div style="text-align: right; font-size: 1.2em;">${stars}</div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 15px 0;">
          <div style="background: white; padding: 10px; border-radius: 8px;">
            <p style="margin: 0; font-size: 0.8em; color: #999;">Distance</p>
            <p style="margin: 0; font-weight: 600; color: var(--primary-color);">${route.distance} km</p>
          </div>
          <div style="background: white; padding: 10px; border-radius: 8px;">
            <p style="margin: 0; font-size: 0.8em; color: #999;">Duration</p>
            <p style="margin: 0; font-weight: 600; color: var(--primary-color);">${route.duration} min</p>
          </div>
          <div style="background: white; padding: 10px; border-radius: 8px;">
            <p style="margin: 0; font-size: 0.8em; color: #999;">Calm Score</p>
            <p style="margin: 0; font-weight: 600; color: var(--primary-color);">${route.calmScore}/10</p>
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button style="
            flex: 1;
            padding: 10px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          " onclick="saveRoute('${route.name}', ${route.calmScore})">
            💾 Save Route
          </button>
          <button style="
            flex: 1;
            padding: 10px;
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          " onclick="viewRouteOnMap('${route.name}')">
            🗺️ View Map
          </button>
        </div>
      </div>
    `;
  });

  html += '</div>';

  routeDetails.innerHTML = html;

  // Scroll to results
  routeInfo.scrollIntoView({ behavior: 'smooth' });

  console.log('✅ Routes displayed!');
}

// ============================================
// SAVE ROUTE
// ============================================

async function saveRoute(routeName, calmScore) {
  try {
    const response = await fetch(`${API_BASE}/users/${currentUserId}/routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: routeName,
        from: document.getElementById('start-location').value,
        to: document.getElementById('end-location').value,
        calmScore: calmScore,
        distance: 3.5,
        duration: 18
      })
    });

    const data = await response.json();
    
    if (data.success) {
      alert('✅ Route saved to your profile!');
      console.log('📍 Route saved:', data.route);
    } else {
      alert('❌ Error saving route');
    }
  } catch (error) {
    console.error('Error saving route:', error);
    // If backend not available, save to localStorage
    saveRouteToLocalStorage(routeName, calmScore);
  }
}

// ============================================
// SAVE ROUTE TO LOCAL STORAGE
// Backup if backend not available
// ============================================

function saveRouteToLocalStorage(name, calmScore) {
  let routes = JSON.parse(localStorage.getItem('savedRoutes')) || [];
  
  routes.push({
    id: Date.now(),
    name: name,
    calmScore: calmScore,
    savedAt: new Date().toLocaleString()
  });

  localStorage.setItem('savedRoutes', JSON.stringify(routes));
  alert('✅ Route saved locally!');
  console.log('📍 Saved routes:', routes);
}

// ============================================
// LOAD USER PREFERENCES
// ============================================

function loadUserPreferences() {
  // Get preferences from localStorage
  const savedPrefs = JSON.parse(localStorage.getItem('userPreferences')) || {};

  if (document.getElementById('condition')) {
    document.getElementById('condition').value = savedPrefs.condition || 'adhd';
  }

  if (document.getElementById('noise-level')) {
    document.getElementById('noise-level').value = savedPrefs.noisePreference || 3;
    updateNoiseText(savedPrefs.noisePreference || 3, document.getElementById('noise-text'));
  }

  if (document.getElementById('crowd-level')) {
    document.getElementById('crowd-level').value = savedPrefs.crowdPreference || 3;
    updateCrowdText(savedPrefs.crowdPreference || 3, document.getElementById('crowd-text'));
  }

  console.log('✅ Preferences loaded:', savedPrefs);
}

// ============================================
// SAVE ROUTE TO HISTORY
// ============================================

function saveRouteToHistory(from, to, route) {
  let history = JSON.parse(localStorage.getItem('routeHistory')) || [];
  
  history.push({
    from: from,
    to: to,
    route: route.name,
    calmScore: route.calmScore,
    searchedAt: new Date().toLocaleString()
  });

  // Keep only last 10 searches
  if (history.length > 10) {
    history = history.slice(-10);
  }

  localStorage.setItem('routeHistory', JSON.stringify(history));
}

// ============================================
// VIEW ROUTE ON MAP
// ============================================

function viewRouteOnMap(routeName) {
  console.log('🗺️ Viewing route on map:', routeName);
  alert(`🗺️ Map would show "${routeName}" here (Google Maps integration coming soon)`);
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

console.log('✨ Calm Routes script loaded successfully!');
