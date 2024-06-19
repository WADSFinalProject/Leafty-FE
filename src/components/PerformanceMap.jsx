import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import WetLeaves from "@assets/WetLeaves.svg";
import DryLeaves from "@assets/DryLeaves.svg";
import Powder from "@assets/Powder.svg";
import Delivery from "@assets/delivery.svg";
import { API_URL } from "../App";


const indonesianCities = [
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, key: 'jakarta' },
  { name: 'Surabaya', lat: -7.2575, lng: 112.7521, key: 'surabaya' },
  { name: 'Bandung', lat: -6.9175, lng: 107.6191, key: 'bandung' },
  { name: 'Medan', lat: 3.5952, lng: 98.6722, key: 'medan' },
  { name: 'Denpasar', lat: -8.6705, lng: 115.2126, key: 'denpasar' },
];

const PerformanceMap = () => {
  const [open, setOpen] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  
  const fetchStatistics = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/centra/statistics/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (city) => {
    setOpen(city);
    fetchStatistics(city.key);
  };

  const handleCloseClick = () => {
    setOpen(null);
    setStatistics(null);
  };

  return (
    <APIProvider apiKey={'AIzaSyBpSruz4Yf86sK9Xg5vTWe8X7rnnmEqZgk'}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map
          center={{ lat: -2.548926, lng: 118.0148634 }}
          zoom={3.7}
          options={{
            restriction: {
              latLngBounds: {
                north: 7.5,
                south: -11,
                west: 95,
                east: 141,
              },
            },
          }}
          mapId={'5f23de08f244d7c0'}
        >
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

              <span className="font-bold text-black justify-center flex text-lg">Centra AB</span>

              <div style={{ color: 'black' }} className="grid grid-cols-2 gap-2">
                <div className="flex flex-row gap-2">
                  <img src={WetLeaves}></img>
                  <div className="flex flex-col">
                    <span>Wet Leaves</span>
                    <span className="font-bold">200 Kg</span>
                  </div>
                </div>
                <div className="flex flex-row gap-2"><img src={DryLeaves}></img><div className="flex flex-col">
                  <span>Dry Leaves</span>
                  <span className="font-bold">200 Kg</span>
                </div></div>
                <div className="flex flex-row gap-2"><img src={Powder}></img><div className="flex flex-col">
                  <span>Powder</span>
                  <span className="font-bold">200 Kg</span>
                </div></div>
                <div className="flex flex-row gap-2"><img src={Delivery} className="w-8 h-8"></img><div className="flex flex-col">
                  <span>Packages Received</span>
                  <span className="font-bold">200 Packages</span>
                </div></div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default PerformanceMap;
