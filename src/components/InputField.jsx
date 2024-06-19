import WidgetContainer from "./Cards/WidgetContainer";
import "@style/InputField.css"

function InputField({ type, label, placeholder, icon, onChange, value, className, green = false, disabled = false, padding = true, formControl = true}) {
    return <>
        <label className={`${formControl && "form-control"} w-full md:max-w-md ${className}`}>
            {label ?
                <div className={`px-0 ${padding ? "py-1":""}`}>
                    <span className="label-text">{label}</span>
                </div> : <></>}

            <div className={`input input-bordered flex items-center gap-2 input-md ${green ? "green" : ""}`}>
                {icon ? <img src={icon} className="w-5 h-5"></img> : null}
                <input type={type} className="grow" placeholder={placeholder} onChange={!disabled ? onChange : undefined}  value={value} />
            </div>

            {/* <div className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
            </div> */}
            {/* Animation styles */}
        </label>
    </>
}

export default InputField;