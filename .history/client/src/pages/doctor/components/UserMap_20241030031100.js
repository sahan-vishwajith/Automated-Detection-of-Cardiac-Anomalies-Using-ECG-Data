import React from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geoJsonData from './lk.json';

// Sample input object
const locationCounts = { Badulla: 2, Kandy: 1 };

// Function to get coordinates for locations
const getCoordinates = (location) => {
  const coordinates = {
    Badulla: [6.9783, 81.0597], // Example coordinates for Badulla
    Kandy: [7.2906, 80.6340],    // Example coordinates for Kandy
  };
  return coordinates[location] || [0, 0]; // Default to [0, 0] if location not found
};

const generateColorByDensity = (density, maxDensity) => {
  const normalizedDensity = Math.min(density / maxDensity, 1);
  const r = Math.floor(255 * (1 - normalizedDensity)); // Red decreases with density
  const g = Math.floor(255 * normalizedDensity); // Green increases with density
  const b = 0; // Blue stays constant
  return `rgb(${r}, ${g}, ${b})`;
};

// Function to determine color based on the name property
const getColor = (feature) => {
  // You can define custom colors for specific districts here
  return '#999'; // Default color
};

const UserMap = () => {
  // Fix default icon issue for Leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  // Inline styles for the component
  const styles = {
    mapContainer: {
      height: '400px', // Set height
      width: '100%', // Full width
      maxWidth: '800px', // Optional: set a maximum width
      margin: '0 auto', // Center the map horizontally
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
  };

  // Calculate the maximum density for color scaling
  const maxDensity = Math.max(...Object.values(locationCounts));

  return (
    <div style={styles.mapContainer}>
      <MapContainer center={[8.0, 81.0]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON 
          data={geoJsonData} 
          style={(feature) => ({
            color: getColor(feature), // Set border color based on feature name
            weight: 1,
            fillOpacity: 0.3,
            fillColor: getColor(feature), // Set fill color based on feature name
          })} 
        />
        
        {/* Add CircleMarkers for each location based on the counts */}
        {Object.entries(locationCounts).map(([location, count]) => {
          const position = getCoordinates(location);
          return (
            <CircleMarker 
              key={location} 
              center={position} 
              radius={count * 3} // Scale radius based on count
              color={generateColorByDensity(count, maxDensity)} // Color based on density
              fillOpacity={0.5}
            >
              <Popup>
                {location}: {count} occurrences
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default UserMap;
