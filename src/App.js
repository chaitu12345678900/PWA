import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api/fetchWeather";
import { useUnit } from "./context/UnitContext";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const { unit, toggleUnit } = useUnit();

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchData = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(searchCity);
      setWeatherData(data);

      // Add to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((city) => city !== searchCity);
        return [searchCity, ...filtered].slice(0, 5); // Keep last 5 searches
      });

      setCityName("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && cityName.trim()) {
      fetchData(cityName);
    }
  };

  const handleRecentSearch = (city) => {
    fetchData(city);
  };

  const getTemperature = () => {
    if (!weatherData?.current) return null;
    return unit === "C"
      ? weatherData.current.temp_c
      : weatherData.current.temp_f;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather App</h1>
        <button className="unit-toggle" onClick={toggleUnit}>
          Switch to °{unit === "C" ? "F" : "C"}
        </button>
      </header>

      <main className="app-main">
        <div className="search-section">
          <input
            type="text"
            placeholder="Enter city name..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && <div className="error"> {error}</div>}

        {weatherData?.location && !loading && (
          <div className="weather-info">
            <h2>
              {weatherData.location.name}, {weatherData.location.region},{" "}
              {weatherData.location.country}
            </h2>
            <p className="temperature">
              Temperature: {getTemperature()}° {unit}
            </p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Pressure: {weatherData.current.pressure_mb} mb</p>
            <p>Visibility: {weatherData.current.vis_km} km</p>
          </div>
        )}

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <div className="search-list">
              {recentSearches.map((city, index) => (
                <button
                  key={index}
                  className="search-item"
                  onClick={() => handleRecentSearch(city)}
                  disabled={loading}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
