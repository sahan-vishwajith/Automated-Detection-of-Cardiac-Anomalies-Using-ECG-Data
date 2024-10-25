import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import page_image from './photos/bachground.jpg';
import patientImg from './photos/handsome-confident-smiling-man-with-hands-crossed-chest.jpg'
import { Link } from 'react-router-dom';
import LogOutBttn from '../../components/LogOutbttn.js';
import Button from '@mui/material/Button';
import HeartDiseaseCard from './HeartArrhythmiaCard.js';

const ecgSampleData = [0.2, 0.3, 0.15, -0.2, 0.25,]; // Replace with actual ECG data


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
          width: '22vw',  // 60% of the window width
          height: '80vh', // 50% of the window height
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(167, 29, 239, 0.3)',
          display: 'flex', // Use flexbox for layout
          paddingLeft:'50px',
        }}
      >
        
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
          <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
          <CardMedia
      component="img"
      height="230"
      image={patientImg}
      alt="Patient"
      sx={{
        width: 150,       // Set a fixed width for the image
        height: 150,      // Set a fixed height for the image
        borderRadius: '50%', // Make it a circle
        objectFit: 'cover',  // Ensures the image covers the circular frame without distortion
        border: '3px solid #1565c0' // Optional: adds a colored border around the image
      }}
    />
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
                  {/* <strong>Medical History:</strong> {patient.medicalHistory.join(', ')} */}
                  <div 
                    style={{
                      maxHeight: '92px', // Set a max height for the scrollable area
                      overflowY: 'auto',   // Enable vertical scrolling
                    }}
                  >
                    {patient.medicalHistory.map((history, index) => (
                      <div key={index}>{history}</div> // Display each item on a new line
                    ))}
                    <br></br>
                  </div>
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
          <br></br>
        </Box>
      </Card>
      <HeartDiseaseCard diseaseName="Left bundle branch block" ecgData={ecgSampleData}
       />
      
      </Box>
  );
}
