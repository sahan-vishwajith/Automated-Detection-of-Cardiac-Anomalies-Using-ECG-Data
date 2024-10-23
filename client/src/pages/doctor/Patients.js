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

import { Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

import page_image from "./photos/page_image.jpg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1565c0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#e1f5fe", // Light blue shade for odd rows
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#b3e5fc", // Slightly darker light blue shade for even rows
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Patients(props) {
  
  const [patients, setPatients] = useState([]);
  // Fetch the patients data when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/Doc/patients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',

        });

        if (response.ok) {
          const data = await response.json();
          setPatients(data); // Store the data in the state
        }
        else if (response.status ===401){
          alert('token expired')      
        }
        else {
          alert('Failed to fetch patients.');
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
        <Button variant="contained" color="primary" component={Link} to='/Doc'>
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
              <StyledTableCell align="center">ID Number</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">BirthDay</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Medical History</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                // key ? email is the unique eliment
                <StyledTableRow key={patient.idNumber}>  
                  <StyledTableCell component="th" scope="row" align='center'>
                    <Link 
                      to={{
                        pathname: `/Doc/Predict`,
                      }} 
                      state={{ patient: patient }}
                      style={{ textDecoration: 'none', color: 'Blue' }} 
                    >
                      {patient.idNumber}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">{patient.name}</StyledTableCell>
                  <StyledTableCell align="center">{patient.bday.split('T')[0]}</StyledTableCell>
                  <StyledTableCell align="center">{patient.gender}</StyledTableCell>
                  {/* <StyledTableCell align="center">{patient.medicalHistory}</StyledTableCell> */}
                  <StyledTableCell align="center" sx={{ wordWrap: 'break-word' }}>
                    {patient.medicalHistory.map((history, index) => (
                      <div key={index}>{history}</div> // Display each item in medical history on a new line
                    ))}
                </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
