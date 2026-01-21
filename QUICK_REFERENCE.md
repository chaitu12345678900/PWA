# Quick Reference Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser at http://localhost:3000
```

---

## 🎯 Features At A Glance

### 1️⃣ Loading State
```
Search → Shows Spinner → Input Disabled → Data Loads → Spinner Gone
```
- **Visual**: Spinning loader animation
- **File**: src/App.js, src/App.css

### 2️⃣ Recent Searches
```
Search → Saved to List → Click Button → Fetch Weather Again
```
- **Storage**: localStorage
- **Max Items**: 5
- **File**: src/App.js

### 3️⃣ Temperature Toggle
```
Click Button → "C" ↔ "F" → Temperature Updates → Persists
```
- **Storage**: localStorage + Context
- **File**: src/context/UnitContext.js, src/App.js

---

## 📁 Key Files

| File | Purpose | New? |
|------|---------|------|
| `src/App.js` | Main component | ✏️ Modified |
| `src/index.js` | Entry point | ✏️ Modified |
| `src/App.css` | Styling | ✨ New |
| `src/context/UnitContext.js` | Temperature context | ✨ New |
| `README.md` | Full documentation | ✏️ Updated |

---

## 🎮 How to Use

### Search Weather
```
1. Type city name (e.g., "London")
2. Press Enter
3. Wait for loading (shows spinner)
4. See weather data
5. City added to Recent Searches
```

### Toggle Temperature
```
1. Click "Switch to °F" (or °C) button
2. All temperatures update automatically
3. Preference saved automatically
```

### Use Recent Search
```
1. Scroll to Recent Searches
2. Click city button
3. Weather fetches instantly
4. City moves to top of list
```

---

## 💾 LocalStorage Keys

```javascript
// Key 1: Temperature Unit
localStorage.getItem("temperatureUnit")  // Returns: "C" or "F"

// Key 2: Recent Searches
localStorage.getItem("recentSearches")   // Returns: '["London","Paris",...]'
```

### Check in DevTools
```
F12 → Application → Local Storage → http://localhost:3000
```

---

## 🐛 Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Spinner not showing | Check network in DevTools |
| Recent searches empty | localStorage might be cleared |
| Temperature not toggle | Refresh page, check localStorage |
| Styles look wrong | Verify src/App.css is imported |
| Context error | Check UnitProvider in index.js |

---

## 📋 State Overview

```javascript
// Component State
const [weatherData, setWeatherData] = useState(null);
const [cityName, setCityName] = useState("");
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [recentSearches, setRecentSearches] = useState([]);

// Context State
const { unit, toggleUnit } = useUnit();  // "C" or "F"
```

---

## 🎨 Styling Quick Lookup

```css
/* Main Colors */
Primary: #667eea (Purple)
Secondary: #764ba2 (Dark Purple)

/* Key Classes */
.app-container    /* Main wrapper */
.app-header       /* Header with title & toggle */
.search-section   /* Search input area */
.loading          /* Loading spinner container */
.weather-info     /* Weather display card */
.recent-searches  /* Recent searches section */
.error            /* Error message box */
```

---

## ⚡ Performance Tips

1. **Max 5 recent searches** - Prevents memory issues
2. **useCallback for toggleUnit** - Prevents unnecessary re-renders
3. **localStorage sync in useEffect** - Efficient persistence
4. **CSS animations with transform** - GPU accelerated

---

## 🔗 GitHub Submission

```bash
# Step 1: Create repo on GitHub
# Step 2: Add remote
git remote add origin https://github.com/YOUR_USERNAME/pwa-weather.git

# Step 3: Push code
git branch -M main
git push -u origin main

# Step 4: Submit this URL
https://github.com/YOUR_USERNAME/pwa-weather
```

---

## 📚 Documentation Map

| Document | Purpose | Read When |
|----------|---------|-----------|
| README.md | Feature overview | Anytime |
| GITHUB_SETUP.md | Deployment guide | Creating GitHub repo |
| IMPLEMENTATION_DETAILS.md | Technical deep dive | Learning how it works |
| PROJECT_COMPLETION_SUMMARY.md | Full summary | Final review |
| This file | Quick reference | Quick lookup |

---

## ✅ Verification Checklist

- [ ] Can search for cities and see weather
- [ ] Spinner appears while loading
- [ ] Recent searches saved and clickable
- [ ] Temperature toggle works (C ↔ F)
- [ ] Preferences persist after refresh
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] localStorage contains both keys
- [ ] Can commit and push to GitHub
- [ ] GitHub repository public

---

## 🎓 Code Snippets

### Using the Unit Context
```javascript
import { useUnit } from "./context/UnitContext";

const MyComponent = () => {
  const { unit, toggleUnit } = useUnit();
  
  return (
    <button onClick={toggleUnit}>
      Switch to °{unit === "C" ? "F" : "C"}
    </button>
  );
};
```

### Adding to Recent Searches
```javascript
setRecentSearches((prev) => {
  const filtered = prev.filter((city) => city !== searchCity);
  return [searchCity, ...filtered].slice(0, 5);
});
```

### Conditional Rendering with Loading
```javascript
{loading && <div className="loading"><div className="spinner"></div></div>}
{error && <div className="error">{error}</div>}
{weatherData?.location && <div className="weather-info">...</div>}
```

---

## 🚨 Important Reminders

1. **UnitProvider must wrap App** in index.js
2. **App.css must be imported** in App.js
3. **localStorage key names are case-sensitive**
4. **Recent searches limited to 5** to prevent memory bloat
5. **Loading state set in try/finally** to ensure it resets
6. **Temperature unit toggle** affects all displayed values

---

## 📞 Quick Reference Commands

```bash
# Development
npm start              # Start dev server
npm run build          # Build for production
npm run deploy         # Deploy to GitHub Pages

# Git
git add -A             # Stage all changes
git commit -m "msg"    # Commit with message
git push origin main   # Push to GitHub
git status             # Check current status
git log --oneline      # View commit history

# Testing
# Open DevTools: F12
# Check localStorage: Application → Local Storage
# Monitor API: Network tab
# Check console: Console tab
```

---

## 🎯 Assignment Submission

### What to Submit
- ✅ GitHub Repository URL
- ✅ Verify all 3 features work
- ✅ Repository should be public
- ✅ Code should be pushed

### Format
```
Submission Link:
https://github.com/YOUR_USERNAME/pwa-weather

Features Verified:
✅ Loading State - Shows spinner during fetch
✅ Recent Searches - Saves and displays last 5 cities
✅ Unit Toggle - Switches between °C and °F
✅ Persistence - All preferences saved to localStorage
```

---

**Version**: 1.0  
**Last Updated**: January 21, 2026  
**Status**: Production Ready ✅

For detailed information, see the full documentation files in the project directory.
