import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import page_image from "./doctor/photos/page_image.jpg";
import { Link } from "react-router-dom";

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

// Function to get color based on population density
const getColorByDensity = (density) => {
  if (density > 1000) return '#800026'; // Dark red
  if (density > 500) return '#BD0026'; // Red
  if (density > 200) return '#E31A1C'; // Light red
  if (density > 100) return '#FC4E2A'; // Orange
  if (density > 50) return '#FD8D3C'; // Light orange
  return '#FFEDA0'; // Light yellow
};

export default function Dashboard() {
  const [hexagons, setHexagons] = useState([]);
  const [showDensityMap, setShowDensityMap] = useState(false); // State to toggle map type

  useEffect(() => {
    // Center of Sri Lanka
    const center = [6.078835, 79.648922];
    const hexagonSize = 0.2; // Adjust size as needed
    const rows = 14; // Adjust number of rows
    const colsPerRow = [12, 14, 14, 13, 11, 9, 5, 0]; // Customize number of columns for each row

    const generatedHexagons = generateHexagons(center, hexagonSize, rows, colsPerRow);
    setHexagons(generatedHexagons);
  }, []);

  // Generate random population density for each hexagon
  const populationDensities = hexagons.map(() => Math.floor(Math.random() * 1200)); // Random density between 0 and 1200

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
        <Button 
          variant="contained" 
          onClick={() => setShowDensityMap(!showDensityMap)}
          style={{ marginBottom: "10px" }}
        >
          {showDensityMap ? "Show Normal Map" : "Show Density Map"}
        </Button>
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
          {showDensityMap && hexagons.map((hex, index) => (
            <GeoJSON 
              key={index} 
              data={{ type: "Feature", geometry: { type: "Polygon", coordinates: [hex] } }} 
              style={{
                fillColor: getColorByDensity(populationDensities[index]), // Color based on random density
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
    </Box>
  );
}
