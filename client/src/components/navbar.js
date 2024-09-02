import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeIcon from '@mui/icons-material/Home';

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Home IconButton with Link */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}  // Use Link as the component
            to="/"            // Use 'to' instead of 'href'
          >
            <HomeIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CardioCare
          </Typography>
          
          {/* Login Button with Link */}
          <Button color="inherit" component={Link} to="/Admin/login" sx={{paddingRight:4}}>
            Admin
          </Button>
          <Button color="inherit" component={Link} to="/Doc/login" sx={{paddingRight:4}}>
            Doctors
          </Button>
          <Button color="inherit" component={Link} to="/Patient/login" sx={{paddingRight:2}}>
            Patients
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
