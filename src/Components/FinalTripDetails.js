import React from 'react';

const FinalTripDetails = (props) => {
  return (
    <div className="wrapper">
      <h1>Final Trip Details:</h1>
      <p>Departure Airport: {props.airports.departAirport.name}</p>
      <p>Destination Airport: {props.airports.destinationAirport.name}</p>
      <p>Clinic Name: {props.selectedClinic.display_name}</p>
    </div>
  )
}

export default FinalTripDetails;