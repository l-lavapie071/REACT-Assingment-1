import React from "react";
import PropTypes from "prop-types";
import "../WeatherDisplay.css";

function DisplayWeatherAndTemp({ location = {} }) {
  const { city = "Unknown", weather = "N/A", temperature = "N/A" } = location;

  return (
    <div className="weather-display">
      <p className="city">City: {city} </p>
      <p className="weather-info">
        Weather: {weather} | Temperature: {temperature}
      </p>
    </div>
  );
}

DisplayWeatherAndTemp.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
    weather: PropTypes.string,
    temperature: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default DisplayWeatherAndTemp;
