import * as React from 'react';
import Button from '@mui/material/Button';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link } from 'react-router-dom';

export default function IconLabelButtons() {
  return (
    <Button
      variant="contained" // Change to "contained" for a filled button
      startIcon={<VolunteerActivismIcon />}
      component={Link}
      to='/'
      sx={{
        backgroundColor: '#0d47a1', 
        color: 'white',          
        '&:hover': {
          backgroundColor: '#1a237e',
        },
      }}
    >
      Home Page
    </Button>
  );
}
