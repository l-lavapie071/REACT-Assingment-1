import "../WeatherDisplay.css";

function DisplayWeatherAndTemp({ location }) {
  return (
    <div>
      <div className="weather-display">
        <p className="city">City: {location.city}</p>
        <p className="weather-info">Weather: {location.weather}</p>
        <p className="weather-info">Temperature: {location.temperature}</p>
      </div>
    </div>
  );
}

export default DisplayWeatherAndTemp;
