import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px'
};

function MyMapComponent({ setShowMap, setAddressDetails }) {
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState("");

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
    }
  }, []);

  const handleMapClick = async (event) => {
    const newCenter = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCenter(newCenter);
    setMarkers([{ lat: newCenter.lat, lng: newCenter.lng }]); // Reset markers to only include the new one

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
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyBpSruz4Yf86sK9Xg5vTWe8X7rnnmEqZgk"
        libraries={['advanced-markers']} 
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>
      <div>
        <h3>Selected Location Address:</h3>
        <p>{address}</p>
        <button onClick={handleSaveAddress} className="mr-2">Save Address</button>
        <button onClick={() => setShowMap(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default MyMapComponent;