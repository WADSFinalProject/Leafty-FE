import React from 'react';
import illustration from "../assets/404.svg";

function PageNotFound() {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <img src={illustration} className='w-[500px] h-[500px]' alt="Page Not Found Illustration"/>
            <span className='font-bold text-3xl mt-4'>Oops! Page Not Found</span>
            <span className='w-1/3 text-center mt-2'>We've searched far and wide and couldn't seem to find what you were looking for</span>
        </div>
    );
}

export default PageNotFound;
