import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import Return from '../../components/Return';
import WetLeavesLogo from '../../assets/WetLeavesDetail.svg';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';
import { API_URL } from '../../App';

function WetLeavesDetail() {
  const { id } = useParams();
  const [wetLeaves, setWetLeaves] = useState(null);

  useEffect(() => {
    const fetchWetLeaves = async () => {
      try {
        const response = await axios.get(API_URL+`/wetleaves/get/${id}`);
        setWetLeaves(response.data);
      } catch (error) {
        console.error('Error fetching wet leaves detail:', error);
      }
    };

    fetchWetLeaves();
  }, [id]);

  if (!wetLeaves) return <div>Loading...</div>;

  const expired = "1 Hour 05 Minutes"; // Placeholder for now
  const date = new Date(wetLeaves.ReceivedTime).toLocaleDateString();
  const time = new Date(wetLeaves.ReceivedTime).toLocaleTimeString();
  const weight = `${wetLeaves.Weight} KG`;
  const leavesText = `Wet Leaves #${wetLeaves.WetLeavesID}`;

  return (
    <>
      <LeavesType imageSrc={WetLeavesLogo} text={leavesText} />
      <ExpiredIn expired={expired} />
      <LeavesDetail date={date} time={time} weight={weight} />
    </>
  );
}

export default WetLeavesDetail;
