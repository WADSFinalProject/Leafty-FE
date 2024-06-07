import React from 'react';
import illustration from "@assets/404.svg";
import {db, auth} from '../firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';

function PageNotFound() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
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
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers);
            return false

        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <button onClick={handleSignOut}>sign out button for now</button>
            <button onClick={handleWhoAmI}>whoami</button>
            <img src={illustration} className='w-[500px] h-[500px]' alt="Page Not Found Illustration"/>
            <span className='font-bold text-3xl mt-4'>Oops! Page Not Found</span>
            <span className='w-1/3 text-center mt-2'>We've searched far and wide and couldn't seem to find what you were looking for</span>
        </div>
    );
}

export default PageNotFound;
