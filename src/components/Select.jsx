function SelectRoles(role = "unverified", editable = false) {
    console.log(role)
    return (<>
        <div className="flex flex-col justify-center">
            <div className={`px-0 py-1`}>
                <span className="label-text font-semibold">Role</span>
            </div>
            <select className="select select-bordered w-full max-w-xs">
                <option disabled selected={role.role === "unverified"}>Unverified</option>
                <option selected={role.role === "Centra"}>Centra</option>
                <option selected={role.role === "Company"}>Company</option>  
                <option selected={role.role === "Admin"}>Admin</option>
            </select>
        </div>
    </>
    );
}

export default SelectRoles;
