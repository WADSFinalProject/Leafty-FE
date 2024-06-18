import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// Define the points for five Indonesian cities
const indonesianCities = [
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, key: 'jakarta' },
  { name: 'Surabaya', lat: -7.2575, lng: 112.7521, key: 'surabaya' },
  { name: 'Bandung', lat: -6.9175, lng: 107.6191, key: 'bandung' },
  { name: 'Medan', lat: 3.5952, lng: 98.6722, key: 'medan' },
  { name: 'Denpasar', lat: -8.6705, lng: 115.2126, key: 'denpasar' },
];

const PerformanceMap = () => {
  const [open, setOpen] = useState(null);

  const handleMarkerClick = (city) => {
    console.log("Marker clicked:", city);
    setOpen(city);
  };
  
  const handleCloseClick = () => {
    console.log("InfoWindow closed");
    setOpen(null);
  };

  return (
    <APIProvider apiKey={'AIzaSyBpSruz4Yf86sK9Xg5vTWe8X7rnnmEqZgk'}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map center={{ lat: -2.548926, lng: 118.0148634 }} zoom={5} mapId={'5f23de08f244d7c0'}>
          {indonesianCities.map((city) => (
            <AdvancedMarker
              key={city.key}
              position={{ lat: city.lat, lng: city.lng }}
              onClick={() => handleMarkerClick(city)}
            >
              <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />
            </AdvancedMarker>
          ))}

          {open && (
            <InfoWindow
              position={{ lat: open.lat, lng: open.lng }}
              onCloseClick={handleCloseClick}
            >
              <div style={{ color: 'black' }}>
                <h3>{open.name}</h3>
                <p>Coordinates: {open.lat}, {open.lng}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default PerformanceMap;