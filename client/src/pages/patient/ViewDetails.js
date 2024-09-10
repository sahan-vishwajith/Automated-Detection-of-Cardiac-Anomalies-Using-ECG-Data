import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import page_image from './photos/page_image.jpg';
import patientImg from './photos/patient.jpg'
import { Link } from 'react-router-dom';
import LogOutBttn from '../../components/LogOutbttn.js';
import Button from '@mui/material/Button';

export default function PatientCard() {
  const location = useLocation();
  const { patient } = location.state || {};

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${page_image})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <LogOutBttn color='#7b1fa2' hcolor='#4a148c'/>
      </Box>
      <Card
        sx={{
          width: '50vw',  // 60% of the window width
          height: '60vh', // 50% of the window height
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(167, 29, 239, 0.3)',
          display: 'flex', // Use flexbox for layout
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: '40%' }} // Set the width of the image to 40% of the card
          image={patientImg}
          alt="Patient Image"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
          <CardContent sx={{ flex: '1 0 auto', color: 'white' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {patient.name}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>ID Number:</strong> {patient.idNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {patient.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Birthday:</strong> {new Date(patient.bday).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {patient.gender}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {patient.email}
              </Typography>
              {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                <Typography variant="body1" gutterBottom>
                  <strong>Medical History:</strong> {patient.medicalHistory.join(', ')}
                </Typography>
              )}
            </Box>
          </CardContent>
          <Button variant="contained" component={Link} to='/Patient/edit' 
            state={{patient}}
            sx={{ backgroundColor: '#7b1fa2', color: '#fff',
                '&:hover': {
                backgroundColor: '#4a148c',}
            }}>
            Edit Details
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
