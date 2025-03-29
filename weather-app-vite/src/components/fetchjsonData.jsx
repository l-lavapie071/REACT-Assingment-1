import React, { useState, useEffect } from "react";
import DisplayWeatherAndTemp from "../components/DisplayWeatherAndTemp";
import useFetchLocations from "../hooks/useFetchLocations"; // Import the hook
import "../App.css";

export default function FetchJsonData() {
  const { data, loading, error } = useFetchLocations(); // Use the custom hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data.length > 0 && !searchTerm) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 3000); // Change location every 3 seconds

      return () => clearInterval(interval);
    }
  }, [data, searchTerm]);

  const filteredLocations = searchTerm
    ? data.filter((location) =>
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>

      {data.length > 0 && (
        <div className="display-weather">
          <DisplayWeatherAndTemp location={data[0]} />
        </div>
      )}

      <div className="search-location">
        <input
          type="text"
          placeholder="Search for a location"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <div key={index}>
              <DisplayWeatherAndTemp location={location} />
            </div>
          ))
        ) : (
          searchTerm && <p>No results found.</p>
        )}
      </div>

      {!searchTerm && data.length > 0 && (
        <div className="display-weather">
          <DisplayWeatherAndTemp location={data[currentIndex]} />
        </div>
      )}
    </div>
  );
}
