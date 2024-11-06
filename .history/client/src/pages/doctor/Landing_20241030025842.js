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
import { useState, useEffect } from "react";

import calender from'./photos/calendar_16290939.png'
import patient from'./photos/patient_15090791.png'
import doctor from'./photos/doctor_4131330.png'
import target from'./photos/target_10634893.png'

export default function Landing() {
    const cc = {
        "Male": 1,
        "Female": 0
    }
  const [docCount, setDocCount] = useState(null);
  const [patientCount, setPatientCount] = useState(null);
  const [predictComp, setPredictComp] = useState(null);
  const [genderCount, setGenderComp]= useState(null)
  const [districtComp, setDistrictComp]= useState(null)
  const [loading, setLoading] = useState(true);
  console.log(districtComp)
  useEffect(() => {
    // Define async functions to fetch data from each API endpoint
    const fetchDocCount = async () => {
        const response = await fetch('http://localhost:3000/docCount');
        const data = await response.json();
        setDocCount(data.totalDocCount);
      };
  
      const fetchPatientCount = async () => {
        const response = await fetch('http://localhost:3000/patientCount');
        const data = await response.json();
        setPatientCount(data.totalPatientCount);
      };
  
      const fetchPredictComp = async () => {
        const response = await fetch('http://localhost:3000/predComp');
        const data = await response.json();
        setPredictComp(data.predictionComposition);
      };

      const fetchGenderComp = async () => {
        const response = await fetch('http://localhost:3000/genderCount');
        const data = await response.json();
        setGenderComp(data.composition);
      };

      const fetchDistrictComp = async () => {
        const response = await fetch('http://localhost:3000/districtComp');
        const data = await response.json();
        setDistrictComp(data);
      };

    // Call each function and set loading to false when all are done
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchDocCount(), fetchPatientCount(), fetchPredictComp(), fetchGenderComp(), fetchDistrictComp()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
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
          width:'580px',
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
          height: '100%px',
          width: '100%',
          maxWidth: '670px',
          alignSelf: 'center',
        },
      };

      if (loading) {
        return <p>Loading data...</p>; // Display loading message or spinner if data is still loading
      }
    return (
        <div style={styles.dashboard}>
            <Navbar />
            <WelcomeCard />

            <div style={styles.container}>
                <div style={styles.chartContainer}>
                    <div style={styles.cardContainer}>
                        <div style={styles.row}>
                            <div style={styles.row}>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Total registered patient" value={patientCount} percentage={(patientCount)/(patientCount + docCount)} icon={patient} />
                                </div>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Total registered doctors" value={docCount} percentage={(docCount)/(patientCount + docCount)} icon={doctor} />
                                </div>
                            </div>
                            <div style={styles.row}>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Prediction Accuracy" value="98" percentage={4.7} icon={target}/>
                                </div>
                                <div style={styles.statsCard}>
                                    <StatsCard title="Avg prediction time" value="2,390" percentage={4.7} icon={calender} />
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
                            <PieChartComponent dataCounts={predictComp} />
                        </div>
                        <div style={{ 
                            width:'440px',
                            marginBottom:'30px',
                        }}>
                        <ComparisonComponent dataDict={genderCount}/>
                        </div>
                    </div>
                </div>
                
                <div style={styles.container}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',}} >
                        <div style={styles.mapContainer}>
                            <h4>Patient Density Map</h4>
                        <UserMap />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
         
    );
}
