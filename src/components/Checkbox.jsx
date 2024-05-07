function CheckBox({label, state}) {
    return <>
        <div className="form-control">
            <label className="label cursor-pointer flex gap-2 ">
                <input type="checkbox" checked={state} className="checkbox [--chkbg:#0F7275]"/>
                <span className="label-text">{label}</span> 
            </label>
        </div>
    </>
}

export default CheckBox;