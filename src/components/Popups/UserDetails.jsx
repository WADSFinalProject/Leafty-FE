import React, { forwardRef, useState } from 'react';
import profile from "@assets/icons/sidebar/profile_pic.svg";
import InputField from '../InputField';
import At from "../../assets/icons/UserAt.svg";
import Phone from "../../assets/icons/UserPhone.svg";
import Mail from "../../assets/icons/UserMail.svg";
import Button from "@components/Button";
import SelectRoles from '../Select';

const UserDetails = forwardRef(({ userid, username, phone, email, role, editable = false, approveUser }, ref) => {
    const [UserID, setUserID] = useState(userid);
    const [Username, setUsername] = useState(username);
    const [PhoneNum, setPhoneNum] = useState(phone);
    const [Email, setEmail] = useState(email);
    const [Role, setRole] = useState(role);

    const handleApproveClick = () => {
        approveUser(UserID, Role);
        ref.current.close();
    };

    return (
        <dialog ref={ref} id={userid} className="modal">
            <div className="modal-box rounded-lg flex items-center flex-col gap-3">
                <img src={profile} alt="Profile" />
                <h3 className="font-bold text-xl">User #{userid}</h3>
                <div className='grid grid-cols-2 gap-2'>
                    <InputField icon={At} disabled={!editable} type="text" label="Username" onChange={(e) => setUsername(e.target.value)} value={Username} green={true} className="font-semibold" />
                    <InputField icon={Mail} disabled={!editable} type="text" label="Email" onChange={(e) => setEmail(e.target.value)} value={Email} green={true} className="font-semibold" />
                    <InputField icon={Phone} disabled={!editable} type="text" label="Phone Number" onChange={(e) => setPhoneNum(e.target.value)} value={PhoneNum} green={true} className="font-semibold" />
                    <SelectRoles role={Role} onChange={(newRole) => setRole(newRole)} />
                </div>
                <div className="flex flex-col w-full items-center">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold text-[#0F7275]" onClick={() => ref.current.close()}>
                        ✕
                    </button>
                    {editable ? <Button className="w-full" type="submit" background="#0F7275" color="#F7FAFC" label="Save"></Button> : ""}
                    {role === "Unverified" ? (
                        <div className='gap-2 w-full flex flex-col items-center'>
                            <Button className="w-full flex-grow p-0" type="submit" background="#0F7275" color="#F7FAFC" label="Approve" onClick={handleApproveClick}></Button>
                            <Button className="w-full flex-grow" type="cancel" background="#94C3B3" color="#F7FAFC" label="Reject"></Button>
                        </div>
                    ) : ""}
                </div>
            </div>
        </dialog>
    );
});

export default UserDetails;
