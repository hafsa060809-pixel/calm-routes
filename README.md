# 🧠 Calm Routes

A smart navigation app that finds **quiet, smooth, and peaceful routes** for people with ADHD, sensory sensitivities, anxiety, and other conditions that make overstimulation difficult.

## 🎯 What Problem Does It Solve?

Traditional navigation apps (Google Maps, Waze) prioritize speed. But for people with ADHD and sensory sensitivities:
- **Busy highways are overwhelming** 🚗
- **Traffic lights cause frustration** 🚦
- **Crowded areas are stressful** 👥
- **Complex intersections cause anxiety** 😰

**Calm Routes finds routes that are:**
- ✨ **Quiet** - Minimal traffic noise
- 🌳 **Peaceful** - Away from busy areas
- 🚴 **Smooth** - Fewer stops and lights
- 📍 **Accessible** - Optional rest areas nearby

---

## 💡 How It Works

1. **Set Your Preferences** - Tell us your condition and comfort level
2. **Enter Your Route** - Where are you going?
3. **Get Smart Suggestions** - We find the calmest routes
4. **Save Your Favorites** - Keep routes you love

### The Algorithm 🧠

Our smart algorithm scores routes based on **5 key factors**:

| Factor | Impact | Score |
|--------|--------|-------|
| 🔊 Noise Level | Traffic sounds | 25% |
| 👥 Crowd Density | How many people | 20% |
| 🛣️ Road Smoothness | Quality of streets | 20% |
| 🚦 Traffic Lights | Stops and delays | 15% |
| 👀 Visual Complexity | Busy intersections | 20% |

**Example:**
```
Route A (Main Streets): 3/10 ❌ (busy, stressful)
Route B (Residential):  7/10 ✓ (quiet, peaceful)
Route C (Park Path):    9/10 ✅ (perfect for ADHD!)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+) - [Download](https://nodejs.org)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- **Git** - [Download](https://git-scm.com)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/hafsa060809-pixel/calm-routes.git
cd calm-routes
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** with your settings
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/calm-routes
NODE_ENV=development
```

4. **Start MongoDB** (if running locally)
```bash
# On Windows
mongod

# On Mac/Linux
brew services start mongodb-community
```

5. **Start the server**
```bash
npm start
```

6. **Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
calm-routes/
├── public/                    # Frontend files
│   ├── index.html            # Home page
│   ├── profile.html          # User profile page
│   ├── script.js             # Interactive features
│   └── style.css             # Styling
│
├── routes/                    # API endpoints
│   └── api.js                # User & route routes
│
├── models/                    # Database schemas
│   └── index.js              # MongoDB schemas
│
├── utils/                     # Helper functions
│   ├── routeAlgorithm.js     # Smart route scoring
│   └── UserProfile.js        # User profile management
│
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env                       # Environment variables
└── README.md                 # This file
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Maps** | Google Maps API (coming soon) |
| **Auth** | JWT (coming soon) |

---

## 📚 API Documentation

### User Routes

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "preferences": {
    "condition": "adhd",
    "noisePreference": 3,
    "crowdPreference": 3
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "✅ User created!",
  "user": { ... }
}
```

#### Get User Profile
```http
GET /api/users/:userId
```

#### Update Preferences
```http
PUT /api/users/:userId/preferences
Content-Type: application/json

{
  "preferences": {
    "condition": "sensory",
    "noisePreference": 2,
    "crowdPreference": 2
  }
}
```

### Route Routes

#### Save Route
```http
POST /api/users/:userId/routes
Content-Type: application/json

{
  "name": "My Quiet Route",
  "from": "Home",
  "to": "Work",
  "calmScore": 8.5,
  "distance": 3.2,
  "duration": 18
}
```

#### Get Saved Routes
```http
GET /api/users/:userId/routes
```

**Response:**
```json
{
  "success": true,
  "totalRoutes": 3,
  "routes": [
    {
      "name": "My Quiet Route",
      "from": "Home",
      "to": "Work",
      "calmScore": 8.5,
      "distance": 3.2,
      "duration": 18,
      "savedAt": "2026-09-12T10:30:00Z"
    }
  ]
}
```

#### Delete Route
```http
DELETE /api/routes/:routeId
```

### Favorite Routes

#### Add Favorite
```http
POST /api/users/:userId/favorites
Content-Type: application/json

{
  "name": "Morning Coffee Shop",
  "address": "123 Main St",
  "category": "cafe"
}
```

#### Get Favorites
```http
GET /api/users/:userId/favorites
```

#### Delete Favorite
```http
DELETE /api/favorites/:favoriteId
```

---

## 🎨 Features

### ✅ Completed
- ✨ Smart calm route algorithm
- 👤 User profiles with preferences
- 📍 Save favorite routes
- ⭐ Favorite destinations
- 🖼️ Profile photo upload (from files, gallery, or avatars)
- 🎚️ Noise & crowd preference sliders
- 📱 Mobile-friendly design
- 🌙 Calm, relaxing UI design

### 🔄 Coming Soon
- 🗺️ Google Maps integration
- 📍 Real-time location tracking
- 🚗 Real traffic data
- ⏰ Quiet hours recommendations
- 🧘 Rest areas & calm spots
- 💬 Community reviews
- 📱 Mobile app (iOS/Android)
- 🔐 User authentication
- 👥 Share routes with friends

---

## 👤 User Profile Features

### Profile Page (`/profile.html`)

**Left Sidebar:**
- 📷 Profile photo with upload options:
  - 📤 Upload from computer
  - 🖼️ Choose from gallery
  - 🎨 Generate avatar
- Username display

**Right Side:**
- 🧠 Select your condition (ADHD, Sensory, Anxiety, Other)
- ⚙️ Adjust preferences:
  - 🔊 Noise level tolerance (1-5)
  - 👥 Crowd comfort level (1-5)
  - ☑️ Optional settings (highways, stairs, etc.)
- 📍 View & manage saved routes
- 💾 Save all changes

---

## 🧮 Algorithm Details

### Calm Score Calculation

Each route gets a calm score (0-10) based on:

```javascript
calmScore = (
  noiseScore * 0.25 +
  crowdScore * 0.20 +
  smoothnessScore * 0.20 +
  trafficLightScore * 0.15 +
  visualComplexityScore * 0.20
)
```

### Example Scoring

**Route: Highway (Main Streets)**
- Noise: 2/10 (too loud for quiet seekers)
- Crowds: 3/10 (some pedestrians)
- Smoothness: 6/10 (paved)
- Traffic Lights: 2/10 (many lights)
- Visual: 3/10 (complex)
- **Total: 3.0/10 ❌**

**Route: Park Path**
- Noise: 9/10 (very quiet)
- Crowds: 7/10 (some joggers/walkers)
- Smoothness: 9/10 (smooth trail)
- Traffic Lights: 10/10 (no lights!)
- Visual: 8/10 (simple path)
- **Total: 8.6/10 ✅**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/calm-routes

# (Future) Google Maps API
GOOGLE_MAPS_API_KEY=your_api_key_here

# (Future) JWT Secret
JWT_SECRET=your_secret_key
```

---

## 📝 Example Usage

### 1. Homepage - Find a Route
1. Set your noise preference: "Very Quiet"
2. Set your crowd preference: "Few People"
3. Enter: From "Home" To "Coffee Shop"
4. Click "Find Calm Route 🗺️"
5. Get 3 suggestions:
   - Route A: 3/10 (busy highway)
   - Route B: 7/10 (residential)
   - Route C: 9/10 (park path) ⭐

### 2. Profile - Manage Settings
1. Go to Profile page
2. Upload a profile photo
3. Select "ADHD" condition
4. Set noise tolerance to "Very Quiet"
5. Set crowd tolerance to "Very Empty"
6. Check "Avoid Highways"
7. Save changes

### 3. Save Routes
1. Find a calm route
2. Click "💾 Save Route"
3. Route appears in profile's "Saved Routes"
4. Can be accessed anytime

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env
PORT=3001
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# On Mac: brew services start mongodb-community
# On Windows: Run mongod.exe
# Or use MongoDB Atlas (cloud)
```

### Frontend Not Updating
```bash
# Clear browser cache
# Ctrl+Shift+Delete (Windows/Linux)
# Cmd+Shift+Delete (Mac)
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repo**
2. **Create a branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 💜 About

**Made by:** Hafsa (hafsa060809-pixel)

**For:** Everyone who needs calm and peace while navigating the world

**Vision:** Make navigation accessible and peaceful for neurodivergent people, people with sensory sensitivities, and anyone seeking a calmer way to travel.

---

## 🙏 Acknowledgments

- Built with ❤️ for ADHD, sensory, and anxiety communities
- Inspired by real needs and real stories
- Thanks to all beta testers and feedback providers

---

## 📞 Support

- 🐛 Found a bug? [Open an issue](https://github.com/hafsa060809-pixel/calm-routes/issues)
- 💡 Have a feature idea? [Start a discussion](https://github.com/hafsa060809-pixel/calm-routes/discussions)
- 📧 Email: hafsa.060809@gmail.com

---

**✨ Remember: Your peace matters. Take the calm route. ✨**
