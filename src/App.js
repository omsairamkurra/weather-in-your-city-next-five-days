import React, { useState } from "react";
import "./App.css";
import WeatherForecast from "./WeatherForecast";

const App = () => {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setSearchedCity(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather in your city</h1>
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <div className="Weather">
        {searchedCity && <WeatherForecast city={searchedCity} />}
      </div>
    </div>
  );
};

export default App;
