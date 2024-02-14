import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, dbfs } from '../../Firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [passwordShow, setPasswordShow] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, formData.email, formData.password);


      // Fetch user data from Firestore
      const userRef = doc(dbfs, 'users', formData.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Set user data to state
        const userData = userSnap.data();
        setUserData(userData);
        navigate("/successfull", { state: { userData } });
        console.log('hellloooo', userData)
      } else {
        // No such document in Firestore
        console.log('No user data available');
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className='container max-w-[1200px] mx-auto px-4'>
        <form onSubmit={loginHandler} className='flex flex-col gap-4 items-center pt-4'>
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <input
              type="email"
              placeholder='Email Address'
              className='border-[2px] border-green-600 py-1 px-1 w-full'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email || ''}
              name='email'
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <div className="relative w-full">
              <input
                type={passwordShow ? "text" : "password"}
                placeholder='Enter 6 digit password'
                className='border-[2px] border-green-600 py-1 px-1 w-full'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password || ''}
                maxLength={6}
                minLength={6}
                name='password'
              />
              <p onClick={() => setPasswordShow(!passwordShow)} className='text-red-600 absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer'>{passwordShow ? "hide" : "show"}</p>
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className='flex justify-start w-full sm:w-1/2'>
            <Link to="/forgot-password" className='text-white text-start'>Forget Paasword</Link>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <button type="submit" className='bg-red-600 px-4 py-3 rounded-xl w-full'>Login</button>
          </div>
          <Link to="/" className='text-white bg-pink-500 w-full sm:w-1/2 text-center py-2 px-3 rounded-xl'>Don't have an account? Sign Up</Link>
        </form>
      </div>

    </>
  );
};

export default Login;
