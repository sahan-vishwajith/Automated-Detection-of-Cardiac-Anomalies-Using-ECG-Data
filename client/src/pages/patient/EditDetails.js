import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import page_image from './photos/page_image.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { yellow } from '@mui/material/colors';
import { FormControl, InputLabel, Select } from '@mui/material';

export default function PatientEditForm() {
  const location = useLocation();
  const { patient } = location.state || { patient: {} }; // Provide default empty object for safety

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
      name: patient.name,
      address: patient.address,
      email: patient.email,
      username:patient.username,
      district: patient.district
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
    setIsLoading(true); // Set loading to true when form is being submitted
    try {
      const response = await fetch('http://localhost:3000/Patient/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        navigate('/Patient', { state: { patient: data } });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Turn off loading after submission
    }
  };

  const textFieldStyles = {
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
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/Patient"
          state={{ patient }}
          sx={{
            backgroundColor: '#7b1fa2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#4a148c',
            },
          }}
        >
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
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(167, 29, 239, 0.3)',
            padding: 4,
            overflowY: 'auto',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Edit Your Details
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
                  value={formValues.name}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="idNumber"
                  label="ID Number"
                  name="idNumber"
                  value={patient.idNumber || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                  <InputLabel id="district-label">District</InputLabel>
                  <Select
                    required
                    labelId="district-label"
                    id="district"
                    name="district"
                    value={formValues.district ||''} 
                    onChange={handleChange}
                    autoComplete="district"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {[
                    "Ampara",
                      "Anuradhapura",
                      "Badulla",
                      "Batticaloa",
                      "Colombo",
                      "Galle",
                      "Gampaha",
                      "Hambantota",
                      "Jaffna",
                      "Kalutara",
                      "Kandy",
                      "Kegalle",
                      "Kilinochchi",
                      "Mannar",
                      "Matale",
                      "Matara",
                      "Monaragala",
                      "Nuwara Eliya",
                      "Polonnaruwa",
                      "Puttalam",
                      "Ratnapura",
                      "Trincomalee",
                      "Vavuniya"
                    ].map((district) => (
                      <MenuItem key={district} value={district}>
                        {district.toUpperCase()} {/* Convert district names to uppercase */}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bday"
                  label="Birthday"
                  name="bday"
                  value={patient.bday?.split('T')[0] || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldStyles}
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
                  value={patient.gender || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldStyles}
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
                  value={formValues.email}
                  onChange={handleChange}
                  sx={design}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="medicalHistory"
                  label="Medical History"
                  name="medicalHistory"
                  multiline
                  rows={4}
                  value={patient.medicalHistory || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldStyles}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: '#7b1fa2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#4a148c',
                },
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Add PropTypes for patient object validation
PatientEditForm.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    idNumber: PropTypes.string.isRequired,
    bday: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    medicalHistory: PropTypes.string.isRequired,
    doctor: PropTypes.string.isRequired,
  }),
};
