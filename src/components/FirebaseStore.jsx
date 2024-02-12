import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';
// import { set } from 'firebase/database';
import { dbfs, st } from './Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const FirebaseStore = () => {
    const userData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        uploadImage: '',
    }


    // State variables
    const [formData, setFormData] = useState(userData);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);
    const [error, setError] = useState({});
    // const [submittedData, setSubmittedData] = useState([]);
    const [submittedData, setSubmittedData] = useState(() => {
        const storedData = localStorage.getItem('submittedData');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imageShow, setImageShow] = useState(null)


    // Update local storage when submitted data changes
    useEffect(() => {
        localStorage.setItem('submittedData', JSON.stringify(submittedData));
    }, [submittedData]);


    // Handle image change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFormData({ ...formData, uploadImage: event.target.files[0] });
            setImageShow(URL.createObjectURL(event.target.files[0]));
        } else {
            setImageShow(formData.uploadImage);
        }
    };


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
        if (!imageShow) {
            errorShow.uploadImage = 'Please select an image file';
        }

        setError(errorShow);
        return Object.keys(errorShow).length === 0;
    };


    // Upload user image firebase storage
    const userUploadImage = async (file) => {
        const storageRef = ref(st, 'images/' + formData.uploadImage.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };


    // Handle form submission
    const fromSubmitHandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            setIsEditing(false);
            let imageURL = formData.uploadImage;
            if (formData.uploadImage instanceof File) {
                imageURL = await userUploadImage(formData.uploadImage);
            }
            // await addDoc(collection(dbfs, 'users'), {
            await setDoc(doc(dbfs, 'users/', formData.email), {
                userfirstname: formData.firstName,
                userlastname: formData.lastName,
                useremail: formData.email,
                userpassword: formData.password,
                userconfirmPassword: formData.confirmPassword,
                useruploadImageURL: imageURL, // Store the download URL instead of the file object
            });
            const newData = { ...formData, uploadImage: imageURL };
            if (isEditing) {
                const updatedData = [...submittedData];
                updatedData[editingIndex] = newData;
                setSubmittedData(updatedData);
            } else {
                setSubmittedData([...submittedData, newData]);
            }
            setFormData(userData);
            setImageShow(null);
            setEditingIndex(null);
        }
    };


    // Delete data
    const deleteData = (index) => {
        const newData = [...submittedData];
        newData.splice(index, 1);
        setSubmittedData(newData);
        localStorage.setItem('submittedData', JSON.stringify(newData));
    };


    // Edit data
    const editData = (index) => {
        const dataToEdit = submittedData[index];
        setFormData(dataToEdit);
        if (dataToEdit.uploadImage) {
            setImageShow(dataToEdit.uploadImage);
        }
        setEditingIndex(index);
        setIsEditing(true);
    };
    return (
        <>
            <div className="bg-black">
                <div className="container max-w-[1240px] mx-auto bg-black min-h-screen p-4 py-10 sm:p-10">
                    <h1 className='text-white text-center pb-10 text-xl sm:text-3xl md:text-4xl font-bold'>Firebase database Form Custom Validation</h1>
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
                            // value={formData.uploadImage}
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
                                    className={`${imageShow ? "max-h-10 max-w-10 rounded-full" : ""}`}
                                />
                            }
                            {error.uploadImage && <p className="text-red-600">{error.uploadImage}</p>}
                        </div>
                        <button
                            type='submit'
                            className={`px-3 py-2 bg-yellow-500 w-full sm:w-1/2 text-2xl font-bold text-white rounded-lg ${isEditing ? "bg-green-600" : ""}`}
                        >
                            {isEditing ? "update" : "submit"}
                        </button>
                    </form>
                    {
                        submittedData.map((value, index) => (
                            <div key={index} className=''>
                                <h2 className='py-5 text-white font-2xl font-bold'>User Details {value.firstName}</h2>
                                <div className='flex flex-col md:flex-row items-center h-[200px] md:h-[82px] justify-between text-xl border'>
                                    <div className='flex h-[80px] w-full'>
                                        <p className='text-white h-full border-b md:border-b-0 ps-1 w-full flex items-center'>{value.firstName}</p>
                                        <p className='text-white border-l border-b md:border-b-0 h-full ps-1 w-full flex items-center'>{value.lastName}</p>
                                        <p className='text-white border-l border-b md:border-b-0 h-full ps-1 w-full flex items-center'>{value.password}</p>
                                    </div>
                                    <div className='h-[80px] flex w-full'>
                                        <p className='text-white border-l border-b md:border-b-0 h-full ps-1 w-full flex items-center'>{value.email}</p>
                                        {/* <p className='text-white border-l border-b md:border-b-0 h-full ps-1 w-full flex items-center'>{value.confirmPassword}</p> */}
                                        <div className='text-white border-l border-b md:border-b-0 h-full ps-1 w-[130px] flex items-center'>
                                            {value.uploadImage && <img height={80} width={80} className=' h-20 w-20 flex items-center rounded-full' src={value.uploadImage} alt="img" />}
                                        </div>
                                    </div>
                                    <div className='flex h-[50px] w-full md:w-1/3 justify-center'>
                                        <button onClick={() => deleteData(index)} className='rounded-xl bg-pink-600 px-2 py-2 m-1 hover:bg-green-700'>Delete</button>
                                        <button onClick={() => editData(index)} className={`rounded-xl  px-2 py-2 m-1 hover:bg-green-700 ${editingIndex === index ? "bg-red-600" : "bg-pink-600"}`}>{editingIndex === index ? "Editing" : "Edit"}</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FirebaseStore