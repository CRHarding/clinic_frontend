import React, { useState, useEffect } from "react";
import './App.css';

import axios from "axios";

import Form from "./Form";
import Airports from "./Airports";
import Clinics from "./Clinics";

const App = () => {
  const [clinicFormData, setClinicFormData] = useState({ zip: "" });
  const [clinicCoords, setClinicCoords] = useState(undefined);
  const [airportFormData, setAirportFormData] = useState({ zip: "" });
  const [airportCoords, setAirportCoords] = useState(undefined);
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState();
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState();
  const onClinicChange = (e) => {
    setClinicFormData({ zip: e.target.value });
  }

  const onClinicSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.get(`http://localhost:3000/zips/?id=${clinicFormData.zip}`);
    setClinicFormData({ zip: "" });
    setClinicCoords({ lat: data.data.lat, lon: data.data.lon });
  }

  const onAirportChange = (e) => {
    setAirportFormData({ zip: e.target.value });
  }

  const onAirportSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.get(`http://localhost:3000/zips/?id=${airportFormData.zip}`);
    setAirportFormData({ zip: "" });
    setAirportCoords({ lat: data.data.lat, lon: data.data.lon });
  }

  const getAirports = (clinic) => {
    setClinicCoords(undefined);
    setAirportCoords({ lat: clinic.lat, lon: clinic.lon})
  }

  return (
    <div className="App">
      <Form 
        onChange={onClinicChange} 
        onSubmit={onClinicSubmit} 
        formData={clinicFormData} 
        placeholder="Current Zip for Clinics" 
      />
      {
        clinicCoords 
          && <Clinics 
                coords={clinicCoords} 
                getAirports={getAirports} 
              /> 
      }
      <Form
        onChange={onAirportChange}
        onSubmit={onAirportSubmit}
        formData={airportFormData}
        placeholder="Current Zip for Airports"
      />
      {
        airportCoords 
          && <Airports 
                coords={airportCoords} 
                setAirport={setSelectedDepartureAirport} 
              /> 
      }
    </div>
  );
}

export default App;
