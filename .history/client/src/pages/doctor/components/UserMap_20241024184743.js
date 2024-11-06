import React from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geoJsonData from './lk.json';

// const userLocations = [
//   { id: 1, name: 'User 1', position: [8.0, 81.0] },
//   { id: 2, name: 'User 2', position: [8.1, 81.1] },
//   { id: 3, name: 'User 3', position: [8.2, 81.2] },
// ];

// Function to determine color based on the name property
const getColor = (feature) => {
  switch (feature.properties.name) {
    case 'Trikuṇāmalaya':
      return '#FF5733'; // Color for Trikuṇāmalaya
    case 'Mahanuvara':
      return '#33FF57'; // Color for another name
    case 'Yet Another Name':
      return '#3357FF'; // Color for yet another name
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
        
        {/* Add CircleMarkers for each user location */}
        {/* {userLocations.map(user => (
          <CircleMarker 
            key={user.id} 
            center={user.position} 
            radius={3}
            color="#FF5733"
            fillColor="#FF5733"
            fillOpacity={0.6}
          >
            <Popup>{user.name}</Popup>
          </CircleMarker>
        ))} */}
      </MapContainer>
    </div>
  );
};

export default UserMap;
