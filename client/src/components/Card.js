import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Cards(props) {
  return (
    // <Card sx={{ background: 'rgba(33, 137, 228, 0.24)', 
    //   borderRadius: '16px',
    //   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    //   backdropFilter: 'blur(5px)',
    //   WebkitBackdropFilter: 'blur(5px)',
    //   border: '1px solid rgba(33, 137, 228, 0.34)',maxWidth:'340px' }}>
    <Card sx={{ background: props.bg, 
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      border: props.border ,maxWidth:'340px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= "230"
          image={props.img}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
