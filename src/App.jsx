
import React, { useState } from 'react'
import './App.css'
const App = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('');
  

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    try {
      const apiKey =  '23f14508a45dd81d5a0c948e91f105f6';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather && data.weather[0] ? data.weather[0].description : 'N/A'
      });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Failed to fetch weather data. Please try again later.');
    }
  };

  return (
    <div className="app">
      <h1>Weather </h1>
      <div >
        <h2 >Welcome to the Weather App</h2>
        <div >Get the latest weather updates for your location.</div>
        <div >Enter the city</div>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64"
          placeholder="City name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div >
          <button onClick={fetchWeather}>Check</button>
        </div>
        {error && <div style={{ color: 'white' }}>{error}</div>}
        <div className="weather-info">
          {weather ? (
            <div>
              <h3>{weather.city}</h3>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Condition: {weather.condition}</p>
            </div>
          ) : (
            <p>No weather data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App