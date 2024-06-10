import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from "./Button";

const containerStyle = {
  width: '100%',
  height: '400px'
};

function getRandomCoordinates() {
  const lat = -11 + Math.random() * (6 + 11);
  const lng = 95 + Math.random() * (141 - 95);
  return { lat, lng };
}

function PerformanceMap({ setShowMap, setAddressDetails }) {
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.log("Geolocation is not supported by this browser."),
      );
    } else {
      // Default center if geolocation is not supported or permission denied
      setCenter({ lat: -2.5489, lng: 118.0149 }); // Center of Indonesia
    }
  }, []);

  useEffect(() => {
    // Generate 10 random markers within Indonesia
    const newMarkers = Array.from({ length: 10 }, () => getRandomCoordinates());
    setMarkers(newMarkers);
  }, []);

  const handleMapClick = async (event) => {
    const newCenter = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCenter(newCenter);
    setMarkers([{ lat: newCenter.lat, lng: newCenter.lng }]); // Reset markers to only include the new one

    setLatitude(newCenter.lat);
    setLongitude(newCenter.lng);

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newCenter.lat},${newCenter.lng}&key=AIzaSyBpSruz4Yf86sK9Xg5vTWe8X7rnnmEqZgk`);
    const data = await response.json();
    if (data.results[0]) {
      setAddress(data.results[0].formatted_address);
    } else {
      setAddress("Address not found");
    }
  };

  const handleSaveAddress = () => {
    setAddressDetails(address);
    setShowMap(false);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBpSruz4Yf86sK9Xg5vTWe8X7rnnmEqZgk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default PerformanceMap;
