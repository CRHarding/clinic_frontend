import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Airports = (props) => {
  const { coords } = props;
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    if (coords) {
      const getAirports = async() => {
        const airportsData = await axios.get(`http://localhost:3000/airports/?lon=${coords.lon}&lat=${coords.lat}`);
        console.log(airportsData)
        setAirports(airportsData.data);
      }

      getAirports();
    }
  }, [coords])

  return (
    <div className="airports-wrapper">
      { coords && airports.map(airport => {
        return (
          <div key={airport.id} className="wrapper">
            <h2>{airport.name}</h2>
            <p>{airport.municipality}, {airport.region}</p>
            <p>{airport.iata_code}</p>
            <p>{parseInt(airport.distance)} miles away</p>
            <button onClick={() => props.setAirport(airport)}>Select Airport</button>
          </div>
        )
      })}
    </div>
  )
}

export default Airports;