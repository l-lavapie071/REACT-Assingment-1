import React, { useEffect, useState } from "react";
import DisplayWeatherAndTemp from "../components/DiplayWeatherAndTemp";
import SearchLocation from "../components/SearchLocation";

export default function FetchJsonData() {
  const [data, setData] = useState(null);
  /*  const [randomIndex, setRandomIndex] = useState(null); */
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
        // Generate a random index based on the length of the data array
        /*  if (jsonData.length > 0) {
          const randomIdx = Math.floor(Math.random() * jsonData.length);
          setRandomIndex(randomIdx);
        } */
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

  /* return (
    <div>
      {data ? (
        <>
          <DisplayWeatherAndTemp location={data[randomIndex]} />
          <div>
            {data.map((location, index) => (
              <div key={index}>
                <DisplayWeatherAndTemp location={location} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  ); */

  return (
    <div>
      {data ? (
        <>
          <DisplayWeatherAndTemp location={data[currentIndex]} />

          <SearchLocation locations={data} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
