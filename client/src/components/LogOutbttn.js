import * as React from 'react';
import Button from '@mui/material/Button';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link , useNavigate} from 'react-router-dom';

export default function IconLabelButtons(props) {
  const navigate = useNavigate()
  const handleLogout = async ()=>{
    try{
      await fetch ('http://localhost:3000/logout',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
      });
      navigate('/')
    }catch(err){
      console.log('Error Loging out', err)
    }
  };

  return (
    <Button
    variant="contained" 
    startIcon={<LogoutIcon />}
    onClick={handleLogout}
    sx={{
      backgroundColor: props.color, 
      color: 'white',          
      '&:hover': {
        backgroundColor: props.hcolor,
      },
    }}
  >
      Log Out
    </Button>
  );
}
