import React from 'react';
import illustration from "@assets/404.svg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';
import Button from '../components/Button';
import AddLeavesPopup from '../components/Popups/AddLeavesPopup';
import AuthApi from '../AuthApi';

function PageNotFound() {
    const Auth = React.useContext(AuthApi);
    const navigate = useNavigate();

    const handleSignOut = () => {
        Auth.setAuth(false);
      };

    async function handleWhoAmI() {
        try {
            const response = await axios.get(API_URL + "/whoami")
            console.log("who am i (UUID) : ", response.data.user_id)
            if (response) {
                return response.data.user_id
            }
            return false
        } catch (error) {
            console.error("Error while checking session:", error);
            console.error(error.response.data);    // ***
            console.error(error.response.status);  // ***
            console.error(error.response.headers);
            return false

        }
    }

    async function handle() {
        try {
            const response = await axios.delete(API_URL + "/delete_session")
            if (response) {
                Auth.setAuth(false);
                navigate('/');
    }
            return false
        } catch (error) {
            console.error("Error while deleting session:", error);
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers);
            return false

        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <img src={illustration} className='w-[500px] h-[500px]' alt="Page Not Found Illustration"/>
            <span className='font-bold text-3xl mt-4'>Oops! Page Not Found</span>
            <span className='w-1/3 text-center mt-2'>We've searched far and wide and couldn't seem to find what you were looking for</span>
            <Button className = {"mt-4"} onClick={handle} label={"Sign Out"} background={'#0F7275'} color={"white"}/>
            {/* <button onClick={handleWhoAmI}>whoami</button>
            <Button onClick={() => document.getElementById('AddLeaves').showModal()} label={"Sign Out"} background={'#0F7275'} color={"white"}/>
            <AddLeavesPopup /> */}
        </div>
    );
}

export default PageNotFound;
