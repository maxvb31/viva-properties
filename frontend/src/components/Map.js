import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Define a custom icon if necessary
const customIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/pin.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

const Map = ({ posts }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {posts.map((post) => (
        <Marker
          key={post.slug.current}
          position={[post.latitude, post.longitude]}
          icon={customIcon}
        >
          <Popup>
            <Link to={`/blog/${post.slug.current}`}>{post.title}</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
