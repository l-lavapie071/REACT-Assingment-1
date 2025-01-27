import React, { useEffect, useState } from "react";
import DisplayWeatherAndTemp from "../components/DiplayWeatherAndTemp";
import SearchLocation from "../components/SearchLocation";
import "../App.css";

//fetch location.json from public folder
export default function FetchJsonData() {
  const [data, setData] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (data) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 3000); // Change location every 3 seconds

      return () => clearInterval(interval);
    }
  }, [data]);

  return (
    <div>
      {data ? (
        <>
          <div className="app">
            <h1 className="title">Weather App</h1>
            <SearchLocation locations={data} />
            <DisplayWeatherAndTemp location={data[currentIndex]} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
