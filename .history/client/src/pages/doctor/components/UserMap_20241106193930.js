import React from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geoJsonData from './lk.json';

const getCoordinates = (location) => {
  const coordinates = {
    // Example coordinates for Kandy
  };
  return coordinates[location] || [0, 0];
};

const generateColorByDensity = (density, maxDensity) => {
  if (density === undefined) return 'rgba(0, 0, 0, 0)';

  const normalizedDensity = Math.min(density / maxDensity, 1);
  let r, g, b;
  if (normalizedDensity < 0.2) {
    r = Math.floor(255 * (normalizedDensity / 0.2)); g = 0; b = 0;
  } else if (normalizedDensity < 0.4) {
    r = 100; g = 10; b = 0;
  } else if (normalizedDensity < 0.6) {
    r = Math.floor(255 * ((normalizedDensity - 0.4) / 0.2)); g = 0; b = 0;
  } else if (normalizedDensity < 0.8) {
    r = 255; g = Math.floor(255 * (1 - ((normalizedDensity - 0.6) / 0.2))); b = 0;
  } else {
    r = 255; g = 0; b = 0;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

const getColor = (feature, locationCounts) => {
  const totalCount = Object.values(locationCounts).reduce((acc, count) => acc + count, 0);
  const nameMap = {
    'Trikuṇāmalaya': 'Trincomalee', 'Mulativ': 'Mullaitivu', 'Yāpanaya': 'Jaffna', 'Kilinŏchchi': 'Kilinochchi',
    'Mannārama': 'Mannar', 'Gālla': 'Galle', 'Puttalama': 'Puttalam', 'Kaḷutara': 'Kalutara', 'Gampaha': 'Gampaha',
    'Anurādhapura': 'Anuradhapura', 'Mātale': 'Matale', 'Hambantŏṭa': 'Hambantota', 'Ratnapura': 'Ratnapura',
    'Maḍakalapuva': 'Badulla', 'Mŏṇarāgala': 'Monaragala', 'Kægalla': 'Kegalle', 'Badulla': 'Badulla',
    'Mahanuvara': 'Kandy', 'Ampāra': 'Ampara', 'Vavuniyāva': 'Vavuniya', 'Kŏḷamba': 'Colombo', 'Mātara': 'Matara',
    'Kilinochchi': 'Kilinochchi', 'Nuvara Ĕliya': 'Nuwara Eliya', 'Ampara': 'Ampara', 'Kuruṇægala': 'Kurunegala',
    'Pŏḷŏnnaruva': 'Polonnaruwa'
  };
  const location = nameMap[feature.properties.name];
  return generateColorByDensity(locationCounts[location], totalCount);
};

const UserMap = ({ locationCounts }) => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const styles = {
    mapContainer: {
      height: '400px', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '8px',
      overflow: 'hidden', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
  };

  const onEachFeature = (feature, layer) => {
    const totalCount = Object.values(locationCounts).reduce((acc, count) => acc + count, 0);
    const location = feature.properties.name;
    const nameMap = {
      'Trikuṇāmalaya': 'Trincomalee', 'Mulativ': 'Mullaitivu', 'Yāpanaya': 'Jaffna', 'Kilinŏchchi': 'Kilinochchi',
      'Mannārama': 'Mannar', 'Gālla': 'Galle', 'Puttalama': 'Puttalam', 'Kaḷutara': 'Kalutara', 'Gampaha': 'Gampaha',
      'Anurādhapura': 'Anuradhapura', 'Mātale': 'Matale', 'Hambantŏṭa': 'Hambantota', 'Ratnapura': 'Ratnapura',
      'Maḍakalapuva': 'Badulla', 'Mŏṇarāgala': 'Monaragala', 'Kægalla': 'Kegalle', 'Badulla': 'Badulla',
      'Mahanuvara': 'Kandy', 'Ampāra': 'Ampara', 'Vavuniyāva': 'Vavuniya', 'Kŏḷamba': 'Colombo', 'Mātara': 'Matara',
      'Kilinochchi': 'Kilinochchi', 'Nuvara Ĕliya': 'Nuwara Eliya', 'Ampara': 'Ampara', 'Kuruṇægala': 'Kurunegala',
      'Pŏḷŏnnaruva': 'Polonnaruwa'
    };
    const locationKey = nameMap[location];
    const count = locationCounts[locationKey] || 0;
    const percentage = ((count / totalCount) * 100).toFixed(2);

    layer.bindPopup(`${location}: ${percentage}% of patients`);

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, color: '#666', fillOpacity: 0.7 });
        layer.openPopup();
      },
      mouseout: (e) => {
        e.target.setStyle({ weight: 1, color: getColor(feature, locationCounts), fillOpacity: 0.3 });
        layer.closePopup();
      },
    });
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
            color: getColor(feature, locationCounts),
            weight: 1,
            fillOpacity: 0.3,
            fillColor: getColor(feature, locationCounts),
          })}
          onEachFeature={(feature, layer) => onEachFeature(feature, layer)}
        />
        {Object.entries(locationCounts).map(([location, count]) => {
          const position = getCoordinates(location);
          return (
            <CircleMarker 
              key={location}
              center={position}
              radius={count * 3}
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
