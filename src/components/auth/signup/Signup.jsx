import React, { useState } from 'react'
import SucessFull from '../successfull/SucessFull';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { Link } from 'react-router-dom';
import Login from '../login/Login';

const Signup = () => {
    const newuserData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    // State variables
    const [formData, setFormData] = useState(newuserData);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);
    const [error, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    // Validation functions
    const validateName = (name) => {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(name);
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const passwordMatch = () => {
        return formData.password === formData.confirmPassword;
    }


    // Form validation
    const validation = () => {
        const errorShow = {};
        if (!formData.firstName.trim()) {
            errorShow.firstName = 'Enter your first name';
        } else if (!validateName(formData.firstName)) {
            errorShow.firstName = "Enter a vaild first name";
        }

        if (!formData.lastName.trim()) {
            errorShow.lastName = 'Enter your last name';
        } else if (!validateName(formData.lastName)) {
            errorShow.lastName = "Enter a vaild last name";
        }

        if (!formData.email.trim()) {
            errorShow.email = 'Enter your Email address';
        } else if (!validateEmail(formData.email)) {
            errorShow.email = 'Enter a vaild email address';
        }
        if (!formData.password.trim()) {
            errorShow.password = 'Enter your 6 digit password';
        }
        if (!formData.confirmPassword.trim()) {
            errorShow.confirmPassword = 'Enter your 6 digit confrim password';
        } else if (!passwordMatch()) {
            errorShow.confirmPassword = 'Passwords do not match';
        }

        setError(errorShow);
        return Object.keys(errorShow).length === 0;
    };
    const fromSubmitHandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            try {
                // Create user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                // Handle success
                setSuccessMessage(true);
                setFormData(newuserData);
            } catch (error) {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle specific errors if needed
                console.error(errorCode, errorMessage);
                // Update error state to display error message to the user
                setError({ ...error, confirmPassword: errorMessage });
            }
        }
    };
    return (
        <>
            <div className={`container max-w-[1200px] mx-auto ${successMessage ? "hidden " : ""}`}>
                <div>
                    <form action=""
                        onSubmit={(e) => fromSubmitHandler(e)}
                        className='flex flex-col gap-6 justify-center items-center'>
                        <div className="w-full sm:w-1/2 flex flex-col items-center">
                            <input
                                type="text"
                                placeholder='First Name'
                                className='border-[2px] border-green-600 py-1 px-1 w-full'
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                value={formData.firstName}
                                name='firstName'
                            />
                            {error.firstName && <p className="text-red-600">{error.firstName}</p>}
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-center">
                            <input
                                type="text"
                                placeholder='Last Name'
                                className='border-[2px] border-green-600 py-1 px-1 w-full'
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                value={formData.lastName}
                                name='lastName'
                            />
                            {error.lastName && <p className="text-red-600">{error.lastName}</p>}
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-center">
                            <input
                                type="email"
                                placeholder='Email Address'
                                className='border-[2px] border-green-600 py-1 px-1 w-full'
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email}
                                name='email'
                            />
                            {error.email && <p className="text-red-600">{error.email}</p>}
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-center justify-start">
                            <div className="relative w-full">
                                <input
                                    type={passwordShow ? "text" : "password"}
                                    placeholder='Enter 6 digit password'
                                    className='border-[2px] border-green-600 py-1 px-1 w-full'
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                    maxLength={6}
                                    minLength={6}
                                    name='password'
                                />
                                <p onClick={() => setPasswordShow(!passwordShow)} className='text-red-600 absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer'>{passwordShow ? "hide" : "show"}</p>
                            </div>
                            {error.password && <p className="text-red-600">{error.password}</p>}
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-center justify-start">
                            <div className="relative w-full">
                                <input
                                    type={confrimPasswordShow ? "text" : "password"}
                                    placeholder='Enter 6 digit confirm password'
                                    className='border-[2px] border-green-600 py-1 px-1 w-full'
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    value={formData.confirmPassword}
                                    maxLength={6}
                                    minLength={6}
                                    name='confrimPassword'
                                />
                                <p onClick={() => setConfrimPasswordShow(!confrimPasswordShow)} className='text-red-600 absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer'>{confrimPasswordShow ? "hide" : "show"}</p>
                            </div>
                            {error.confirmPassword && <p className="text-red-600">{error.confirmPassword}</p>}
                        </div>
                        <button
                            type='submit'
                            className={`px-3 py-2 bg-yellow-500 w-full sm:w-1/2 text-2xl font-bold text-white rounded-lg `}
                        >
                            Signup
                        </button>
                        <div className='flex'>
                            <span className='text-white me-1'>User have already Account</span>
                            <Link className='text-white' to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
            {successMessage && <SucessFull successMessage={successMessage} setSuccessMessage={setSuccessMessage} />}
        </>
    )
}

export default Signup