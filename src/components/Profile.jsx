import React from 'react'
import profile from "../assets/icons/sidebar/profile_pic.svg"
import notification from "../assets/icons/notification.svg"

const Profile = () => {
  return (
    <div className="w-fit h-fit">
      <div className="flex flex-row rounded-full border-2 border-solid border-[#79b2b7] items-center gap-2">
        <button className='btn rounded-full w-12 h-12' style={{background: "#94C3B3"}}><img src={notification}></img></button>
        <span>John Doe</span>
        <button className=''><img src={profile} className='w-12 h-12'></img></button>
      </div>
    </div>
  )
}

export default Profile