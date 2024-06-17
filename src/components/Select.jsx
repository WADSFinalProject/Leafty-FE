const SelectRoles = ({ role, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  
  // Default role to "Unverified" if not provided
  const currentRole = role || "Unverified";

  return (
    <div className="flex flex-col justify-center">
      <div className={`px-0 py-1`}>
        <span className="label-text font-semibold">Role</span>
      </div>
      <select value={currentRole} onChange={handleChange} className="select select-bordered w-full max-w-xs">
        <option value="Unverified" disabled={currentRole === "Unverified"}>Unverified</option>
        <option value="Centra" disabled={currentRole === "Centra"}>Centra</option>
        <option value="Company" disabled={currentRole === "Company"}>Company</option>
        <option value="Admin" disabled={currentRole === "Admin"}>Admin</option>
      </select>
    </div>
  );
}

export default SelectRoles;
