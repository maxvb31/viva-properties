import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Defined a custom icon so pin icon can be used
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {post.mainImage && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                />
              )}
              <Link to={`/properties/${post.slug.current}`}>{post.title}</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
