# GitHub Repository Setup Guide

## Steps to Create and Push Your Enhanced Weather App to GitHub

### Step 1: Create a New GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in to your account
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `pwa-weather` (or your preferred name)
   - **Description**: "A progressive web app with weather forecasting, loading states, recent searches, and temperature unit preferences"
   - **Visibility**: Choose **Public** (required for GitHub Pages deployment)
   - **Initialize repository**: Leave all unchecked (we already have files)
5. Click **"Create repository"**

### Step 2: Add Remote URL and Push Code

After creating the repository, GitHub will provide you with commands. Follow these:

```bash
# Navigate to your project directory
cd C:\Users\91939\OneDrive\Desktop\PWA\pwa-weather

# Add the remote repository (replace 'YOUR_USERNAME' with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pwa-weather.git

# Verify the remote was added
git remote -v

# Rename the branch to main (if needed)
git branch -M main

# Push the code to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

1. Navigate to your repository on GitHub
2. You should see all your files including:
   - `src/App.js` (with loading state, recent searches, unit toggle)
   - `src/context/UnitContext.js` (new context for temperature unit management)
   - `src/App.css` (enhanced styling)
   - `README.md` (updated with feature documentation)

### Step 4: Enable GitHub Pages (Optional but Recommended)

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Select branch: **main**
6. Select folder: **/(root)**
7. Click **Save**

Your app will be available at: `https://YOUR_USERNAME.github.io/pwa-weather`

### Step 5: Deploy to GitHub Pages (Optional)

If you have the `gh-pages` package installed (it's in package.json):

```bash
# Build the app
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Important Notes

### Credentials
- **GitHub Username**: (Create or use existing account)
- **Email**: chaitanyavykuntam41@gmail.com
- **Repository URL**: https://github.com/YOUR_USERNAME/pwa-weather

### What's Been Implemented

✅ **Loading State**
- Spinner animation while fetching data
- Disabled input during loading
- Clear loading message

✅ **Recent Searches**
- Saves last 5 searches to localStorage
- Displays as clickable buttons
- Persists across sessions

✅ **Temperature Unit Toggle**
- Switch between Celsius and Fahrenheit
- Button in app header
- User preference saved to localStorage via Context API

✅ **Code Organization**
- React Context for global state management
- Custom hooks (`useUnit`) for easy access
- Responsive CSS styling
- Error handling and validation

### Files Modified/Created

1. **Modified**: `src/App.js` - Added all new features
2. **Modified**: `src/index.js` - Wrapped app with UnitProvider
3. **Created**: `src/context/UnitContext.js` - Temperature unit context
4. **Created**: `src/App.css` - Enhanced styling
5. **Modified**: `README.md` - Comprehensive documentation

### Commit History

```
Latest Commit:
feat: Add loading state, recent searches, and unit toggle for weather app
- Implement loading indicator for weather data fetches
- Add recent searches feature with localStorage persistence
- Create UnitContext for Celsius/Fahrenheit temperature toggle
- Add user preference persistence for temperature unit
- Enhance UI with improved styling and responsive design
- Add unit toggle button in header
```

## Testing the Features Locally

Before pushing to GitHub, test all features:

```bash
# Start the development server
npm start

# Test 1: Loading State
- Type a city name and press Enter
- Watch the spinner while data loads
- Notice input is disabled during loading

# Test 2: Recent Searches
- Search for multiple cities
- Scroll down to see Recent Searches list
- Click on a recent search to fetch that city's weather
- Refresh the page - recent searches should persist

# Test 3: Unit Toggle
- Click "Switch to °F" button
- Verify temperature changes to Fahrenheit
- Click again to switch back to Celsius
- Refresh the page - preference should persist
```

## Browser DevTools Verification

Open Browser DevTools (F12) and check:

1. **Application > Local Storage**: Verify these keys exist:
   - `temperatureUnit` - should be "C" or "F"
   - `recentSearches` - should be a JSON array

2. **Network Tab**: Monitor API calls to weatherapi.com

3. **Console**: Check for any errors during the search process

## Troubleshooting

### Git Push Issues
If push fails:
```bash
# Check current remote
git remote -v

# If remote doesn't exist, add it:
git remote add origin https://github.com/YOUR_USERNAME/pwa-weather.git

# Try push again
git push -u origin main
```

### Authentication Issues
If you get authentication errors:
1. Make sure you're logged into GitHub
2. Consider using a Personal Access Token (PAT) instead of password
3. On Windows, use GitHub CLI or configure Git Credential Manager

### Build or Runtime Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# Try starting again
npm start
```

## Next Steps

1. ✅ Create the GitHub repository
2. ✅ Push your code
3. ✅ Configure GitHub Pages (optional)
4. ✅ Submit repository link for assignment

## Submission

Your GitHub repository link should be in the format:
```
https://github.com/YOUR_USERNAME/pwa-weather
```

This is what you'll submit for the assignment.

## Additional Resources

- [GitHub Docs - Creating a Repository](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Context API](https://react.dev/reference/react/useContext)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

Happy coding! 🚀
