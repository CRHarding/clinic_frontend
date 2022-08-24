import React from 'react';

const Airport = (props) => {
  return (
    <>
      { props.airports.map(airport => {
        return (
          <div key={airport.id}>
            <h2>{airport.name}</h2>
            <p>{airport.municipality}, {airport.region}</p>
            <p>{airport.iata_code}</p>
            <p>{parseInt(airport.distance)} miles away</p>
            <button onClick={() => props.setAirport(airport)}>Select Airport</button>
          </div>
        )
      })}
    </>
  )
}

export default Airport;