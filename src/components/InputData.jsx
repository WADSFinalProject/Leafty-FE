import React, { useEffect, useState } from "react";
import axios from "axios";
import Plus from "@assets/Plus.svg";
import { API_URL } from "../App";
import WidgetContainer from "../components/Cards/WidgetContainer";
import ChoosePowderDrawer from "./ChoosePowderDrawer";
import "./InputData.css";

const InputData = ({
  Data,
  setData,
  open,
  setOpen,
  UserID,
  firstp,
  secondp,
  thirdp,
  fourthp,
  firstimg,
  secondimg,
  thirdimg,
  includeFourthSection,
  showThirdInput,
  WetLeaves = false,
  DryLeaves = false,
  Flour = false,
  Shipment = false,
}) => {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(30);
  const [wetLeaves, setWetLeaves] = useState([]);
  const [dryLeaves, setDryLeaves] = useState([]);
  const [Refresh, setRefresh] = useState(false);
  const [selectedWetLeavesID, setSelectedWetLeavesID] = useState("");
  const [selectedDryLeavesID, setSelectedDryLeavesID] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [powderIDs, setPowderIDs] = useState([]);
  const [totalFlourWeight, setTotalFlourWeight] = useState(0); // New state for total flour weight
  const [courierID, setCourierID] = useState("");
  const [shipmentQuantity, setShipmentQuantity] = useState(0);
  const [couriers, setCouriers] = useState([]);

  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const dateWithOffset = new Date(date.getTime() - offset * 60000);
    return dateWithOffset.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (WetLeaves) {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3); // Add 3 hours to the current time
      setDate(formatDate(currentDate));
    }
    if (DryLeaves) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 3); // Add 3 days to the current date
      setDate(formatDate(currentDate));
    }
    if (Flour) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 6); // Add 3 days to the current date
      setDate(formatDate(currentDate));
    }
  }, [WetLeaves, DryLeaves, Flour, drawerOpen]);

  useEffect(() => {
    if (DryLeaves) {
      const currentTime = new Date(); // Define current time inside the effect
      axios
        .get(API_URL + "/wetleaves/get_by_user/" + UserID)
        .then((response) => {
          // Filter items based on ReceivedTime and Status
          const filteredWetLeaves = response.data.filter(item =>
            new Date(item.Expiration) > currentTime && item.Status === "Awaiting"
          );
          setWetLeaves(filteredWetLeaves);
        })
        .catch((error) => {
          console.error("Error fetching wet leaves:", error);
        });
    }
  }, [DryLeaves, UserID, Refresh]);

  useEffect(() => {
    if (Flour) {
      const currentTime = new Date();
      axios
        .get(API_URL + "/dryleaves/get_by_user/" + UserID)
        .then((response) => {
          // Filter items based on ReceivedTime and Status
          const filteredDryLeaves = response.data.filter(item =>
            new Date(item.Expiration) > currentTime && item.Status === "Awaiting"
          );
          setDryLeaves(filteredDryLeaves);
        })
        .catch((error) => {
          console.error("Error fetching dry leaves:", error);
        });
    }
  }, [Flour, UserID, Refresh]);

  useEffect(() => {
    if (Shipment) {
      axios
        .get(API_URL + "/courier/get")
        .then((response) => {
          setCouriers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching couriers:", error);
        });
    }
  }, [Shipment]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const postWetLeaves = async () => {
    try {
      const response = await axios.post(API_URL + "/wetLeaves/post", {
        UserID: String(UserID),
        Weight: weight,
        ReceivedTime: new Date(),
        Expiration: date,
        Status: "Awaiting",
      });
      const newData = [
        ...Data,
        {
          WetLeavesID: response.data.WetLeavesID,
          UserID: String(UserID),
          Weight: weight,
          ReceivedTime: new Date(),
          Expiration: date,
          Status: "Awaiting",
        }
      ];

      // Update state with the new data
      setData(newData);
      console.log("Wet Leaves posted successfully:", response.data);

    } catch (error) {
      console.error("Error posting wet leaves:", error);
    }
  };

  const postDryLeaves = async () => {
    try {
      // Update the status of selected wet leaves to "Processed"
      await axios.put(API_URL + "/wetleaves/update_status/" + selectedWetLeavesID, { "Status": "Processed" });

      // Post new dry leaves
      const response = await axios.post(API_URL + "/dryleaves/post", {
        UserID: String(UserID),
        WetLeavesID: selectedWetLeavesID,
        Processed_Weight: weight,
        Expiration: date,
        Status: "Awaiting",
      });

      // Update state to remove the processed wet leaves
      const updatedWetLeaves = wetLeaves.filter(item => item.WetLeavesID !== selectedWetLeavesID);
      setWetLeaves(updatedWetLeaves);

      // Update the main data with the new dry leaves entry
      const newData = [
        ...Data,
        {
          DryLeavesID: response.data.DryLeavesID,
          UserID: String(UserID),
          WetLeavesID: selectedWetLeavesID,
          Processed_Weight: weight,
          Expiration: date,
          Status: "Awaiting",
        }
      ];
      setData(newData);

      // Reset relevant states
      setRefresh(!Refresh);
      setSelectedWetLeavesID("");
      setWeight(30);
      setDate("");

      console.log("Dry Leaves posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting dry leaves:", error);
    }
  };

  const postFlour = async () => {
    try {
      // Update the status of selected dry leaves to "Processed"
      await axios.put(API_URL + "/dryleaves/update_status/" + selectedDryLeavesID, { "Status": "Processed" });

      // Post new flour
      const response = await axios.post(API_URL + "/flour/post", {
        UserID: String(UserID),
        DryLeavesID: selectedDryLeavesID,
        Flour_Weight: weight,
        Expiration: date,
        Status: "Awaiting",
      });

      const newData = [
        ...Data,
        {
          FlourID: response.data.FlourID,
          UserID: String(UserID),
          DryLeavesID: selectedDryLeavesID,
          Flour_Weight: weight,
          Expiration: date,
          Status: "Awaiting",
        }
      ];
      setData(newData);

      // Update state to remove the processed dry leaves
      const updatedDryLeaves = dryLeaves.filter(item => item.DryLeavesID !== selectedDryLeavesID);
      setDryLeaves(updatedDryLeaves);

      // Reset relevant states
      setRefresh(!Refresh);
      setSelectedDryLeavesID("");
      setWeight(30);
      setDate("");

      console.log("Flour posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting flour:", error);
    }
  };


  const postShipment = async () => {
    console.log("Posting Shipment with data:", {
      UserID: String(UserID),
      CourierID: courierID, // Include CourierID
      ShipmentQuantity: shipmentQuantity, // Include Shipment Quantity
      FlourIDs: powderIDs.map((item) => item.FlourID), // Extract FlourIDs for posting
    });

    try {
      const response = await axios.post(API_URL + "/shipment/post", {
        UserID: String(UserID),
        CourierID: courierID, // Include CourierID
        ShipmentQuantity: shipmentQuantity, // Include Shipment Quantity
        FlourIDs: powderIDs.map((item) => item.FlourID), // Extract FlourIDs for posting
      });
      // Update the status of selected dry leaves to "Processed"
      powderIDs.map(async(item) => await axios.put(API_URL + "/flour/update_status/" + item.FlourID, { "Status": "Processed" }),)
      console.log("Shipment posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting shipment:", error);
    }
  };

  const handleSave = () => {
    console.log("Save button clicked");
    if (WetLeaves) {
      console.log("Posting Wet Leaves...");
      postWetLeaves();
    } else if (DryLeaves) {
      console.log("Posting Dry Leaves...");
      postDryLeaves();
    } else if (Flour) {
      console.log("Posting Flour...");
      postFlour();
    } else if (Shipment) {
      console.log("Posting Shipment...");
      postShipment();
    } else {
      console.log("No matching condition found");
    }
    setOpen(!open);
  };

  const handleSelectFlour = (flours) => {
    console.log("handleSelectFlour in InputData with flours:", flours);
    setPowderIDs(flours);

    // Calculate the total flour weight
    const totalWeight = flours.reduce((sum, flour) => sum + flour.Flour_Weight, 0);
    setTotalFlourWeight(totalWeight);

    setDrawerOpen(false);
  };

  return (
    <div className="w-full max-w mt-4 p-4 ">
      {/* Date Input */}
      <div className={`mb-4 ${Shipment && "hidden"}`}>
        <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1">
          {firstp}
        </p>
        <WidgetContainer
          backgroundColor="#FFFFFF"
          borderRadius="20px"
          borderWidth=""
          borderColor=""
          container={false}
          className="mt-2"
        >
          <div className="flex  justify-items-end ">
            <input
              type="datetime-local"
              className="w-full h-full bg-transparent border-none outline-none px-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </WidgetContainer>
      </div>

      {/* Weight Input */}
      <div className={`mb-4 flex flex-col items-center ${Shipment && "hidden"}`}>
        <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left self-start mb-2">
          {secondp}
        </p>
        <WidgetContainer
          backgroundColor="#FFFFFF"
          borderRadius="20px"
          borderWidth=""
          borderColor=""
          className="w-full"
          container={false}
        >
          <div className="flex">
            <input
              type="number"
              className="w-full h-full bg-transparent border-none outline-none px-2"
              placeholder="Input Number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <img src={secondimg} alt="Weight" className="w-6 h-auto mr-3" />
          </div>
        </WidgetContainer>
      </div>

      {/* Optional Third Input */}
      {showThirdInput && (
        <div className="mb-4">
          <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1">
            {thirdp}
          </p>

          <WidgetContainer
            backgroundColor="#FFFFFF"
            borderRadius="20px"
            borderWidth=""
            borderColor=""
            container={false}
            className="mt-2 h-fit"
          >
            <div className="flex flex-row flex-wrap gap-2 items-center">
              {powderIDs.map((value) => (
                <span
                  className={
                    "bg-[#94C3B3] p-2 px-4 text-[#0F7275] rounded-full"
                  }
                  key={value.FlourID}
                >{`${value.FlourID} - ${value.Flour_Weight} Kg`}</span>
              ))}
              <button
                onClick={toggleDrawer(true)}
                className={
                  "bg-[#94C3B3] rounded-full w-8 h-8 items-center justify-center flex"
                }
              >
                <img src={Plus} alt="Plus" />
              </button>
            </div>
          </WidgetContainer>
        </div>
      )}

      {/* Select Wet Leaves for Dry Leaves */}
      {DryLeaves && (
        <div className="mb-4">
          <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1">
            Select Wet Leaves
          </p>
          <WidgetContainer
            backgroundColor="#FFFFFF"
            borderRadius="20px"
            borderWidth=""
            container={false}
            borderColor=""
            className="mt-2"
          >
            <select
              className="w-full h-full bg-transparent border-none outline-none px-2"
              value={selectedWetLeavesID}
              onChange={(e) => setSelectedWetLeavesID(e.target.value)}
            >
              <option value="">Select Wet Leaves</option>
              {wetLeaves.map((wetLeaf) => (
                <option
                  key={wetLeaf.WetLeavesID}
                  value={wetLeaf.WetLeavesID}
                >{`ID: ${wetLeaf.WetLeavesID}, Weight: ${wetLeaf.Weight}`}</option>
              ))}
            </select>
          </WidgetContainer>
        </div>
      )}

      {/* Select Dry Leaves for Flour */}
      {Flour && (
        <div className="mb-4">
          <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1">
            Select Dry Leaves
          </p>
          <WidgetContainer
            container={false}
            backgroundColor="#FFFFFF"
            borderRadius="20px"
            borderWidth=""
            borderColor=""
            className="mt-2"
          >
            <select
              className="w-full h-full bg-transparent border-none outline-none px-2"
              value={selectedDryLeavesID}
              onChange={(e) => setSelectedDryLeavesID(e.target.value)}
            >
              <option value="">Select Dry Leaves</option>
              {dryLeaves.map((dryLeaf) => (
                <option
                  key={dryLeaf.DryLeavesID}
                  value={dryLeaf.DryLeavesID}
                >{`ID: ${dryLeaf.DryLeavesID}, Weight: ${dryLeaf.Processed_Weight}`}</option>
              ))}
            </select>
          </WidgetContainer>
        </div>
      )}

      {/* Optional Fourth Section */}
      {includeFourthSection && (
        <div className="mb-4 flex flex-col items-center">
          <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left self-start mb-2">
            {fourthp}
          </p>
          <WidgetContainer
            container={false}
            backgroundColor="#FFFFFF"
            borderRadius="20px"
            borderWidth=""
            borderColor=""
            className="w-full "
          >
            <div className="flex">
              <input
                disabled
                type="text"
                className="w-full h-full bg-transparent border-none outline-none px-2"
                placeholder="Input Number"
                value={totalFlourWeight + " Kg"} // Displaying the total flour weight
              />
              <img src={thirdimg} alt="Weight" className="w-6 h-auto mr-3" />
            </div>
          </WidgetContainer>
        </div>
      )}

      {/* Select Courier for Shipment */}
      {Shipment && (
        <div className="mb-4">
          <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1">
            Select Courier
          </p>
          <WidgetContainer
            container={false}
            backgroundColor="#FFFFFF"
            borderRadius="20px"
            borderWidth=""
            borderColor=""
            className="mt-2"
          >
            <select
              className="w-full h-full bg-transparent border-none outline-none px-2"
              value={courierID}
              onChange={(e) => setCourierID(e.target.value)}
            >
              <option value="">Select Courier</option>
              {couriers.map((courier) => (
                <option key={courier.CourierID} value={courier.CourierID}>
                  {courier.CourierName}
                </option>
              ))}
            </select>
          </WidgetContainer>
        </div>
      )}

      {/* Input Shipment Quantity */}
      {Shipment && (
        <div className="mb-4 flex flex-col items-center">
          <p className="font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left self-start mb-2">
            Shipment Quantity
          </p>
          <WidgetContainer
            container={false}
            backgroundColor="#FFFFFF"
            borderRadius="20px"
            borderWidth=""
            borderColor=""
            className="w-full"
          >
            <div className="flex">
              <input
                type="number"
                className="w-full h-full bg-transparent border-none outline-none px-2"
                placeholder="Input Quantity"
                value={shipmentQuantity}
                onChange={(e) => setShipmentQuantity(e.target.value)}
              />
              <img src={thirdimg} alt="Weight" className="w-6 h-auto mr-3" />
            </div>
          </WidgetContainer>
        </div>
      )}

      {/* Save Button */}
      <div className="flex items-center justify-center mt-12">
        <WidgetContainer
          container={false}
          backgroundColor="#0F7275"
          borderRadius="20px"
          border={false}
          className="w-full mr-2"
        >
          <button
            className="flex items-center justify-center w-full h-8 font-montserrat font-semibold leading-4 tracking-wide text-gray-100 text-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </WidgetContainer>
      </div>
      {Shipment & drawerOpen ? (
        <ChoosePowderDrawer
          UserID={UserID}
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          onSelectFlour={handleSelectFlour}
          weight={weight} // Passing weight to ChoosePowderDrawer
        />
      ) : <></>}
    </div>
  );
};

export default InputData;