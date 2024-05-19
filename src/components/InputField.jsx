import WidgetContainer from "./Cards/WidgetContainer";

function InputField({ type, label, placeholder, icon, onChange, value, className }) {
    return <>
        <label className={`form-control w-full max-w-md ${className}`}>
            {label ?
                <div className="label px-0">
                    <span className="label-text">{label}</span>
                </div> : <></>}

            <label className="input input-bordered flex items-center gap-2 ">
                <img src={icon} className="w-5 h-5"></img>
                <input type={type} className="grow" placeholder={placeholder} onChange={onChange} value={value} />
            </label>

            {/* <div className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
            </div> */}
            {/* Animation styles */}
        </label>
    </>
}

export default InputField;