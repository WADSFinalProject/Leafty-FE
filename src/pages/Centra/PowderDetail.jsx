import React from 'react';
import { useParams } from 'react-router-dom';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';
import PowderLogo from '../../assets/PowderDetail.svg';

function PowderDetail() {
  const { code, weight } = useParams();

  const expired = '1 Hour 05 Minutes'; // Example expired time
  const date = '23-21-2024'; // Example static date
  const time = '15:59'; // Example static time
  const leavesText = `Powder #${code}`;

  return (
    <>
      <LeavesType imageSrc={PowderLogo} text={leavesText} />
      <ExpiredIn expired={expired} />
      <LeavesDetail date={date} time={time} weight={weight} /> {/* Ensure weight parameter is passed */}
    </>
  );
}

export default PowderDetail;
