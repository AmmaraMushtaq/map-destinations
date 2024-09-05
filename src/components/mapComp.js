// components/MapComponent.js
import React, { useEffect } from 'react';

const MapComponent = () => {
  // Access the API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (window.google) {
      // Initialize Google Maps API with the API key
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    } else {
      // Handle the case where Google Maps script is not loaded
      console.error('Google Maps script is not loaded');
    }
  }, [apiKey]);

  return (
    <div>
      <h1>Google Maps Component</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
