import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Cards from '../../components/Card.js';
import patients from "./photos/patients.jpg";
import ecg_prediction from "./photos/ecg_predict.jpg";
import LogOutBttn from "../../components/LogOutbttn.js.js";
import page_image from "./photos/page_image.jpg"; 

export default function Doctor() {

  return (
    <Box
      sx={{
        backgroundImage: `url(${page_image})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        position: 'relative', // To position the Homebttn absolutely
      }}
    >
      {/* Homebttn at the top right corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 16,
        }}
      >
        <LogOutBttn color='#0d47a1' hcolor='#1a237e' />
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
            desc="View your patient details and make a CVD prediction for an existing patient."
            bg='rgba(33, 137, 228, 0.24)'
            border= '1px solid rgba(33, 137, 228, 0.34)'
          />
        </Link>

        {/* Link wrapping the second card */}
        <Link to="/Doc/createP" style={{ textDecoration: 'none' }}>
          <Cards
            img={ecg_prediction}
            title="Predict CVD"
            desc="Make CVD predictions for a new Patient using ECG data."
            bg='rgba(33, 137, 228, 0.24)'
            border= '1px solid rgba(33, 137, 228, 0.34)'
          />
        </Link>
      </Box>
    </Box>
  );
}
