// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// // import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import HomeIcon from '@mui/icons-material/Home';

// import { Link } from 'react-router-dom';

// export default function Navbar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//             href='/'
//           >
//             {/* <VolunteerActivismIcon /> */}
//             <HomeIcon/>
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
//             CardioCare 
//           </Typography>
          
//           <Button color="inherit" href='/Sign'>Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }


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
          <Button color="inherit" component={Link} to="/Doc/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
