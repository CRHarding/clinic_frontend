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
  const [coords, setCoords] = useState();
  const [formData, setFormData] = useState({ zip: "" });
  const [airports, setAirports] = useState();
  const [selectedClinic, setSelectedClinic] = useState();

  const getDestinationAirports = async(clinic) => {
    setDestinationAirports([]);
    setCoords();
    setSelectedClinic(clinic);
    const airportData = await axios.get(`http://localhost:3000/airports/?lon=${clinic.lon}&lat=${clinic.lat}`);
    setDestinationAirports(airportData.data);
  }

  const onChange = (evt) => {
    setFormData({ zip: evt.target.value });
  }

  // todo on submit of zip get departAirports and then 
  const onSubmit = async(evt) => {
    evt.preventDefault();
    setDepartAirports([]);
    const latLon = await axios.get(`http://localhost:3000/zips/?id=${formData.zip}`);

    if (departAirports.length > 0) {
      setCoords({ lat: latLon.data.lat, lon: latLon.data.lon });
    } else {
      setDepartAirports([]);
      setCoords();
      const airportData = await axios.get(`http://localhost:3000/airports/?lon=${latLon.data.lon}&lat=${latLon.data.lat}`);
      setDepartAirports(airportData.data);
    }
  }

  const setAirport = (airport) => {
    if (!airports) {
      setAirports({ departAirport: airport });
      setCoords({ lat: airport.lat, lon: airport.lon });
      setDepartAirports([]);
    } else {
      setAirports({ ...airports, destinationAirport: airport });
      setDepartAirports([]);
      setDestinationAirports([]);
      setCoords();
    }
  }

  return (
    <div className="App">
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
      }
    </div>
  );
}

export default App;
