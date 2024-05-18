import WidgetContainer from "./WidgetContainer";
import pdf from "../../assets/icons/pdf_file.svg";
import download from "../../assets/icons/download.svg";
import open from "../../assets/icons/open_file.svg";

function ReceiptContainer(){
    return <>
        <WidgetContainer className={"justify-center flex flex-col items-center gap-1 m-2 ml-0"}>
            <span className="font-bold text-lg">Centra Receipt</span>
            <span>Expedition #123456.pdf</span>
            <div className="p-4 bg-[#DEE295] rounded-lg">
                <img src = {pdf}></img>
            </div>
            <div className="flex flex-row gap-2">
                <div className="bg-[#79B2B7] p-2 rounded-full"><img src = {download}></img></div>
                <div className="bg-[#79B2B7] p-2 rounded-full"><img src = {open}></img></div>
            </div>
        </WidgetContainer>
    </>
}

export default ReceiptContainer;