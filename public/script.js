// ============================================
// CALM ROUTES - INTERACTIVE FEATURES
// ============================================

// Update noise level text
const noiseSlider = document.getElementById('noise-level');
const noiseText = document.getElementById('noise-text');

noiseSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  const texts = {
    1: 'Very Quiet - Peaceful streets only',
    2: 'Quiet - Minimal traffic sounds',
    3: 'Medium - Some traffic is okay',
    4: 'Moderate - Can handle busier roads',
    5: 'Busy - Any road is fine'
  };
  noiseText.textContent = texts[value];
});

// Update crowd level text
const crowdSlider = document.getElementById('crowd-level');
const crowdText = document.getElementById('crowd-text');

crowdSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  const texts = {
    1: 'Very Empty - Almost no people',
    2: 'Quiet - Few people around',
    3: 'Medium - Some people are okay',
    4: 'Moderate - Busier areas fine',
    5: 'Busy - Crowded areas are fine'
  };
  crowdText.textContent = texts[value];
});

// When user clicks "Find Calm Route" button
const findRouteBtn = document.getElementById('find-route-btn');
findRouteBtn.addEventListener('click', findCalmRoute);

function findCalmRoute() {
  const startLocation = document.getElementById('start-location').value;
  const endLocation = document.getElementById('end-location').value;
  const condition = document.getElementById('condition').value;
  const noiseLevel = document.getElementById('noise-level').value;
  const crowdLevel = document.getElementById('crowd-level').value;

  // Check if both locations are filled in
  if (!startLocation || !endLocation) {
    alert('Please enter both starting point and destination!');
    return;
  }

  console.log('Finding calm route...');
  console.log({
    from: startLocation,
    to: endLocation,
    condition: condition,
    noisePreference: noiseLevel,
    crowdPreference: crowdLevel
  });

  // Simulate finding a route (real version will use Google Maps API)
  showRoute(startLocation, endLocation, condition);
}

function showRoute(start, end, condition) {
  const routeInfo = document.getElementById('route-info');
  const routeDetails = document.getElementById('route-details');

  // Create fake route data (this is just for testing)
  const fakeRoute = {
    distance: '3.2 km',
    time: '12 minutes',
    calmScore: '9/10',
    reason: 'This route avoids busy highways and passes through quiet residential areas'
  };

  routeDetails.innerHTML = `
    <p><strong>📍 From:</strong> ${start}</p>
    <p><strong>📍 To:</strong> ${end}</p>
    <p><strong>📏 Distance:</strong> ${fakeRoute.distance}</p>
    <p><strong>⏱️ Time:</strong> ${fakeRoute.time}</p>
    <p><strong>✨ Calm Score:</strong> ${fakeRoute.calmScore}</p>
    <p><strong>💡 Why this route?</strong> ${fakeRoute.reason}</p>
    <p style="margin-top: 15px; color: var(--success); font-weight: bold;">✅ Route is being prepared for ${condition} needs</p>
  `;

  routeInfo.style.display = 'block';
  routeInfo.scrollIntoView({ behavior: 'smooth' });
}

// Log when page loads
console.log('✨ Calm Routes is loaded and ready to help!');
