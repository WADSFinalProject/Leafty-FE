import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../../App';
import { useNavigate } from 'react-router-dom';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import InputField from '../../components/InputField';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import SearchLogo from '../../assets/SearchLogo.svg';
import ShipmentLongContainer from '../../components/Cards/ShipmentLongContainer';

function XYZShipmentList() {
    const [shipments, setShipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/get`);
                const fetchedShipments = response.data;

                const updatedShipments = await Promise.all(
                    fetchedShipments.map(async (shipment) => {
                        const updatedShipment = await fetchShipmentDetails(shipment);
                        return updatedShipment;
                    })
                );

                setShipments(updatedShipments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching shipments:', error);
                setLoading(false); // Ensure loading state is set to false on error
            }
        };

        fetchShipments();
    }, []);

    const fetchShipmentDetails = async (shipment) => {
        const { FlourIDs, CourierID, ShipmentID, ShipmentQuantity, ShipmentDate } = shipment;

        const flourDetails = await Promise.all(
            FlourIDs.map(async (flourID) => {
                try {
                    const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                    return {
                        FlourID: flourID,
                        Flour_Weight: flourResponse.data?.Flour_Weight || 0
                    };
                } catch (error) {
                    console.error(`Error fetching flour details for flour ID ${flourID}:`, error);
                    return {
                        FlourID: flourID,
                        Flour_Weight: 0
                    };
                }
            })
        );

        const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);

        try {
            const courierResponse = await axios.get(`${API_URL}/courier/get/${CourierID}`);
            const courierName = courierResponse.data?.CourierName || 'Unknown Courier';

            return {
                ...shipment,
                ShipmentWeight: totalFlourWeight,
                CourierName: courierName
            };
        } catch (error) {
            console.error(`Error fetching courier details for courier ID ${CourierID}:`, error);
            return {
                ...shipment,
                ShipmentWeight: totalFlourWeight,
                CourierName: 'Unknown Courier'
            };
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleShipmentClick = (shipment) => {
        navigate(`/xyzmobile/tracker/${shipment.ShipmentID}`);
    };

    const filteredShipments = shipments.filter((shipment) =>
        shipment.ShipmentID.toString().includes(searchTerm) ||
        shipment.ShipmentQuantity.toString().includes(searchTerm) ||
        (shipment.ShipmentDate && shipment.ShipmentDate.includes(searchTerm))
    );

    if (loading) {
        return <LoadingBackdrop />;
    }

    return (
        <>
            <div className="mt-4 flex justify-center items-center gap-3">
                <InputField
                    icon={SearchLogo}
                    placeholder="Search"
                    className="max-w-none"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="ml-1">
                    <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                        <img src={InnerPlugins} alt="InnerPlugins" className="w-8 h-8" />
                    </WidgetContainer>
                </div>
            </div>

            <div className="flex flex-col gap-2">
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
                            dateValue={item.ShipmentDate ? formatDate(item.ShipmentDate) : 'Not Delivered'}
                            expeditionId={item.ShipmentID}
                            onClick={() => handleShipmentClick(item)}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

function formatDate(dateString) {
    if (!dateString) return 'Not Delivered';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

export default XYZShipmentList;
