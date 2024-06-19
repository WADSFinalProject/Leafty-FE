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
  { name: 'Centra L', lat: -6.2088, lng: 106.8456, key: '828750e0-fab5-4084-b1cf-dc912db42691' },
  { name: 'Centra O', lat: -7.2575, lng: 112.7521, key: '9c2d5870-49be-4ecd-a77d-96c19b86f89a' },
  { name: 'Centra V', lat: -6.9175, lng: 107.6191, key: '8a876510-2a66-4962-8144-8ec9bb03760a' },
  { name: 'Centra W', lat: 3.5952, lng: 98.6722, key: '56be8796-2ec3-473d-b2a2-80e0189ec2e9' },
  { name: 'Centra K', lat: -8.6705, lng: 115.2126, key: '8960e938-144d-4b3a-8390-0069454f8552' },
  { name: 'Centra J', lat: -6.178306, lng: 106.631889, key: '687d1731-579d-4bd3-9328-57ad03eb933f' },
  { name: 'Centra AW', lat: -6.966667, lng: 110.416664, key: 'f122e0bd-47bb-4563-842e-331d4534d814' },
  { name: 'Centra XY', lat: 1.045626, lng: 104.030457, key: '7cba9db3-387b-47c7-bf57-adac79cdb6d0' },
  { name: 'Centra XZ', lat: -2.990934, lng: 104.756556, key: '4638e149-d170-4649-9853-9f8c3b6e1d16' },
  { name: 'Centra BB', lat: -1.269160, lng: 116.825262, key: '3bbc1e64-4ff9-4dc4-9cc3-70a921397bb0' },
  { name: 'Centra BC', lat: 0.533520, lng: 101.450622, key: '2623747a-2d61-4747-bc9c-567b8a2fa94c' },
  { name: 'Centra BD', lat: 1.130103, lng: 104.048126, key: '2f0b3e26-276d-40e0-993b-81b6dfc57d40' },
  { name: 'Centra BE', lat: 5.548290, lng: 95.323753, key: 'f38da8bb-c1c8-48e6-80d8-7597cb7a3dfd' },
  { name: 'Centra BF', lat: -5.147665, lng: 119.432734, key: '042b1693-a180-431b-82c1-8a8d395b781f' },
  { name: 'Centra AB', lat: -7.797068, lng: 110.370529, key: '0de15ba4-ed58-4582-9b87-bd0f6e7c9998' },
  { name: 'Centra BG', lat: -7.966620, lng: 112.632629, key: '3a3218b5-2013-4e4e-9a33-c2d07769fda1' },
  { name: 'Centra BH', lat: 1.474830, lng: 124.842079, key: '5de7f87c-fd60-4204-9e47-674517ae91cb' },
  { name: 'Centra BI', lat: -0.502106, lng: 117.153709, key: 'cd912bc3-9faf-4743-a70d-9aa7788a3ea7' },
  { name: 'Centra BJ', lat: -10.177638, lng: 123.607032, key: '8d69e7d3-38e4-4b16-b48f-93e9b4154ac3' },
  { name: 'Centra BK', lat: -2.533710, lng: 140.718132, key: 'dd674f1c-9feb-48aa-9c1c-d6eee93a58cc' },
  { name: 'Centra G', lat: -0.947083, lng: 100.417183, key: '2072f15d-4e84-442f-862b-f69c10947bfb' },
  { name: 'Centra BL', lat: -0.026330, lng: 109.342503, key: '5867c638-eb1f-49ba-b1d2-b4af8867ab52' },
  { name: 'Centra AA', lat: -3.324926, lng: 114.590752, key: '49fdc6b5-8313-43a2-80fd-03794fd9564e' },
  { name: 'Centra AC', lat: -8.583333, lng: 116.116667, key: 'd9c3db24-2813-47f2-9b1e-33d45cd88ca3' },
  { name: 'Centra AD', lat: 0.790361, lng: 127.374844, key: '27bcce4b-f21c-4d43-a589-6d43d28a7c65' },
  { name: 'Centra AF', lat: -3.654703, lng: 128.190674, key: '80288beb-a932-41ce-8bac-2f9554a37f75' },
  { name: 'Centra AG', lat: -0.898898, lng: 119.870704, key: '7649f219-84a1-4d31-a238-ce1bfbbdd7b6' },
  { name: 'Centra AH', lat: 0.548888, lng: 123.074013, key: '46c886eb-66ea-4291-8a63-85126415b26f' },
  { name: 'Centra AI', lat: -3.997109, lng: 122.512974, key: '890eb9a7-ee8e-4c04-afff-bbd83ed2498e' },
  { name: 'Centra AJ', lat: -0.883200, lng: 131.254709, key: '7e429c38-2ce9-4e8c-84fa-b35ca6418125' },
  { name: 'Centra LLL', lat: 3.313223, lng: 117.591568, key: '835411e2-50cb-46a0-a5ab-e3033f5cbbf3' },
  { name: 'Centra AZ', lat: -5.615456, lng: 132.734764, key: '1569acf8-00ca-4935-8ad2-94fba9073d5c' },
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
              <div>
                <span className="font-bold text-black justify-center flex text-lg">{open.name}</span>
                <div style={{ color: 'black' }} className="grid grid-cols-2 gap-2">
                  {error ? (
                    <div>Error: {error}</div>
                  ) : loading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <div className="flex flex-row gap-2">
                        <img src={WetLeaves} alt="Wet Leaves"/>
                        <div className="flex flex-col">
                          <span>Wet Leaves</span>
                          <div className="flex flex-row gap-2">
                          <span className="font-bold">{statistics ? statistics.sum_wet_leaves  : 'N/A'}</span> Kg
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <img src={DryLeaves} alt="Dry Leaves"/>
                        <div className="flex flex-col">
                          <span>Dry Leaves</span>
                          <div className="flex flex-row gap-2">
                          <span className="font-bold">{statistics ? statistics.sum_dry_leaves : 'N/A'}</span> Kg
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <img src={Powder} alt="Powder"/>
                        <div className="flex flex-col">
                          <span>Powder</span>
                          <div className="flex flex-row gap-2">
                          <span className="font-bold">{statistics ? statistics.sum_flour : 'N/A'}</span> Kg
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <img src={Delivery} className="w-8 h-8" alt="Packages Received"/>
                        <div className="flex flex-col">
                          <span>Packages Received</span>
                          <div className="flex flex-row gap-2">
                          <span className="font-bold">{statistics ? statistics.sum_shipment_quantity : 'N/A'}</span> Kg
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default PerformanceMap;
