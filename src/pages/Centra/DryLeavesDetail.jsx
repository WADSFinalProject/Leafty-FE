import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DryLeavesLogo from '../../assets/DryLeavesDetail.svg';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';
import { API_URL } from '../../App';

function DryLeavesDetail() {
  const { id } = useParams();
  const [dryLeaves, setDryLeaves] = useState(null);

  useEffect(() => {
    const fetchDryLeaves = async () => {
      try {
        const response = await axios.get(API_URL+`/dryleaves/get/${id}`);
        setDryLeaves(response.data);
      } catch (error) {
        console.error('Error fetching dry leaves detail:', error);
      }
    };

    fetchDryLeaves();
  }, [id]);

  if (!dryLeaves) return <div>Loading...</div>;

  const { Processed_Weight, Expiration, WetLeavesID } = dryLeaves;
  const date = new Date(Expiration).toLocaleDateString();
  const time = new Date(Expiration).toLocaleTimeString();
  const weight = `${Processed_Weight} KG`;
  const leavesText = `Dry Leaves #${dryLeaves.DryLeavesID}`;

  return (
    <>
      <LeavesType imageSrc={DryLeavesLogo} text={leavesText} />
      <ExpiredIn expired={Expiration} />
      <LeavesDetail date={date} time={time} weight={weight} />
    </>
  );
}

export default DryLeavesDetail;