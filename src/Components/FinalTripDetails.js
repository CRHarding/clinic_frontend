import React from 'react';

const FinalTripDetails = (props) => {
  return (
    <>
      <h1>Final Trip Details:</h1>
      <p>Departure Airport: {props.airports.departAirport.name}</p>
      <p>Destination Airport: {props.airports.destinationAirport.name}</p>
      <p>Clinic Name: {props.selectedClinic.display_name}</p>
    </>
  )
}

export default FinalTripDetails;