import React, { useState, useEffect } from "react";
import rainy from "./pic/rain_with_cloud.png";
import sun from "./pic/sun.png";
import thunder from "./pic/thunder.png";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d"; // Replace with your actual API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch weather data on initial render

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return sun; // Path to your sunny weather icon
      case "Rain":
        return rainy; // Path to your rainy weather icon
      case "Clouds":
        return rainy; // Path to your rainy weather icon
      case "Mist":
        return thunder; // Path to your snowy weather icon
      case "Haze":
        return thunder; // Path to your haze weather icon
      default:
        return null; // Default to some icon if condition is unknown
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" flex flex-col bg-opacity-10 p-8 rounded-lg w-80 bg-gradient-to-r from-blue-500 to-blue-700">
        <h1 className="text-white text-opacity-50 text-lg font-light text-center">{formattedDate}</h1>
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <div className="weather_data text-center">
            <h2 className="text-white text-4xl font-bold mt-4">{weatherData.name}</h2>
            <img
              className="mx-auto mt-4"
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              width="180px"
              alt="Weather Icon"
            />
            <h2 className="text-white text-5xl font-extrabold mt-4">{weatherData.main.temp}°C</h2>
            <h2 className="text-white text-lg mt-2">{weatherData.weather[0].main}</h2>
          </div>
        )}
        <form className="mt-8" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-3 rounded-t-lg focus:outline-none focus:ring focus:border-blue-500 bg-gray-200"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-b-lg hover:bg-blue-600 mt-2 transition"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
