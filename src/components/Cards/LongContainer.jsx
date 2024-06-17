import React from "react";
import PropTypes from "prop-types";
import WidgetContainer from "./WidgetContainer";
import unscaled_pickup from "../../assets/icons/unscaled_pickup.svg";
import Package from "../../assets/icons/package.svg";
import date from "../../assets/icons/date.svg";
import weight from "../../assets/icons/weight_scale.svg";
import arrow_square from "../../assets/icons/arrow_square.svg";

function LongContainer({ showWeight, packageCount, weightValue, dateValue, expeditionId, onConfirm }) {
    const data = [
        {
            "image": Package,
            "value": packageCount,
            "unit": showWeight ? "Packages" : ""
        },
        {
            "image": weight,
            "value": weightValue,
            "unit": "Kg"
        },
        {
            "image": date,
            "value": dateValue,
            "unit": ""
        },
    ];

    const filteredData = showWeight ? data : data.filter(item => item.image !== weight);

    return (
        <div className={`flex flex-col container gap-1 rounded-md border-4 border-white shadow-lg p-2`} style={{ background: "radial-gradient(50%_50%_at_50%_50%,rgb(255,255,255)_0%,rgb(211.65,211.65,211.65)_100%)" }}>
            <div className="flex justify-between flex-row items-center font-semibold text-sm lg:text-base px-2">
                <div className="flex flex-row justify-center items-center gap-2">
                    <button onClick = {onConfirm}><img src={unscaled_pickup} alt="Unscaled Pickup"></img></button>
                    <span className="w-min sm:w-full">Expedition #{expeditionId}</span>
                </div>
                {filteredData.map((e, index) => (
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

LongContainer.propTypes = {
    showWeight: PropTypes.bool.isRequired,
    packageCount: PropTypes.number.isRequired,
    weightValue: PropTypes.number.isRequired,
    dateValue: PropTypes.string.isRequired,
};

export default LongContainer;