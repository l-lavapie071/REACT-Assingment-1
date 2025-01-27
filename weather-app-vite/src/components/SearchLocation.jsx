import React, { useState } from "react";
import DisplayWeatherAndTemp from "../components/DiplayWeatherAndTemp";

function SearchLocation({ locations }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLocations = searchTerm
    ? locations.filter((location) =>
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  //console.log(filteredLocations);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* <div>
        {filteredLocations.map((location, index) => (
          <div key={index}>{location}</div>
        ))}
      </div> */}
      <div>
        {filteredLocations.map((location, index) => (
          <div key={index}>
            <DisplayWeatherAndTemp location={location} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchLocation;
