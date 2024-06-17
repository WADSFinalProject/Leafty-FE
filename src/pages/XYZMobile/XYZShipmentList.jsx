import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ShipmentLongContainer from "../../components/Cards/ShipmentLongContainer";
import InputField from '../../components/InputField';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import SearchLogo from '../../assets/SearchLogo.svg';
import axios from 'axios';
import { API_URL } from "../../App"; 
import { useNavigate } from 'react-router-dom'; 

function XYZShipmentList() {
    const [shipments, setShipments] = useState([]);
    const [flourDetails, setFlourDetails] = useState({});
    const [shipmentFlourAssociations, setShipmentFlourAssociations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 
    
    function formatDate(dateString) {
        if (!dateString) return "Not Delivered";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return "    "+date.toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        const fetchFlourDetails = async () => {
            try {
                console.log("Fetching all flour details from API...");
                const response = await axios.get(`${API_URL}/flour/get`);
                console.log("Flour details fetched successfully:", response.data);
                
                const flourDetailsMap = response.data.reduce((acc, flour) => {
                    acc[flour.FlourID] = flour.Flour_Weight;
                    return acc;
                }, {});

                setFlourDetails(flourDetailsMap);
            } catch (error) {
                console.error('Error fetching flour details:', error);
            }
        };

        const fetchShipmentFlourAssociations = async () => {
            try {
                console.log("Fetching shipment-flour associations from API...");
                const response = await axios.get(`${API_URL}/shipment_flour_association/get`);
                console.log("Shipment-flour associations fetched successfully:", response.data);
                setShipmentFlourAssociations(response.data);
            } catch (error) {
                console.error('Error fetching shipment-flour associations:', error);
            }
        };

        const fetchShipments = async () => {
            try {
                console.log("Fetching shipments from API...");
                const response = await axios.get(`${API_URL}/shipment/get`);
                console.log("Shipments fetched successfully:", response.data);

                const updatedShipments = await Promise.all(response.data.map(async (shipment) => {
                    const associatedFlourIDs = shipmentFlourAssociations
                        .filter(assoc => assoc.shipment_id === shipment.ShipmentID)
                        .map(assoc => assoc.flour_id);

                    const totalFlourWeight = associatedFlourIDs.reduce((sum, flourID) => {
                        return sum + (flourDetails[flourID] || 0);
                    }, 0);

                    const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                    const courierName = courierResponse.data.CourierName;

                    return {
                        ...shipment,
                        ShipmentWeight: totalFlourWeight,
                        CourierName: courierName
                    };
                }));

                setShipments(updatedShipments);
                console.log('Updated shipments:', updatedShipments);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        const fetchData = async () => {
            await fetchFlourDetails();
            await fetchShipmentFlourAssociations();
            fetchShipments();
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        console.log("Search term changed:", e.target.value);
        setSearchTerm(e.target.value);
    };

    

    const handleShipmentClick = (shipment) => {
        console.log("Shipment clicked:", shipment);
        navigate(`/xyzmobile/tracker/${shipment.ShipmentID}`); 
    };

    const filteredShipments = shipments.filter(shipment =>
        shipment.ShipmentID.toString().includes(searchTerm) ||
        shipment.ShipmentQuantity.toString().includes(searchTerm) ||
        (shipment.ShipmentDate && shipment.ShipmentDate.includes(searchTerm))
    );

    console.log("Filtered shipments:", filteredShipments);

    return (
        <>
            <div className="mt-4 flex justify-center items-center gap-3">
                <InputField 
                    icon={SearchLogo} 
                    placeholder={"Search"} 
                    className={"max-w-none"}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className='ml-1'>
                    <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                        <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8' />
                    </WidgetContainer>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                {filteredShipments.map((item, index) => (
                    <motion.div
                        key={item.ShipmentID}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => handleShipmentClick(item)}
                    >
                        <ShipmentLongContainer
                            showWeight={true}
                            packageCount={item.ShipmentQuantity}
                            weightValue={item.ShipmentWeight}
                            dateValue={formatDate(item.ShipmentDate)}
                            expeditionId={item.ShipmentID}
                            onClick={() => handleShipmentClick(item)}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default XYZShipmentList;


