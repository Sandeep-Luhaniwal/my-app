import React, { useState } from 'react';
import { auth } from '../../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Please check your inbox.');
      setErrorMessage(null);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error as needed, such as displaying an error message to the user
      console.error('Password reset error:', errorCode, errorMessage);
      setSuccessMessage(null);
      setErrorMessage(errorMessage); // Or display a generic error message
    }
  };

  return (
    <div className="container max-w-[1200px] mx-auto px-4">
      <h2 className='text-white text-center text-3xl py-5 font-bold'>Forgot Password</h2>
      <div className='flex flex-col items-center'>
        <div className='w-full sm:w-1/2'>
          <input
            type="email"
            placeholder="Enter your email"
            className='border-[2px] border-green-600 py-1 px-1 w-full rounded-lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && <p className='text-red-600 mt-3'>{errorMessage}</p>}
          {successMessage && <p className='text-red-600 mt-3'>{successMessage}</p>}
          <button className='text-black bg-yellow-300 px-3 w-full py-2 rounded-lg my-3' onClick={handleResetPassword}>Reset Password</button>
          <div className='my-5 w-full flex'>
            <Link to="/login" className='text-black bg-yellow-400 text-center w-full rounded-lg py-2'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
