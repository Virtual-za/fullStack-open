import { useState } from 'react';
import weatherService from '../Services/weather.js';

const CountryDisplay = ({ filtered = [], selectedCountry = null }) => {
  const country = selectedCountry || (filtered.length === 1 ? filtered[0] : null);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  if (!country) return null;

  const fetchWeather = async () => {
    const lat = country.latlng?.[0];
    const lon = country.latlng?.[1];
    if (lat == null || lon == null) {
      setWeatherError('No coordinates available for this country');
      return;
    }

    setLoadingWeather(true);
    setWeatherError(null);
    try {
      const data = await weatherService.getByCoords(lat, lon);
      setWeather(data);
    } catch (err) {
      setWeatherError(err.message || 'Failed to fetch weather');
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <div className="country-display card">
      <div className="country-head">
        <h1 className="country-title">{country.name.common}</h1>
        {country.flags?.png && (
          <img className="flag" src={country.flags.png} alt={`Flag of ${country.name?.common}`} />
        )}
      </div>

      <p className="country-meta">
        <strong>Capital:</strong> {country.capital?.join(', ')}
        <br />
        <strong>Area:</strong> {country.area.toLocaleString()} km²
      </p>

      <h2>Languages</h2>
      {country.languages ? (
        <ul className="language-list">
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">No languages listed</p>
      )}

      <div className="weather">
        <button className="btn" type="button" onClick={fetchWeather} disabled={loadingWeather}>
          {loadingWeather ? 'Loading...' : 'Show weather'}
        </button>

        {weatherError && <p className="error">{weatherError}</p>}

        {weather && (
          <div className="weather-info">
            <h3>Weather in {country.name.common}</h3>
            <p>Temperature: <strong>{weather.main?.temp} °C</strong></p>
            <p>Condition: {weather.weather?.[0]?.description}</p>
            <p>Wind: {weather.wind?.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDisplay;