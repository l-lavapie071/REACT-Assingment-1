function DisplayWeatherAndTemp({ location }) {
  return (
    <div>
      <p>City: {location.city}</p>
      <p>Weather: {location.weather}</p>
      <p>Temperature: {location.temperature}</p>
    </div>
  );
}

export default DisplayWeatherAndTemp;
