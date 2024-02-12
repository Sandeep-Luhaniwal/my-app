
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';

function App() {

  return (
    <>
      <div className=' bg-black min-h-screen'>
        <Routes>
          <Route path="/" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
