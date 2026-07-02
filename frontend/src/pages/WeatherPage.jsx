import { useEffect, useState } from "react";

// Open-Meteo — free weather API, no key required.
// Default location: Lahore, PK. Users can search any city via the
// free Open-Meteo Geocoding API (also keyless) to change coordinates.
const DEFAULT_LOCATION = { name: "Lahore, Pakistan", lat: 31.5497, lon: 74.3436 };

export default function WeatherPage() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather API request failed");
      const data = await res.json();
      setWeather(data.current);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location.lat, location.lon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchCity = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    try {
      setError("");
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1`
      );
      if (!geoRes.ok) throw new Error("City lookup failed");
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError(`No location found for "${cityInput}"`);
        return;
      }
      const { name, latitude, longitude, country } = geoData.results[0];
      const newLocation = { name: `${name}, ${country}`, lat: latitude, lon: longitude };
      setLocation(newLocation);
      setCityInput("");
      fetchWeather(latitude, longitude);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <form className="add-form" onSubmit={searchCity}>
        <input
          type="text"
          placeholder="Search a city (e.g. Karachi, London)"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p className="status">Loading weather…</p>
      ) : weather ? (
        <div className="weather-card">
          <h2>{location.name}</h2>
          <div className="weather-grid">
            <div className="weather-stat">
              <span className="weather-value">{weather.temperature_2m}°C</span>
              <span className="weather-label">Temperature</span>
            </div>
            <div className="weather-stat">
              <span className="weather-value">{weather.relative_humidity_2m}%</span>
              <span className="weather-label">Humidity</span>
            </div>
            <div className="weather-stat">
              <span className="weather-value">{weather.wind_speed_10m} km/h</span>
              <span className="weather-label">Wind</span>
            </div>
          </div>
          <p className="weather-source">Live data via Open-Meteo API</p>
        </div>
      ) : (
        <p className="status">No weather data available.</p>
      )}
    </div>
  );
}
