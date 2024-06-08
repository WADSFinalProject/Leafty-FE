import "./StatsContainer.css"
import information from "../../assets/icons/information.svg"
import WidgetContainer from "./WidgetContainer";
import Modal from "../../components/Modal";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import powder from "../../assets/icons/sidebar/powder.svg"

const settings = {
    width: 50,
    height: 50,
    value: 60,
    margin: 0
};

function showModal() {

}
function StatsContainer({ row = true, label, value, unit = false, icon_unit = false, description, modalContent, color, modal = true, frontIcon = false, backIcon = false, round }) {
    return <>
        <WidgetContainer padding={false} round = {round}>
            <div className="flex flex-row justify-between py-2 pl-2 items-center">
                {frontIcon ? <img src={frontIcon} className="w-1/6"></img> : <></>}
                <div className={`flex ${row ? "flex-col":"flex-row"} gap-1.5`}>
                    <div className="flex flex-row justify-between items-center">
                        {modal ? <button className="" onClick={() => document.getElementById('my_modal').showModal()}><img src={information}></img></button> : <></>}
                        <div></div>
                    </div>
                    <span style={{ color: "#6B6A6A" }}>
                        {label ? label : <></>}
                    </span>
                    <span className="font-bold text-2xl">
                        {value && unit ? value + " " + unit : null}
                        {value && icon_unit ? (
                            <>
                                <div className="flex flex-row gap-4">
                                    <span>{value + " "}</span>
                                    <img src={icon_unit} className = "w-8 h-8" alt="" />
                                </div>
                            </>
                        ) : null}
                    </span>
                    <span style={{ color: "#6B6A6A" }}>
                        {description ? description : <></>}
                    </span>
                </div>
                {backIcon ? <img src={backIcon}></img> : <></>}
                {/* <img src={powder} className="w-1/4 transform -scale-x-100 opacity-10 place-self-end"></img> */}
                <div className="w-[20px] h-[100px] place-self-center">
                    <div className="w-[20px] h-[100px] rounded-[10px_0px_0px_10px] shadow-[inset_0px_4px_4px_#0000001a] left-20 " style={{ background: color }} />
                </div>
            </div>
        </WidgetContainer>
        {modal ?
            <dialog id="my_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Statistics</h3>
                    <p className="py-4">Show Statistics</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog> : <></>}
    </>
}

export default StatsContainer;