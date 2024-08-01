import React from 'react'
import profile from "../assets/icons/sidebar/profile_pic.svg"
import logout from "@assets/logout_yellow.svg";
import notification from "../assets/icons/notification.svg"
import { Link } from 'react-router-dom';

const Profile = ({Username = "Error", handleLogout}) => {
  return (
    <div className="w-fit h-fit">
      <div className="flex flex-row rounded-full border-2 border-solid border-[#79b2b7] items-center gap-2">
      <Link to="/Notification">
        <button className='btn rounded-full w-12 h-12' style={{ background: "#94C3B3", borderRadius: "100%" }}>
          <img src={notification} alt="Notification Icon" />
        </button>
      </Link>
        <span>{Username}</span>
        <button className='rounded-full bg-[#4d7478]' onClick={handleLogout}><img src={logout} className='w-12 h-12'></img></button>
      </div>
    </div>
  )
}

export default Profile