# Weather App - Enhanced PWA

A progressive web app that displays current weather information with advanced features including loading states, recent searches, and temperature unit preferences.

## Features

### ✨ New Enhancements

#### 1. **Loading State**
- Visual loading spinner displayed while fetching weather data
- Loading indicator shows from the moment a search is initiated until data is fully loaded
- Input field is disabled during loading to prevent multiple simultaneous requests

#### 2. **Recent Searches**
- Automatically saves the last 5 city searches in local storage
- Recent searches are displayed as clickable buttons below the weather information
- Click on any recent search to instantly fetch and display weather for that city
- Search history persists across browser sessions

#### 3. **Unit Toggle (Celsius/Fahrenheit)**
- Toggle button in the app header to switch between temperature units
- Current selection is clearly indicated with the format "Switch to °[unit]"
- User preference is saved in local storage using React Context
- Temperature displays automatically update when unit is changed
- Persists user's preference across app sessions and page refreshes

#### 4. **Temperature Context Management**
- `UnitContext` manages the global temperature unit preference
- Custom `useUnit()` hook provides easy access to unit state throughout the app
- Local storage integration ensures preferences survive page reloads

## Project Structure

```
src/
├── App.js              # Main app component with search and weather display
├── App.css             # Enhanced styling for the app
├── index.js            # App entry point with UnitProvider wrapper
├── context/
│   └── UnitContext.js  # Context and provider for temperature unit preference
└── api/
    └── fetchWeather.js # Weather API integration
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/eliaatram/pwa-weather.git

# Navigate to the project directory
cd pwa-weather

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
# Create an optimized production build
npm run build
```

## Usage

1. **Search for Weather**: Type a city name and press Enter to fetch weather data
2. **Toggle Temperature Unit**: Click the "Switch to °F" or "Switch to °C" button in the header
3. **Use Recent Searches**: Click on any city in the Recent Searches list to quickly fetch its weather
4. **Persistence**: All preferences and search history are automatically saved to local storage

## Key Technologies

- **React 19.2.3**: UI library and state management
- **React Context API**: Global state management for temperature units
- **Local Storage**: Client-side data persistence
- **Axios**: HTTP client for API requests
- **CSS3**: Modern styling with animations and gradients

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run deploy`
Deploys the built app to GitHub Pages.

## API Integration

The app uses the [WeatherAPI.com](https://www.weatherapi.com/) API to fetch real-time weather data.

**Base URL**: `https://api.weatherapi.com/v1/current.json`

**Parameters**:
- `q`: City name (query parameter)
- `key`: API key

**Response**: Current weather data including temperature (both C and F), condition, humidity, pressure, and visibility.

## State Management

### Component State (App.js)
- `weatherData`: Current weather information for the searched city
- `cityName`: User input for city name
- `error`: Error messages from API calls
- `loading`: Boolean indicating fetch state
- `recentSearches`: Array of recently searched cities

### Context State (UnitContext.js)
- `unit`: Current temperature unit ("C" or "F")
- `toggleUnit()`: Function to switch between units

## Local Storage

The app utilizes local storage for:
1. **Temperature Unit**: Saved as `temperatureUnit` ("C" or "F")
2. **Recent Searches**: Saved as `recentSearches` (JSON array of city names)

## Responsive Design

The app is fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

CSS media queries ensure optimal layout on screens up to 600px wide.

## Error Handling

- Invalid city names show error messages
- Network errors are caught and displayed to the user
- Input validation prevents empty searches

## Browser Support

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Any modern browser supporting:
  - ES6+ JavaScript
  - CSS Grid/Flexbox
  - Local Storage API

## Performance Features

- Debounced search to prevent excessive API calls
- Only 5 recent searches stored to minimize storage usage
- Efficient re-renders using React hooks
- Optimized CSS animations with GPU acceleration

## Future Enhancements

- Extended weather forecast (7-day)
- Weather alerts and notifications
- Geolocation support for automatic local weather
- Multiple language support
- Weather charts and analytics
- Unit test coverage
- Dark mode toggle

## License

This project is open source and available under the MIT License.

## Credits

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons and UI design inspired by modern weather applications
- Built as an educational project to demonstrate React best practices

## Support

For issues or feature requests, please create an issue in the GitHub repository.

---

**Original Repository**: [eliaatram/pwa-weather](https://github.com/eliaatram/pwa-weather)


### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
