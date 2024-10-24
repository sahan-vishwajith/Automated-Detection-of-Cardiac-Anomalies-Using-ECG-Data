import React from "react";
import Navbar from "../../components/navbar";
import page_image from "./photos/heart-rhythm-ekg-on-blue-background-vector-14155226.jpg"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import StatsCard from './components/CardDataStats';
import UsersOverview from './components/UsersOverview';
import UserMap from './components/UserMap';
import ComparisonComponent from './components/ComparisonComponent';
import PieChartComponent from './components/PieChartComponent';
import ScrollableTable from './components/ScrollableTable';
import WelcomeCard from './components/WelcomeCard';
export default function Landing() {
    const styles = {
        dashboard: {
          padding: '0px',
          backgroundColor: 'rgba(f, f,f, 0.3)',
          minHeight: '100vh',
          backgroundImage: `url(${page_image})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
        },
        cardContainer:{
            width:'38%',
            padding:'20px',
            margin:'0',
        },
        container:{
            padding:'20px'
        },
        row: {
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0px',
          flexWrap: 'wrap',
          width:'600px',
        },
        statsCard: {
          flex: '1 1 200px', // Flexible basis with a minimum size
          margin: '5px',
          maxWidth: '200px',
          minWidth: '150px', // Minimum width for smaller screens
        },
        chartContainer: {
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          margin: '20px',
          
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          padding: '0px',
          width:'97%',
          alignSelf: 'center',
        },
        mapContainer: {
          margin: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          padding: '20px',
          height: '400px',
          width: '100%',
          maxWidth: '670px',
          alignSelf: 'center',
        },
      };
    return (
        // <div 
        // style={{
        //     backgroundImage: `url(${page_image})`,
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //     backgroundRepeat: 'no-repeat',
        //     height: '100vh', 
        //     display: 'flex', 
        //     flexDirection: 'row', 
        // }}
        // >
        //     <Navbar />
            
        <div style={styles.dashboard}>
            <Navbar />
            <WelcomeCard />

            <div style={styles.container}>
                <div style={styles.chartContainer}>
                    <div style={styles.cardContainer}>
                        <div style={styles.row}>
                            <div style={styles.row}>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Total registered patient" value="2,390" percentage={4.7} />
                                </div>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Total registered doctors" value="2,390" percentage={4.7} />
                                </div>
                            </div>
                            <div style={styles.row}>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Prediction Accuracy" value="2,390" percentage={4.7} />
                                </div>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Avg prediction time" value="2,390" percentage={4.7} />
                                </div>
                            </div>
                            <div style={{ paddingRight: '50px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                padding:'0px',
                                marginLeft:'6px',
                                marginTop:'30px',

                                }}>
                                <UsersOverview />
                            </div> 
                        </div>
                        
                    </div>
                    <div style={styles.row}>
                        <div style={{ paddingRight: '40px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding:'30px',
                            height:'430px',
                            marginBottom:'30px',
                        }}>
                            <PieChartComponent />
                        </div>
                        <div style={{ 
                            width:'440px',
                            marginBottom:'30px',
                        }}>
                        <ComparisonComponent />
                        </div>
                    </div>
                </div>
                
                <div style={styles.container}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',}} >
                        <div style={styles.mapContainer}>
                        <UserMap />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
}
