import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import page_image from "./photos/page_image.jpg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { yellow } from '@mui/material/colors';

export default function PatientEditForm() {
    const location = useLocation();
    const { patient } = location.state || {};

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
      name: patient.name,
      address: patient.address,
      email: patient.email,
      username:patient.username,
      
  });

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({
      ...formValues,
      [name]: value,
      });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch('http://localhost:3000/Patient/edit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
          credentials: 'include',
          });
          console.log(response)
          if (response.ok) {
            const data = await response.json()
            navigate('/Patient',{state:{patient:data}}); 
          } else {
            alert('Something went wrong. Please try again.'); 
          }
      } catch (error) {
          alert('An error occurred. Please try again later.'); 
      }
  };
  const design = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused': {
        borderColor: '#4a148c',
        color: '#4a148c',
        '& fieldset': {
          borderColor: '#4a148c',
        },
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#4a148c',
    },
  }
  return (
    <Box
      sx={{
        backgroundImage: `url(${page_image})`, // Set the background image
        backgroundSize: 'cover', // Ensure the image covers the entire area
        backgroundPosition: 'center', // Center the background image
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
          }}
        >
          <Button variant="contained"  component={Link} to='/Patient'
        state={{patient}}
          sx={{ backgroundColor: '#7b1fa2', color: '#fff',
            '&:hover': {
            backgroundColor: '#4a148c',}
        }}>
          Back
        </Button>
        </Box>
      <Container 
        component="main" 
        maxWidth={false} 
        sx={{ 
          width: '80%', 
          height: '80vh', // Set the container height to 80% of the page height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} 
      >
        <Box
          sx={{
            width: '100%',
            height: '100%', // Make the box fill the container
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: "rgba(255, 255, 255, 0.8)", 
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(167, 29, 239, 0.3)',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            overflowY: 'auto', // Enable scrolling if content overflows
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }} >
            Edit Your Detials
          </Typography>
          <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  margin="normal"
                  value={formValues.name}
                  onChange={handleChange}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="idNumber"
                  label="ID Number"
                  name="idNumber"
                  autoComplete="idNumber"
                  margin="normal"
                  value= {patient.idNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  margin="normal"
                  value={formValues.address}
                  onChange={handleChange}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bday"
                  label="Birthday"
                  name="bday"
                  autoComplete="bday"
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  value={patient.bday.split('T')[0]}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  id="gender"
                  label="Gender"
                  name="gender"
                  margin="normal"
                  value={patient.gender}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={design}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  margin="normal"
                  value={formValues.email}
                  onChange={handleChange}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="medicalHistory"
                  label="Medical History"
                  name="medicalHistory"
                  multiline
                  rows={4}
                  margin="normal"
                  value={patient.medicalHistory}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="doctor"
                  label="Doctor"
                  name="doctor"
                  autoComplete="doctor"
                  margin="normal"
                  value={patient.doctor}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={design}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#7b1fa2', color: '#fff',
                '&:hover': {
                backgroundColor: '#4a148c',}
            }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
