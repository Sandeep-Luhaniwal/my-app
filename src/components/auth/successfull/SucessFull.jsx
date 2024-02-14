import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SuccessFull = () => {
    const location = useLocation();
    const { userData } = location.state;

    return (
        <div className='container max-w-[1200px] mx-auto px-4'>
            <p className='text-white'>First Name: {userData.userfirstname}</p>
            <p className='text-white'>Last Name: {userData.userlastname}</p>
            <p className='text-white'>Email: {userData.useremail}</p>
            <img src={userData.useruploadImageURL} className='h-14 w-14 rounded-full' alt="" />
            <p className='text-white pb-5'>Success</p>
            <Link to="/login" className='text-white bg-red-600 px-4 py-2 rounded-lg'>Logout</Link>
        </div>
    );
};

export default SuccessFull;
