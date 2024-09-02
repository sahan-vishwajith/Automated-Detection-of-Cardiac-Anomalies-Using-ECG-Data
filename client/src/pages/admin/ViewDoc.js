import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import page_image from "./photos/page_image.jpg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ef6c00", // Darker shade of orange for the header
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#ffe0b2", // Lighter shade of orange for odd rows
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#ffcc80", // Medium shade of orange for even rows
    },
    // Hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
export default function Doctors(props) {
  
  const [doctors, setDoctors] = useState([]);

  // Fetch the patients data when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/Admin/Doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',

        });

        if (response.ok) {
          const data = await response.json();
          setDoctors(data); // Store the data in the state
        } else {
          alert('Failed to fetch doctors.');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    };

    fetchPatients();
  }, []); 


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        height: '100vh', 
        padding: 2,
        position: 'relative', 
        backgroundImage: `url(${page_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
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

      <Box
        sx={{
          width: '80%', // Table container width
          height: '75%', // Table container height
          marginTop: '6%', // Margin from the top
          
        }}
      >
        <TableContainer component={Paper} 
        sx={{ maxHeight: '90%',background: 'rgba(33, 137, 228, 0.24)', 
              borderRadius: '16px',
              border: '1px solid rgba(33, 137, 228, 0.34)',
              opacity:'90%'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <StyledTableCell align="center">Doctor ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <StyledTableRow key={doctor.id}>  
                  {/* <StyledTableCell component="th" scope="row" align='center'>
                    <Link 
                      to={{
                        pathname: `/Doc/Predict`,
                      }} 
                      state={{ doctor: doctor }}
                      style={{ textDecoration: 'none', color: 'Blue' }} 
                    >
                      {doctor.id}
                    </Link>
                  </StyledTableCell> */}
                  <StyledTableCell align="center">{doctor.id}</StyledTableCell>
                  <StyledTableCell align="center">{doctor.name}</StyledTableCell>
                  <StyledTableCell align="center">{doctor.address}</StyledTableCell>
                  <StyledTableCell align="center">{doctor.email}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
