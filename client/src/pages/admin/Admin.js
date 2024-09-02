import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Cards from '../../components/Card.js';
import patients from "./photos/patients.jpg";
import register from "./photos/register.jpg"
import LogOutBttn from "../../components/LogOutbttn.js.js";
import page_image from "./photos/page_image.jpg"; 

export default function Admin() {

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
        <LogOutBttn color='#e64a19' hcolor='#bf360c'/>
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
        <Link to='/Admin/Doctors' style={{ textDecoration: 'none' }}>
          <Cards
            img={patients}
            title="View Doctors"
            desc="Access the details of doctors through here."
            bg= 'rgba(249, 74, 51, 0.38)'
            border='1px solid rgba(251, 120, 22, 0.3)'
          />
        </Link>

        {/* Link wrapping the second card */}
        <Link to="/Admin/createD" style={{ textDecoration: 'none' }}>
          <Cards
            img={register}
            title="Register a Doctor"
            desc="To register a new doctor click here."
            bg= 'rgba(249, 74, 51, 0.38)'
            border='1px solid rgba(251, 120, 22, 0.3)'
          />
        </Link>
      </Box>
    </Box>
  );
}
