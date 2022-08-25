import React, { useState } from 'react';
import axios from 'axios';

import Airport from './Components/Airport';
import Clinic from './Components/Clinic';
import Form from './Components/Form';
import FinalTripDetails from './Components/FinalTripDetails';

import './App.css';

function App() {
  const [departAirports, setDepartAirports] = useState([]);
  const [destinationAirports, setDestinationAirports] = useState([]);
  const [clinicCoords, setClinicCoords] = useState();
  const [sentClinics, setSentClinics] = useState();
  const [airportCoords, setAirportCoords] = useState();
  const [clinicFormData, setClinicFormData] = useState({ zip: "" });
  const [airportFormData, setAirportFormData] = useState({ zip: "" })
  const [airports, setAirports] = useState();
  const [selectedClinic, setSelectedClinic] = useState();

  const getDestinationAirports = async(clinic) => {
    setDestinationAirports([]);
    setClinicCoords();
    setSelectedClinic(clinic);
    const airportData = await axios.get(`http://localhost:3000/airports/?lon=${clinic.lon}&lat=${clinic.lat}`);
    setDestinationAirports(airportData.data);
  }

  const onClinicChange = (evt) => {
    setClinicFormData({ zip: evt.target.value });
  }

  const onAirportChange= (evt) => {
    setAirportFormData({ zip: evt.target.value });
  }

  // todo on submit of zip get departAirports and then 
  const onSubmit = async(evt) => {
    // Iteration 1
    // evt.preventDefault();
    // setDepartAirports([]);
    // const latLon = await axios.get(`http://localhost:3000/zips/?id=${formData.zip}`);

    // if (departAirports.length > 0) {
    //   setCoords({ lat: latLon.data.lat, lon: latLon.data.lon });
    // } else {
    //   setDepartAirports([]);
    //   setCoords();
    //   const airportData = await axios.get(`http://localhost:3000/airports/?lon=${latLon.data.lon}&lat=${latLon.data.lat}`);
    //   setDepartAirports(airportData.data);
    // }

    // Iteration 2
    evt.preventDefault();
    const latLon = await axios.get(`http://localhost:3000/zips/?id=${clinicFormData.zip}`);
    setClinicCoords({ lat: latLon.data.lat, lon: latLon.data.lon });
  }

  const onAirportSubmit = async (evt) => {
    evt.preventDefault();
    const latLon = await axios.get(`http://localhost:3000/zips/?id=${airportFormData.zip}`);
    console.log(latLon);
    setAirportCoords({ lat: latLon.data.lat, lon: latLon.data.lon });
  }

  const setAirport = async (airport) => {
    // Iteration 1
    // if (!airports) {
    //   setAirports({ departAirport: airport });
    //   setAirportCoords({ lat: airport.lat, lon: airport.lon });
    //   setDepartAirports([]);
    // } else {
    //   setAirports({ ...airports, destinationAirport: airport });
    //   setDepartAirports([]);
    //   setDestinationAirports([]);
    //   setAirportCoords();
    // }
    // Iteration 2
    const clinicsData = await axios.get(`http://localhost:3000/clinics/?lon=${airport.lon}&lat=${airport.lat}`);
    console.log(clinicsData);
    setSentClinics(clinicsData.data);
  }

  return (
    <div className="App">
      {/* 
      Iteration 1
      <Form 
        onChange={onChange} 
        onSubmit={onSubmit}
        formData={formData}
        placeholder={departAirports.length > 0 ? "destination zip" : "current zip"} 
      />
      { destinationAirports.length > 0 && <Airport airports={destinationAirports} setAirport={setAirport} /> }
      { departAirports.length > 0 && <Airport airports={departAirports} setAirport={setAirport} /> }
      { coords && <Clinic coords={coords} getAirports={getDestinationAirports} /> }
      { airports 
          && airports.departAirport 
          && airports.destinationAirport 
          && <FinalTripDetails airports={airports} selectedClinic={selectedClinic} /> 
      } */}
      {/**
       * Iteration 2
       */}
      <Form 
        onChange={onClinicChange} 
        onSubmit={onSubmit} 
        formData={clinicFormData} 
        placeholder="Current Zip for Clinics" 
      />
      { clinicCoords && <Clinic coords={clinicCoords} getAirports={getDestinationAirports} /> }
      <Airport airports={destinationAirports} setAirport={setAirport} />
      {/**
       * Iteration 3
       */}
      <Form
        onChange={onAirportChange}
        onSubmit={onAirportSubmit}
        formData={airportFormData}
        placeholder="Current Zip for Airports"
      />
      { !sentClinics && airportCoords && <Airport coords={airportCoords} setAirport={setAirport} /> }
      { sentClinics && <Clinic sentClinics={sentClinics} /> }
    </div>
  );
}

export default App;
