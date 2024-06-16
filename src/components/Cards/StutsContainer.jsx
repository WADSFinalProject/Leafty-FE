import "./StatsContainer.css";
import information from "../../assets/icons/information.svg";
import WidgetContainer from "./WidgetContainer";
import Modal from "../Modal";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import powder from "../../assets/icons/sidebar/powder.svg";

const settings = {
    width: 50,
    height: 50,
    value: 60,
    margin: 0
};

function StutsContainer({ row = true, label, value, unit = false, icon_unit = false, description, modalContent, color, modal = true, frontIcon = false, backIcon = false, round }) {
    return (
        <>
            <WidgetContainer padding={false} round={round}>
                <div className="flex flex-row justify-between py-2 pl-2 items-center">
                    <div className={`flex ${row ? "flex-col" : "flex-row"} gap-1.5`}>
                        <div className="flex flex-row justify-between items-center">
                            {modal && (
                                <button className="" onClick={() => document.getElementById('my_modal').showModal()}>
                                    <img src={information} alt="Information Icon" />
                                </button>
                            )}
                            <span style={{ color: "#6B6A6A" }}>
                                {label ? label : <></>}
                            </span>
                        </div>
                        <div className="flex flex-row items-center">
                            <span className="font-bold text-2xl">
                                {value && unit ? value + " " + unit : null}
                            </span>
                            {value && icon_unit ? (
                                <>
                                    <div className="flex flex-row items-center mt-2">
                                        <img src={icon_unit} className="w-9 h-9" alt="Icon Unit" />
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <span style={{ color: "#6B6A6A" }}>
                            {description ? description : <></>}
                        </span>
                        {frontIcon && <img src={frontIcon} className=" flex-auto h-1/2 w-1/2" alt="Front Icon" />}
                    </div>
                    {backIcon && <img src={backIcon} alt="Back Icon" />}
                    <div className="w-[20px] h-[100px] place-self-center">
                        <div className="w-[20px] h-[100px] rounded-[10px_0px_0px_10px] shadow-[inset_0px_4px_4px_#0000001a] left-20" style={{ background: color }} />
                    </div>
                </div>
            </WidgetContainer>
            {modal ?
                <dialog id="my_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Statistics</h3>
                        <p className="py-4">{modalContent ? modalContent : "Show Statistics"}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog> : <></>}
        </>
    );
}

export default StutsContainer;
