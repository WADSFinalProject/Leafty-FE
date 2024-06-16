import React from "react";
import PropTypes from "prop-types";
import WidgetContainer from "./WidgetContainer";
import Users from "../../assets/icons/Users.svg";
import At from "../../assets/icons/UserAt.svg";
import Phone from "../../assets/icons/UserPhone.svg";
import Mail from "../../assets/icons/UserMail.svg";
import arrow_square from "../../assets/icons/arrow_square.svg";

function LongUser({ showWeight = false, Atis, Mailis, Phonis, centra, harbor }) {
  const data = [
    {
      "image": At,
      "value": Atis,
      "unit": ""
    },
    {
      "image": Mail,
      "value": Mailis,
      "unit": ""
    },
    {
      "image": Phone,
      "value": Phonis,
      "unit": ""
    },
  ];

  return (
    <div className={`flex flex-col container gap-1 rounded-md border-4 border-white shadow-lg p-2`} style={{ background: "radial-gradient(50%_50%_at_50%_50%,rgb(255,255,255)_0%,rgb(211.65,211.65,211.65)_100%)" }}>
      <div className="flex justify-between flex-row items-center font-semibold text-sm lg:text-base px-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <img src={Users} alt="User"></img>
          <span className="w-min sm:w-full">{centra ? "Centra" : harbor ? "Harbor" : "User"}</span>
        </div>
        {data.map((e, index) => (
          <div key={index} className="flex flex-row justify-center items-center gap-2">
            <img src={e.image} alt="Icon"></img>
            <span>{e.value} {e.unit}</span>
          </div>
        ))}
        {showWeight ? <img src={arrow_square} alt="Arrow Square"></img> : null}
      </div>
    </div>
  );
}

LongUser.propTypes = {
  Atis: PropTypes.string.isRequired,
  Mailis: PropTypes.string.isRequired,
  Phonis: PropTypes.string.isRequired,
  centra: PropTypes.bool,
  harbor: PropTypes.bool
};

export default LongUser;
