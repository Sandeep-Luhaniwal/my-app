import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const File = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // const fromSubmitHandler = (e) => {
    //     e.preventDefault();
    //     const isValid = validation();
    //     if (isValid) {
    //         console.log('Form data:', formData);
    //         const newData = { ...formData, uploadImage: imageShow };
    //         setSubmittedData([...submittedData, newData]);
    //         setFormData(userData);

    //         emailjs.sendForm('service_vnvpiol', 'template_f5ens19', e.target, '2ofUor669APLtRslp')
    //             .then((result) => {
    //                 console.log('Email sent successfully:', result.text);
    //                 setFormData(false);
    //             }, (error) => {
    //                 console.error('Failed to send email:', error.text);
    //             });
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your emailJS service details
        emailjs.sendForm('service_vnvpiol', 'template_f5ens19', e.target, '2ofUor669APLtRslp')
            .then((result) => {
                console.log(result.text);

            }, (error) => {
                console.log(error.text);
            });

        console.log(formData); // This will log the form data to console
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default File;
