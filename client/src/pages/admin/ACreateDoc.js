import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import page_image from "./photos/page_image.jpg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorForm() {

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
      name: '',
      address: '',
      email: '',
      password:'',
      username:'',
      id:'',
      bday:''
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
          const response = await fetch('http://localhost:3000/Admin/createD', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
          credentials: 'include',
          });
          console.log(response)
          if (response.ok) {
            // const data = await response.json()
            // navigate('/Admin/Doctors',{state:{patient:data}}); 
            navigate('/Admin/Doctors'); 
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
        borderColor: '#bf360c',
        color: '#bf360c',
        '& fieldset': {
          borderColor: '#bf360c',
        },
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#bf360c',
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
        <Button variant="contained"  component={Link} to='/Admin' 
            sx={{ backgroundColor: '#e64a19', color: '#fff',
                '&:hover': {
                backgroundColor: '#bf360c',}
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
            width: '60%',
            height: '100%', // Make the box fill the container
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: "rgba(255, 255, 255, 0.8)", 
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(251, 120, 22, 0.3)',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            overflowY: 'auto', // Enable scrolling if content overflows
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3}}>
            Doctor Registration
          </Typography>
          <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit} >
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
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="Doctor ID"
                  name="id"
                  autoComplete="id"
                  margin="normal"
                  value={formValues.id}
                  onChange={handleChange}
                  sx={design}
                />
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
                  sx={design}
                />
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
                <TextField
                  fullWidth
                  required
                  id="username"
                  label="Username"
                  name="username"
                  margin="normal"
                  value={formValues.username}
                  onChange={handleChange}
                  sx={design}
                />
                <TextField
                  fullWidth
                  required
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  margin="normal"
                  value={formValues.password}
                  onChange={handleChange}
                  sx={design}
                />
                
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#e64a19', '&:hover': { backgroundColor: '#bf360c' } }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
