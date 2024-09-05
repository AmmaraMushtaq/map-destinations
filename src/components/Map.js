// src/components/Map.js
"use client"; // Ensure this is at the top

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const libraries = ['places'];

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Set your API key
    libraries,
  });

  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((event) => {
    setSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      onClick={onMapClick}
      mapContainerStyle={{ width: '100%', height: '500px' }}
      center={{ lat: 37.7749, lng: -122.4194 }} // Default center
      zoom={10}
    >
      {selected && <Marker position={selected} />}
    </GoogleMap>
  );
};

export default Map;
