import React, { useState, useEffect } from "react";

const WeatherForecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "1635890035cbba097fd5c26c8ea672a1";
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.list.filter(
            (item, index) => index % 8 === 0
          );
          setForecastData(groupDataByDay(filteredData));
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [API_URL, city]);

  const groupDataByDay = (data) => {
    const groupedData = {};
    data.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(forecast);
    });
    return groupedData;
  };

  return (
    <div className="weather-forecast">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {Object.keys(forecastData).map((date, index) => (
            <div className="forecast-card" key={index}>
              <h2>Date: {new Date(date).toLocaleDateString()}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Min Temp</th>
                    <th>Max Temp</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData[date].map((forecast, forecastIndex) => (
                    <tr key={forecastIndex}>
                      <td>
                        {new Date(forecast.dt * 1000).toLocaleDateString()}
                      </td>
                      <td>{forecast.main.temp_min}°C</td>
                      <td>{forecast.main.temp_max}°C</td>
                      <td>{forecast.main.pressure} hPa</td>
                      <td>{forecast.main.humidity}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
