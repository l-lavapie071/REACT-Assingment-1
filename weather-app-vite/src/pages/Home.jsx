import React, { useEffect, useState } from "react";
import DisplayWeatherAndTemp from "../components/DisplayWeatherAndTemp";
import SearchLocation from "../components/SearchLocation";
import "../App.css";

//fetch location.json from public folder
export default function FetchJsonData() {
  const [data, setData] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/locations.json");

        if (!response.ok) {
          throw new Error(`error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch JSON data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
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
  /* console.log(data[0]); */

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="app">
      {data ? (
        <>
          <div className="app">
            <h1 className="title">Weather App</h1>
          </div>
          <div className="search-location">
            <input
              type="text"
              placeholder="Search for a location"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />

            {filteredLocations.map((data, index) => (
              <div key={index}>
                <DisplayWeatherAndTemp location={data} />
              </div>
            ))}
            {/* <SearchLocation locations={data} /> */}
          </div>
          <div className="display-weather">
            {!searchTerm && (
              <DisplayWeatherAndTemp location={data[currentIndex]} />
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
