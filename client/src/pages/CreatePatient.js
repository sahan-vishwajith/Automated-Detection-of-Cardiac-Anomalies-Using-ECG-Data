import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function PatientForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        address: '',
        bday: '',
        gender: '',
        email: '',
        medicalHistory: '',
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
            const response = await fetch('http://localhost:3000/Doc/createP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues), // Send form values from state
            });
            console.log(response)
            if (response.ok) {
            navigate('/Doc/Predict'); 
            } else {
            alert('Something went wrong. Please try again.'); 
            }
        } catch (error) {
            alert('An error occurred. Please try again later.'); 
        }
    };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Patient Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          <TextField
            required
            fullWidth
            id="bday"
            label="Birthday"
            type="date"
            name="bday"
            autoComplete="birthday"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formValues.birthday}
            onChange={handleChange}
          />
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
          <TextField
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            margin="normal"
            value={formValues.email}
            onChange={handleChange}
          />
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
  );
}
