import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import patientimg from '../photos/patients.jpg';

import { Link } from 'react-router-dom';

export default function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith('.dat') || file.name.endsWith('.mat'))) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid ECG data file (.dat or .mat)');
      setSelectedFile(null);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Here you would handle the file upload and prediction logic
      // For demonstration, we'll set a mock prediction
      setPrediction('Prediction: Possible Cardiovascular Disease Detected.');
    } else {
      alert('Please select a file before submitting.');
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#90caf9',
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
          left: 16,
        }}
      >
        <Button variant="contained" color="primary" component={Link} to='/Doc'>
          Back
        </Button>
      </Box>
      <Grid container spacing={3}>
        {/* Left Side - Patient Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Card
              sx={{
                width: '80%',
                maxWidth: 400,
                backgroundColor: '#42a5f5',
              }}
            >
              <CardMedia component="img" height="230" image={patientimg} alt="" />
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  Patient Details
                </Typography>
                <Typography variant="body1" color="white">
                  Name: John Doe
                </Typography>
                <Typography variant="body1" color="white">
                  Birthday: 01/01/1980
                </Typography>
                <Typography variant="body1" color="white">
                  City: New York
                </Typography>
                <Typography variant="body1" color="white">
                  Medical History: Hypertension
                </Typography>
                {/* Add more patient details as needed */}
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Right Side - File Upload and Prediction */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '80%', // Match the width of the patient card
              maxWidth: 400, // Match the max width of the patient card
            }}
          >
            <TextField
              type="file"
              inputProps={{ accept: '.dat, .mat' }}
              onChange={handleFileChange}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputBase-root': {
                  backgroundColor: '#42a5f5',
                  color: 'white',
                },
                '& .MuiButtonBase-root': {
                  color: 'white',
                },
              }}
            />
            <Button variant="contained" sx={{ backgroundColor: '#1565c0', color: 'white' }} onClick={handleSubmit}>
              Submit
            </Button>

            {/* Prediction Area */}
            {prediction && (
              <Paper
                sx={{
                  padding: 2,
                  width: '90%',
                  textAlign: 'center',
                  marginTop: 2,
                  backgroundColor: '#42a5f5',
                  color: 'white',
                }}
              >
                <Typography variant="h6">{prediction}</Typography>
              </Paper>
            )}

            {/* Submit Prediction Button */}
            {prediction && (
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#1565c0',
                  color: 'white',
                }}
              >
                Submit Prediction
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}