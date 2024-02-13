
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import SucessFull from './components/auth/successfull/SucessFull';

function App() {

  return (
    <>
      <div className=' bg-black min-h-screen'>
        <Routes>
          <Route path="/" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/successfull" exact element={<SucessFull />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
