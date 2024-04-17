function CheckBox({label, state}) {
    return <>
        <div class="form-control">
            <label class="label cursor-pointer flex gap-2 ">
                <input type="checkbox" checked={state} class="checkbox" className="checkbox [--chkbg:#0F7275]"/>
                <span class="label-text">{label}</span> 
            </label>
        </div>
    </>
}

export default CheckBox;