import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';

const From = () => {
    const userData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        uploadImage: '',
    }
    const [formData, setFormData] = useState(userData);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);
    const [error, setError] = useState({});
    // const [submittedData, setSubmittedData] = useState([]);
    const [submittedData, setSubmittedData] = useState(() => {
        const storedData = localStorage.getItem('submittedData');
        return storedData ? JSON.parse(storedData) : [];
    });


    useEffect(() => {
        localStorage.setItem('submittedData', JSON.stringify(submittedData));
    }, [submittedData]);

    const [imageShow, setImageShow] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageShow(URL.createObjectURL(event.target.files[0]));
        }
    }
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
        if (!imageShow) {
            errorShow.uploadImage = 'Please select an image file';
        }

        setError(errorShow);
        return Object.keys(errorShow).length === 0;
    };
    const sendEmail = () => {
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            // Add other relevant fields here
        };

        emailjs.send('service_vnvpiol', 'template_f5ens19', userData, '2ofUor669APLtRslp')
            .then((response) => {
                console.log('Email sent successfully!', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    const fromSubmitHandler = (e) => {
        e.preventDefault();
        if (validation()) {
            console.log('Form data:', formData);
            const newData = { ...formData, uploadImage: imageShow };
            setSubmittedData([...submittedData, newData]);
            setFormData(userData);
            setImageShow(null);
            // Call the sendEmail function here
            sendEmail();
        }
    };
    const deleteData = (index) => {
        const newData = [...submittedData];
        newData.splice(index, 1);
        setSubmittedData(newData);
        localStorage.setItem('submittedData', JSON.stringify(newData));
    };
    return (
        <>
            <div className="bg-black">
                <div className="container max-w-[1140px] mx-auto bg-black min-h-screen p-10">
                    <h1 className='text-white text-center pb-10 text-xl sm:text-3xl md:text-4xl font-bold'>Email Js Form Custom Validation</h1>
                    <form action="" onSubmit={(e) => fromSubmitHandler(e)} className='flex flex-col gap-6 justify-center items-center'>
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
                        <div className='w-full sm:w-1/2 flex gap-8'>
                            <input
                                id='upload-file'
                                type="file"
                                hidden
                                onChange={onImageChange}
                                value={formData.uploadImage}
                            />
                            <label
                                htmlFor="upload-file"
                                className='text-white px-4 py-2 bg-blue-600 rounded-sm cursor-pointer'>
                                Choose file
                            </label>
                            {imageShow &&
                                <img
                                    alt="preview image"
                                    src={imageShow}
                                    className={`${imageShow ? "max-h-10 max-w-10" : ""}`}
                                />
                            }
                            {error.uploadImage && <p className="text-red-600">{error.uploadImage}</p>}
                        </div>
                        <button
                            type='submit'
                            className='px-3 py-2 bg-yellow-500 w-full sm:w-1/2 text-2xl font-bold text-white rounded-lg'
                        >
                            Submit
                        </button>
                    </form>
                    {
                        submittedData.map((value, index) => (
                            <div key={index}>
                                <h2 className='py-5 text-white font-2xl font-bold'>User Details</h2>
                                <ul className='flex items-center h-[100px] justify-between text-xl border'>
                                    <li className='text-white h-full ps-1 w-full flex items-center'>{value.firstName}</li>
                                    <li className='text-white border-l h-full ps-1 w-full flex items-center'>{value.lastName}</li>
                                    <li className='text-white border-l h-full ps-1 w-full flex items-center'>{value.email}</li>
                                    <li className='text-white border-l h-full ps-1 w-full flex items-center'>{value.password}</li>
                                    <li className='text-white border-l h-full ps-1 w-full flex items-center'>{value.confirmPassword}</li>
                                    <li className='text-white border-l h-full ps-1 w-full flex items-center'>
                                        {value.uploadImage && <img height={100} width={160} className='h-full w-full flex items-center' src={value.uploadImage} alt="img" />}
                                    </li>
                                    <button onClick={() => deleteData(index)} className='rounded-xl bg-pink-600 px-2 py-2 m-1'>delete data</button>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default From