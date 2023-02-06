import React, { useState, useEffect }  from 'react';

import axios from 'axios';

const Clinic = (props) => {
  const { coords, getAirports } = props;
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    if (coords) {
      const getClinics = async() => {
        const clinicsData = await axios.get(`http://localhost:3000/clinics/?lon=${coords.lon}&lat=${coords.lat}`);
        setClinics(clinicsData.data);
      }

      getClinics();
    }
  }, [coords])

  return (
    <div className="clinics-wrapper">
      { clinics.map(clinic => {
        return (
          <div key={clinic.id} className="wrapper">
            <h2>Name: {clinic.display_name}</h2>
            <p>Distance: {parseInt(clinic.distance)}</p>
            <button onClick={() => getAirports(clinic)}>Select</button>
          </div>
        )
      })}
    </div>
  )
}

export default Clinic;