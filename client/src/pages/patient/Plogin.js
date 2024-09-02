
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import page_image from "./photos/page_image.jpg";
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function AdminLogin() {
  const navigate = useNavigate();

  // State to store username and password
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  // Handle change in text fields
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
      const response = await fetch('http://localhost:3000/Patient/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues), // Send form values from state
        credentials: 'include',

      });

      if (response.ok) {
        const data = await response.json()
        navigate('/Patient', {state:{patient:data}}); 
      } else {
        alert('Wrong username or password, try again'); 
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${page_image})`, // Set the background image
          backgroundSize: 'cover', // Ensure the image covers the entire area
          backgroundPosition: 'center', // Center the background image
          height: '100vh', // Full viewport height
          position: 'relative', // To position th
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
          }}
        >
        <Button variant="contained"  component={Link} to='/' 
            sx={{ backgroundColor: '#7b1fa2', color: '#fff',
                '&:hover': {
                backgroundColor: '#4a148c',}
            }}>
          Back
        </Button>
        </Box>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(167, 29, 239, 0.31)', 
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(167, 29, 239, 0.3)', 
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                value={formValues.username} 
                onChange={handleChange} 
                sx={design}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password} // Set the value from state
                onChange={handleChange} // Handle change in the field
                sx={design}
              />
              <Button
                type="submit"

                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#7b1fa2',
                  '&:hover': {
                    backgroundColor: '#4a148c',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
