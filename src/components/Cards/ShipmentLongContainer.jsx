import WidgetContainer from "./WidgetContainer";
import unscaled_pickup from "../../assets/icons/unscaled_pickup.svg";
import Package from "../../assets/icons/package.svg";
import date from "../../assets/icons/date.svg";
import weight from "../../assets/icons/weight_scale.svg";
import arrow_square from "../../assets/icons/arrow_square.svg";
import Shipments from '../../assets/Shipments.svg';
import CircularButton from '../../components/CircularButton';
import { Link ,Outlet} from 'react-router-dom';

function ShipmentLongContainer({ showWeight }) { // Destructure props to access showWeight directly
    console.log(showWeight); // Ensure you are receiving the correct prop value

    const data = [
        {
            "image": Package,
            "value": 3,
            "unit": showWeight ? "Packages" : ""
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

    // Filter out weight if showWeight is false
    const filteredData = showWeight ? data : data.filter(item => item.image !== weight);

    return (
        <div className={`flex flex-col container gap-1 rounded-md border-4 border-white shadow-lg p-2`} style={{ background: "radial-gradient(50%_50%_at_50%_50%,rgb(255,255,255)_0%,rgb(211.65,211.65,211.65)_100%)" }}>
            <div className="flex justify-between flex-row items-center font-semibold text-sm lg:text-base px-2">
                <div className="flex flex-row justify-center items-center gap-2">
                    <Link to="/xyzmobile/Tracker">
                            <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                    </Link>
                    <span className="w-min sm:w-full">Expedition #0123456</span>
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

export default ShipmentLongContainer;