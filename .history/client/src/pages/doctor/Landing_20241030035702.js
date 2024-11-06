import React from "react";
import Navbar from "../../components/navbar";
import page_image from "./photos/heart-rhythm-ekg-on-blue-background-vector-14155226.jpg";
import StatsCard from './components/CardDataStats';
import UsersOverview from './components/UsersOverview';
import UserMap from './components/UserMap';
import ComparisonComponent from './components/ComparisonComponent';
import PieChartComponent from './components/PieChartComponent';
import { useState, useEffect } from "react";

export default function Landing() {
    const locationCounts = {
        "Trincomalee": 10,
        "Mullaitivu": 5,
        // ... other locations
        "Polonnaruwa": 19,
        "Nuwara Eliya": 10
    };

    const [docCount, setDocCount] = useState(null);
    const [patientCount, setPatientCount] = useState(null);
    const [predictComp, setPredictComp] = useState(null);
    const [genderCount, setGenderComp] = useState(null);
    const [districtComp, setDistrictComp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    fetch('http://localhost:3000/docCount'),
                    fetch('http://localhost:3000/patientCount'),
                    fetch('http://localhost:3000/predComp'),
                    fetch('http://localhost:3000/genderCount'),
                    fetch('http://localhost:3000/districtComp')
                ]);
                const data = await Promise.all(responses.map(res => res.json()));
                setDocCount(data[0].totalDocCount);
                setPatientCount(data[1].totalPatientCount);
                setPredictComp(data[2].predictionComposition);
                setGenderComp(data[3].composition);
                setDistrictComp(data[4]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div style={{ padding: '0px', backgroundColor: '#f0f0f0', minHeight: '100vh', backgroundImage: `url(${page_image})`, backgroundSize: 'cover' }}>
            <Navbar />
            <WelcomeCard />
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StatsCard title="Total registered patient" value={patientCount} />
                    <StatsCard title="Total registered doctors" value={docCount} />
                </div>
                <UserMap locationCounts={locationCounts} />
                <ComparisonComponent dataDict={genderCount} />
                <PieChartComponent dataCounts={predictComp} />
            </div>
        </div>
    );
}
