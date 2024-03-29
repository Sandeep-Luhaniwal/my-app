
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import SucessFull from './components/auth/successfull/SucessFull';
import ForgotPassword from './components/auth/forgetpassword/ForgotPassword';
import FirebaseStore from './components/FirebaseStore';
// import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className=' bg-black min-h-screen'>
        <Routes>
          <Route path="/" exact element={<Signup />} />
          {/* <Route path="/login" exact element={<Login />} /> */}
          {/* <Route path="/successfull" exact element={<SucessFull />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/firebase" exact element={<FirebaseStore />} /> */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
