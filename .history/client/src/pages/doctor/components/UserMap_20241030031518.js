import React from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geoJsonData from './lk.json';

// Sample input object
const locationCounts = { Badulla: 2, Kandy: 1 };

// Function to get coordinates for locations (you may need to adjust this based on your actual data)
const getCoordinates = (location) => {
  const coordinates = {
    Badulla: [6.9783, 81.0597], // Example coordinates for Badulla
    Kandy: [7.2906, 80.6340],    // Example coordinates for Kandy
  };
  return coordinates[location] || [0, 0]; // Default to [0, 0] if location not found
};


const generateColorByDensity = (density, maxDensity) => {
  // Normalize density to a value between 0 and 1
  const normalizedDensity = Math.min(density / maxDensity, 1);

  // Define color ranges (from light to dark)
  const r = Math.floor(255 * (1 - normalizedDensity)); // Red decreases with density
  const g = Math.floor(255 * normalizedDensity); // Green increases with density
  const b = 0; // Blue stays constant

  // Return the color in hex format
  return `rgb(${r}, ${g}, ${b})`;
};

// Example usage

// Function to determine color based on the name property
const getColor = (feature) => {
  switch (feature.properties.name) {
    case 'Trikuṇāmalaya':
      return generateColorByDensity(location.Badulla ,5); // Color for Trikuṇāmalaya
    case 'Mulativ':
      return '#33FF57'; // Color for Mulativ
    case 'Yāpanaya':
      return '#3357FF'; // Color for Yāpanaya
    case 'Kilinŏchchi':
      return '#FF33A8'; // Color for Kilinŏchchi
    case 'Mannārama':
      return '#FF8C00'; // Color for Mannārama
    case 'Gālla':
      return '#FFD700'; // Color for Gālla
    case 'Puttalama':
      return '#8A2BE2'; // Color for Puttalama
    case 'Kaḷutara':
      return '#7FFF00'; // Color for Kaḷutara
    case 'Gampaha':
      return '#FF1493'; // Color for Gampaha
    case 'Anurādhapura':
      return '#00BFFF'; // Color for Anurādhapura
    case 'Mātale':
      return '#FF4500'; // Color for Mātale
    case 'Hambantŏṭa':
      return '#DA70D6'; // Color for Hambantŏṭa
    case 'Ratnapura':
      return '#FF6347'; // Color for Ratnapura
    case 'Maḍakalapuva':
      return '#20B2AA'; // Color for Maḍakalapuva
    case 'Mŏṇarāgala':
      return '#7B68EE'; // Color for Mŏṇarāgala
    case 'Kægalla':
      return '#FF69B4'; // Color for Kægalla
    case 'Badulla':
      return '#B22222'; // Color for Badulla
    case 'Mahanuvara':
      return '#FF8C00'; // Color for Mahanuvara
    case 'Ampāra':
      return '#4682B4'; // Color for Ampāra
    case 'Vavuniyāva':
      return '#DDA0DD'; // Color for Vavuniyāva
    case 'Kŏḷamba':
      return '#F0E68C'; // Color for Kŏḷamba
    case 'Mātara':
      return '#B8860B'; // Color for Mātara
    case 'Jaffna':
      return '#FF4500'; // Color for Jaffna
    case 'Matara':
      return '#00FA9A'; // Color for Matara
    default:
      return '#999'; // Default color
  }
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
              color="#FF5733"
              fillColor="#FF5733"
              fillOpacity={0.6}
            >
              <Popup>{`${location}: ${count}`}</Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default UserMap;
