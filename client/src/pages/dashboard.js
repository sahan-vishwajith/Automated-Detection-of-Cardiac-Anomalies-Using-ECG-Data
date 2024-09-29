import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import page_image from "./doctor/photos/page_image.jpg";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Function to create hexagon coordinates
const createHexagon = (center, size) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i; // 60 degrees
    const x = center[0] + size * Math.cos(angle);
    const y = center[1] + size * Math.sin(angle);
    points.push([y, x]); // Leaflet uses [lat, lng]
  }
  points.push(points[0]); // Close the hexagon
  return points;
};

// Generate hexagons for Sri Lanka with customizable columns per row
const generateHexagons = (center, size, rows, colsPerRow) => {
  const hexagons = [];
  for (let row = 0; row < rows; row++) {
    const cols = colsPerRow[row] || 0; // Get the number of columns for the current row
    for (let col = 0; col < cols; col++) {
      const xOffset = col * size * 0.86; // Horizontal spacing
      const yOffset = row * size * 3; // Vertical spacing
      const isOffsetRow = col % 2 === 1;
      const centerCoord = [
        center[0] + (isOffsetRow ? size * 3 / 2 : 0) + yOffset,
        center[1] + xOffset
      ];
      hexagons.push(createHexagon(centerCoord, size));
    }
  }
  return hexagons;
};

export default function Dashboard() {
  const [hexagons, setHexagons] = useState([]);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);

  useEffect(() => {
    // Center of Sri Lanka
    const center = [6.078835, 79.648922];
    const hexagonSize = 0.2; // Adjust size as needed
    const rows = 14; // Adjust number of rows
    const colsPerRow = [12, 14, 14, 13, 11, 9, 5, 0]; // Customize number of columns for each row

    const generatedHexagons = generateHexagons(center, hexagonSize, rows, colsPerRow);
    setHexagons(generatedHexagons);
  }, []);

  // Sample data for sex distribution
  const sexData = [
    { name: 'Male', value: 500 },
    { name: 'Female', value: 300 },
  ];

  // Sample data for age distribution
  const ageData = [
    { name: '0-18', value: 200 },
    { name: '19-35', value: 300 },
    { name: '36-50', value: 250 },
    { name: '51+', value: 50 },
  ];

  // Sample data for heart anomalies
  const anomalyData = [
    { name: 'Atrial Septal Defect', value: 150 },
    { name: 'Ventricular Septal Defect', value: 120 },
    { name: 'Tetralogy of Fallot', value: 100 },
    { name: 'Patent Ductus Arteriosus', value: 80 },
    { name: 'Aortic Stenosis', value: 60 },
    { name: 'Mitral Valve Prolapse', value: 40 },
    { name: 'Hypertrophic Cardiomyopathy', value: 30 },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(${page_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        boxSizing: 'border-box',
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

      <div style={{ height: "80vh", width: "80%", margin: "0 auto" }}>
        <h1>Sri Lanka Population Density Map</h1>
        
        {/* Buttons for charts */}
        <Button 
          variant="contained" 
          onClick={() => setShowPieChart(!showPieChart)}
          style={{ marginBottom: "10px" }}
        >
          {showPieChart ? "Hide Pie Chart" : "Show Pie Chart"}
        </Button>
        
        <Button 
          variant="contained" 
          onClick={() => setShowBarChart(!showBarChart)}
          style={{ marginBottom: "10px" }}
        >
          {showBarChart ? "Hide Bar Chart" : "Show Bar Chart"}
        </Button>

        {/* Pie Chart for Sex Distribution */}
        {showPieChart && (
          <PieChart width={400} height={400}>
            <Pie
              data={sexData}
              cx={200}
              cy={200}
              labelLine={false}
              label={entry => entry.name}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sexData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}

        {/* Bar Chart for Age Distribution */}
        {showBarChart && (
          <BarChart
            width={500}
            height={300}
            data={ageData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}

        {/* Bar Chart for Heart Anomalies */}
        {showBarChart && (
          <BarChart
            width={500}
            height={300}
            data={anomalyData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        )}

        <div style={{ height: "70vh", width: "100%", marginTop: "20px" }}>
          <MapContainer
            center={[7.8731, 80.7718]}
            zoom={7}
            style={{ 
              height: "70vh", 
              width: "100%",
              border: "2px solid #000",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {hexagons.map((hex, index) => (
              <GeoJSON 
                key={index} 
                data={{ type: "Feature", geometry: { type: "Polygon", coordinates: [hex] } }} 
                style={{
                  fillColor: '#FFEDA0', // Default color
                  weight: 1,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.6, // Adjust transparency if needed
                }} 
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </Box>
  );
}
