import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { dbfs, st } from './Firebase';
import { addDoc, collection } from 'firebase/firestore';

const UploadImageData = () => {
    const userData = {
        firstName: '',
        uploadImage: '',
    };

    const [formData, setFormData] = useState(userData);
    const [imageShow, setImageShow] = useState(null);
    const [submittedData, setSubmittedData] = useState(() => {
        const storedData = localStorage.getItem('submittedData');
        return storedData ? JSON.parse(storedData) : [];
    });
    useEffect(() => {
        localStorage.setItem('submittedData', JSON.stringify(submittedData));
    }, [submittedData]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFormData({ ...formData, uploadImage: event.target.files[0] });
            setImageShow(URL.createObjectURL(event.target.files[0]));
        }
    };

    const fromSubmitHandler = async (e) => {
        e.preventDefault();
        setIsEditing(false);

        if (isEditing) {
            // Perform update operation
            const newData = [...submittedData];
            newData[editingIndex] = formData;
            setSubmittedData(newData);
            localStorage.setItem('submittedData', JSON.stringify(newData));
        } else {
            // Perform add operation
            const storageRef = ref(st, formData.uploadImage.name);
            await uploadBytes(storageRef, formData.uploadImage);
            const url = await getDownloadURL(storageRef);
            const newData = [...submittedData, { ...formData, uploadImage: url }];
            setSubmittedData(newData);
            localStorage.setItem('submittedData', JSON.stringify(newData));
        }

        setFormData(userData);
        setImageShow(null);
        setEditingIndex(null);
    };

    const deleteData = (index) => {
        const newData = [...submittedData];
        newData.splice(index, 1);
        setSubmittedData(newData);
        localStorage.setItem('submittedData', JSON.stringify(newData));
    };

    const editData = (index) => {
        const dataToEdit = submittedData[index];
        setFormData(dataToEdit);

        // Update imageShow state with the URL of the image being edited
        if (dataToEdit.uploadImage) {
            setImageShow(dataToEdit.uploadImage);
        }

        setEditingIndex(index);
        setIsEditing(true);
    };


    return (
        <div className="bg-black">
            <div className="container max-w-[1240px] mx-auto bg-black min-h-screen p-4 py-10 sm:p-10">
                <form onSubmit={(e) => fromSubmitHandler(e)} className='flex flex-col gap-6 justify-center items-center'>
                    <div className="w-full sm:w-1/2 flex flex-col items-center">
                        <input
                            type="text"
                            placeholder='First Name'
                            className='border-[2px] border-green-600 py-1 px-1 w-full'
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            value={formData.firstName}
                            name='firstName'
                        />
                    </div>
                    <div className='w-full sm:w-1/2 flex gap-8'>
                        <input
                            id='upload-file'
                            type="file"
                            hidden
                            onChange={onImageChange}
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
                    </div>
                    <button
                        type='submit'
                        className={`px-3 py-2 bg-yellow-500 w-full sm:w-1/2 text-2xl font-bold text-white rounded-lg ${isEditing ? "bg-green-600" : ""}`}
                    >
                        {isEditing ? "update" : "submit"}
                    </button>
                </form>
                {submittedData.map((value, index) => (
                    <div key={index} className=''>
                        <h2 className='py-5 text-white font-2xl font-bold'>User Details {value.firstName}</h2>
                        <div className='flex flex-col md:flex-row items-center h-[250px] md:h-[103px] justify-between text-xl border'>
                            <div className='flex h-[100px] w-full'>
                                <p className='text-white h-full border-b md:border-b-0 ps-1 w-full flex items-center'>{value.firstName}</p>
                            </div>
                            <div className='h-[100px] flex w-full'>
                                <img height={100} width={100} className='h-full w-full flex items-center text-white' src={value.uploadImage} alt="image" />
                            </div>
                            <div className='flex h-[50px] w-full md:w-1/3 justify-center'>
                                <button onClick={() => deleteData(index)} className='rounded-xl bg-pink-600 px-2 py-2 m-1 hover:bg-green-700'>Delete</button>
                                <button onClick={() => editData(index)} className={`rounded-xl text-white px-2 py-2 m-1 hover:bg-green-700 ${editingIndex === index ? "bg-red-600" : "bg-pink-600"}`}>{editingIndex === index ? "Editing" : "Edit"}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadImageData;
