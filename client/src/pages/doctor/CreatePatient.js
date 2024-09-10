import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import page_image from "./photos/page_image.jpg";

export default function PatientForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    bday: '',
    gender: '',
    email: '',
    medicalHistory: '',
    idNumber: '',
    doctor: '',
    password: '',
    username: '',
    latitude: '',  // Added for latitude
    longitude: ''  // Added for longitude
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
      const { latitude, longitude, ...otherValues } = formValues;
      const patientData = {
        ...otherValues,
        coords: [latitude, longitude], // Include coords array with latitude and longitude
      };
      const response = await fetch('http://localhost:3000/Doc/createP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
        credentials: 'include',
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        navigate('/Doc/Predict', { state: { patient: data } });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${page_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Button variant="contained" color="primary" component={Link} to='/Doc'>
          Back
        </Button>
      </Box>
      <Container
        component="main"
        maxWidth={false}
        sx={{
          width: '80%',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(33, 137, 228, 0.34)',
            padding: 4,
            boxShadow: 3,
            overflowY: 'auto',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Patient Registration
          </Typography>
          <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
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
                  value={formValues.idNumber}
                  onChange={handleChange}
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bday"
                  label="Birthday"
                  type="date"
                  name="bday"
                  autoComplete="bday"
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  value={formValues.bday}
                  onChange={handleChange}
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
                  value={formValues.gender}
                  onChange={handleChange}
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
                  value={formValues.medicalHistory}
                  onChange={handleChange}
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
                  value={formValues.doctor}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="Username"
                  margin="normal"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  margin="normal"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Grid>
              {/* New Fields for Latitude and Longitude */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="latitude"
                  label="Latitude"
                  name="latitude"
                  autoComplete="latitude"
                  margin="normal"
                  value={formValues.latitude}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="longitude"
                  label="Longitude"
                  name="longitude"
                  autoComplete="longitude"
                  margin="normal"
                  value={formValues.longitude}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'darkblue', '&:hover': { backgroundColor: 'blue' } }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
