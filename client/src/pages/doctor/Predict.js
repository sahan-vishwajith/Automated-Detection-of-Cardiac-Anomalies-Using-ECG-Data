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
import patientimg from './photos/patients.jpg';
import page_image from "./photos/page_image.jpg";
import axios from 'axios'; 
import { Link, useLocation } from 'react-router-dom';
import loadingGif from './photos/ecg-gif-unscreen.gif'; // Adjusted path

export default function Predict() {
  const [selectedFiles, setSelectedFiles] = useState({ atr: null, dat: null, xws: null, hea: null });
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [ecgPlot, setEcgPlot] = useState(''); // State to store ECG plot

  const location = useLocation();
  const { patient } = location.state || {};

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    if (file && (name === 'atr' && file.name.endsWith('.atr')) || 
        (name === 'dat' && file.name.endsWith('.dat')) || 
        (name === 'xws' && file.name.endsWith('.xws')) || 
        (name === 'hea' && file.name.endsWith('.hea'))) {
      setSelectedFiles(prev => ({ ...prev, [name]: file }));
    } else {
      alert(`Please select a valid ${name.toUpperCase()} file.`);
      setSelectedFiles(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async () => {
    const { atr, dat, xws, hea } = selectedFiles;

    if (atr && dat && xws && hea) {
      setLoading(true); // Start loading
      setPrediction(''); // Clear previous prediction
      setEcgPlot(''); // Clear previous ECG plot
      const formData = new FormData();
      formData.append('atr', atr);
      formData.append('dat', dat);
      formData.append('xws', xws);
      formData.append('hea', hea);

      try {
        const response = await axios.post('http://localhost:5000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data) {
          if (response.data.prediction) {
            setPrediction(`Prediction: ${response.data.prediction}`);
          } else {
            setPrediction('No predictions returned from the server.');
          }

          if (response.data.ecg_plot) {
            setEcgPlot(response.data.ecg_plot); // Set ECG plot image
          }
        }
      } catch (error) {
        console.error('Error during prediction:', error);
        setPrediction('Error occurred during prediction.');
      } finally {
        setLoading(false); // End loading
      }
    } else {
      alert('Please select all required files before submitting.');
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
        backgroundImage: `url(${page_image})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Button variant="contained" color="primary" component={Link} to='/Doc'>
          Back
        </Button>
      </Box>
      <Grid container spacing={3}>
        {/* Left Side - Patient Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Card sx={{ width: '80%', maxWidth: 400, background: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)', border: '1px solid rgba(33, 137, 228, 0.34)' }}>
              <CardMedia component="img" height="230" image={patientimg} alt="" />
              <CardContent>
                <Typography variant="h5" component="div" >Patient Details</Typography>
                <Typography variant="body1" >Name: {patient.name}</Typography>
                <Typography variant="body1" >Birthday: {patient.bday.split('T')[0]}</Typography>
                <Typography variant="body1" >City: {patient.address}</Typography>
                <Typography variant="body1" >Medical History: {patient.medicalHistory}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Right Side - File Upload and Prediction */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '80%', maxWidth: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px', // Optional: add some border radius for better aesthetics
            padding: 2, }}>
            <TextField
              type="file"
              name="atr"
              inputProps={{ accept: '.atr' }}
              onChange={handleFileChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="file"
              name="dat"
              inputProps={{ accept: '.dat' }}
              onChange={handleFileChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="file"
              name="xws"
              inputProps={{ accept: '.xws' }}
              onChange={handleFileChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="file"
              name="hea"
              inputProps={{ accept: '.hea' }}
              onChange={handleFileChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" sx={{ background: '#1565c0', color: 'white' }} onClick={handleSubmit}>
              Submit
            </Button>

            {/* Loading GIF */}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <img src={loadingGif} alt="Loading..." style={{ width: '100px', height: '100px' }} />
              </Box>
            )}

            {/* Prediction Area */}
            {prediction && !loading && (
              <Paper sx={{ padding: 2, width: '90%', textAlign: 'center', marginTop: 2, background: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="h6">{prediction}</Typography>
              </Paper>
            )}

            {/* ECG Plot Area */}
            {ecgPlot && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">ECG Signal Plot:</Typography>
                <img src={ecgPlot} alt="ECG Plot" style={{ width: '100%', borderRadius: '8px' }} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
