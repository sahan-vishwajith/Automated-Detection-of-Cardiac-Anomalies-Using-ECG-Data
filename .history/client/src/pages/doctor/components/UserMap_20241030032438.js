import React from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geoJsonData from './lk.json';

// Sample input object

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
  const g = Math.floor(255 * (1 - normalizedDensity)); // Red decreases with density
  const r = Math.floor(255 * normalizedDensity); // Green increases with density
  const b = 0; // Blue stays constant

  // Return the color in hex format
  return `rgb(${r}, ${g}, ${b})`;
};

// Example usage

// Function to determine color based on the name property
const getColor = (feature , locationCounts) => {
  const totalCount = Object.values(locationCounts).reduce((acc, count) => acc + count, 0);
  switch (feature.properties.name) {
    case 'Trikuṇāmalaya':
      return generateColorByDensity(locationCounts['Trikuṇāmalaya'], totalCount); // Color for Trikuṇāmalaya
    case 'Mulativ':
      return generateColorByDensity(locationCounts['Mulativ'], totalCount); // Color for Mulativ
    case 'Yāpanaya':
      return generateColorByDensity(locationCounts['Yāpanaya'], totalCount); // Color for Yāpanaya
    case 'Kilinŏchchi':
      return generateColorByDensity(locationCounts['Kilinŏchchi'], totalCount); // Color for Kilinŏchchi
    case 'Mannārama':
      return generateColorByDensity(locationCounts['Mannārama'], totalCount); // Color for Mannārama
    case 'Gālla':
      return generateColorByDensity(locationCounts['Gālla'], totalCount); // Color for Gālla
    case 'Puttalama':
      return generateColorByDensity(locationCounts['Puttalama'], totalCount); // Color for Puttalama
    case 'Kaḷutara':
      return generateColorByDensity(locationCounts['Kaḷutara'], totalCount); // Color for Kaḷutara
    case 'Gampaha':
      return generateColorByDensity(locationCounts['Gampaha'], totalCount); // Color for Gampaha
    case 'Anurādhapura':
      return generateColorByDensity(locationCounts['Anurādhapura'], totalCount); // Color for Anurādhapura
    case 'Mātale':
      return generateColorByDensity(locationCounts['Mātale'], totalCount); // Color for Mātale
    case 'Hambantŏṭa':
      return generateColorByDensity(locationCounts['Hambantŏṭa'], totalCount); // Color for Hambantŏṭa
    case 'Ratnapura':
      return generateColorByDensity(locationCounts['Ratnapura'], totalCount); // Color for Ratnapura
    case 'Maḍakalapuva':
      return generateColorByDensity(locationCounts['Maḍakalapuva'], totalCount); // Color for Maḍakalapuva
    case 'Mŏṇarāgala':
      return generateColorByDensity(locationCounts['Mŏṇarāgala'], totalCount); // Color for Mŏṇarāgala
    case 'Kægalla':
      return generateColorByDensity(locationCounts['Kægalla'], totalCount); // Color for Kægalla
    case 'Badulla':
      return generateColorByDensity(locationCounts['Badulla'], totalCount); // Color for Badulla
    case 'Mahanuvara':
      return generateColorByDensity(locationCounts['Mahanuvara'], totalCount); // Color for Mahanuvara
    case 'Ampāra':
      return generateColorByDensity(locationCounts['Ampāra'], totalCount); // Color for Ampāra
    case 'Vavuniyāva':
      return generateColorByDensity(locationCounts['Vavuniyāva'], totalCount); // Color for Vavuniyāva
    case 'Kŏḷamba':
      return generateColorByDensity(locationCounts['Kŏḷamba'], totalCount); // Color for Kŏḷamba
    case 'Mātara':
      return generateColorByDensity(locationCounts['Mātara'], totalCount); // Color for Mātara
    case 'Jaffna':
      return generateColorByDensity(locationCounts['Jaffna'], totalCount); // Color for Jaffna
    case 'Matara':
      return generateColorByDensity(locationCounts['Matara'], totalCount); // Color for Matara
    default:
      return '#333'; // Color for Badulla
}

};


const UserMap = (locationCounts) => {
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
            color: getColor(feature,locationCounts), // Set border color based on feature name
            weight: 1,
            fillOpacity: 0.3,
            fillColor: getColor(feature,locationCounts), // Set fill color based on feature name
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
