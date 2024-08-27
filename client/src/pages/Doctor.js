import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'; // Import Link
import Cards from '../components/Card';
import patients from "../photos/patients.jpg";
import ecg_prediction from "../photos/ecg_predict.jpg";
import Homebttn from "../components/Homebttn.js";
import { useNavigate } from 'react-router-dom';

export default function Doctor() {
  // const navigate = useNavigate()

  // const handlePatientClick = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/Doc',{method:'GET'}); // Replace with your actual endpoint
  //     if (response.ok) {
  //       const data = await response.json();
  //       navigate('/Doc/Patients', { state: { patientsData: data } });
  //     } else {
  //       alert('Failed to fetch patients.');
  //     }
  //   } catch (error) {
  //     alert('An error occurred. Please try again later.');
  //   }
  // };

  return (
    <Box
      sx={{
        backgroundColor: '#90caf9',
        height: '100vh', // Full viewport height
        position: 'relative', // To position the Homebttn absolutely
      }}
    >
      {/* Homebttn at the top right corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        <Homebttn />
      </Box>

      {/* Cards centered on the page */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 10, // Space between the cards
        }}
      >
        {/* Link wrapping the first card */}
        <Link to='/Doc/patients' style={{ textDecoration: 'none' }}>
          <Cards
            img={patients}
            title="View Patients"
            desc="View your patient details."
          />
        </Link>

        {/* Link wrapping the second card */}
        <Link to="/Doc/Predict" style={{ textDecoration: 'none' }}>
          <Cards
            img={ecg_prediction}
            title="Predict CVD"
            desc="Predict CVD using ECG data."
          />
        </Link>
      </Box>
    </Box>
  );
}
