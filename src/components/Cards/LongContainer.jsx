import WidgetContainer from "./WidgetContainer";
import unscaled_pickup from "../../assets/icons/unscaled_pickup.svg";
import Package from "../../assets/icons/package.svg";
import date from "../../assets/icons/date.svg";
import weight from "../../assets/icons/weight_scale.svg";
import arrow_square from "../../assets/icons/arrow_square.svg";

function LongContainer(tablet, mobile) {
    console.log(tablet)
  

    const data = [
        {
            "image": Package,
            "value": 3,
            "unit": "Packages"
        },
        {
            "image": weight,
            "value": 30,
            "unit": "Kg"
        },
        {
            "image": date,
            "value": "22/07/2024",
            "unit": ""
        },
    ];

    // Filter out weight if in tablet mode
    const filteredData = data;
    
    console.log("Original data:", data);
    console.log("Filtered data:", filteredData);

    return (
        <div className = {`flex flex-col container gap-1 rounded-md border-4 border-white shadow-lg p-2`} style={{background: "background:radial-gradient(50%_50%_at_50%_50%,rgb(255,255,255)_0%,rgb(211.65,211.65,211.65)_100%)"}}>
            <div className="flex justify-between flex-row items-center font-bold text-sm lg:text-base px-2">
                <div className="flex flex-row justify-center items-center gap-2">
                    <img src={unscaled_pickup} alt="Unscaled Pickup"></img>
                    <span>Expedition #0123456</span>
                </div>
                {filteredData.map((e, index) => (
                    <div key={index} className="flex flex-row justify-center items-center gap-2">
                        <img src={e.image} alt="Icon"></img>
                        <span>{e.value} {e.unit}</span>
                    </div>
                ))}
                <img src={arrow_square} alt="Arrow Square"></img>
            </div>
        </div>
    );
}
export default LongContainer;
