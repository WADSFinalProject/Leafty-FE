import React from 'react';
import { useParams } from 'react-router-dom';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';
import WetLeavesLogo from '../../assets/WetLeavesDetail.svg';


function DryLeavesDetail() {
  const { code, time, weight } = useParams();

  const expired = time; // Assuming the expired time is the same as the passed time parameter
  const date = '23-21-2024'; // Example static date
  const leavesText = `Dry Leaves #${code}`;

  return (
    <>
      <LeavesType imageSrc={WetLeavesLogo} text={leavesText} />
      <ExpiredIn expired={expired} />
      <LeavesDetail date={date} time={time} weight={weight} />
    </>
  );
}

export default DryLeavesDetail;
