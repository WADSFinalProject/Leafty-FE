import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import PowderLogo from '../../assets/Powder.svg';
import PowderDetail from '../../assets/PowderDetail.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import ReadyIcon from '../../assets/ReadyIcon.svg';
import axios from 'axios';
import { API_URL } from '../../App';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import AccordionUsage from '../../components/AccordionUsage';

function Powder() {
  const [flourData, setFlourData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const UserID = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/flour/get_by_user/${UserID}`);
        setFlourData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching flour data:', error);
      }
    };

    fetchData();
  }, [UserID]);

  const handleButtonClick = (item) => {
    setSelectedData(item);
    document.getElementById('AddLeaves').showModal();
  };

  const accordions = [
    {
      summary: 'Finished Leaves',
      details: () => (
        <>
          {flourData.map((item) => (
            <div key={item.FlourID} className="flex justify-between p-1">
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <Link to={`/centra/powderdetail/${item.FlourID}`}>
                  <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                </Link>
                <div className="flex flex-col ml-3">
                  <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                    {item.Flour_Weight}
                  </span>
                  <span className="font-montserrat text-sm font-medium leading-17 tracking-wide text-left">
                    {item.FlourID}
                  </span>
                </div>
                <div className="flex ml-auto items-center">
                  <Countdown time={item.Expiration} color="#79B2B7" image={ReadyIcon} className="" />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
      defaultExpanded: true,
    },
  ];

  return (
    <>
      <div className="mt-4 flex justify-center items-center gap-3">
        <InputField icon={SearchLogo} placeholder="Search" className="max-w-none" />
        <div className="ml-1">
          <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
            <img src={InnerPlugins} alt="InnerPlugins" className="w-8 h-8" />
          </WidgetContainer>
        </div>
      </div>

      <AccordionUsage accordions={accordions} />
      {selectedData && (
        <AddLeavesPopup
          code={selectedData.code}
          time={selectedData.time}
          weight={selectedData.weight}
          date={selectedData.date}
          imageSrc={selectedData.detailImage}
          text={selectedData.text}
        />
      )}

      <Drawer
        includeFourthSection={false}
        UserID={UserID}
        Flour={true}
        showThirdInput={true}
        firstText="Expiry Date"
        secondText="Weight"
        thirdText="Dry leaves"
        firstImgSrc={Date}
        secondImgSrc={WeightLogo}
      />
    </>
  );
}

export default Powder;
