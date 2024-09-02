import React from "react";
import Navbar from "../../components/navbar";
import page_image from "./photos/page_image.jpg"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Landing() {
    return (
        <div 
        style={{
            backgroundImage: `url(${page_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'row', 
        }}
        >
            <Navbar />
            <Card 
                sx={{
                    width: '400px',  // Increased width
                    margin: '50px',
                    background: 'rgba(33, 137, 228, 0.24)', 
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    border: '1px solid rgba(33, 137, 228, 0.34)', 
                    position: 'absolute',
                    left: '50px',
                    top: '100px',
                    padding: '20px', // Added padding for content
                }}
            >
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Stay Ahead of Arrhythmia Risks
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ marginTop: '20px' }}>
                        Arrhythmias can be silent but dangerous. 
                        Don’t leave your heart health to chance. 
                        CardioCare offers early detection and precise insights,
                        helping you take control of your heart's rhythm. 
                        Choose our platform to stay informed, stay healthy, 
                        and stay ahead of potential heart issues.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
