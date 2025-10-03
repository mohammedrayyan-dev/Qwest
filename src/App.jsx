import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Landing from './pages/Landing/Landing'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify';


function App() {

  const navigate= useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        console.log("Logged In");

        navigate("/home");
      } else {
        console.log("Logged Out");
        navigate("/");
      }
    })
  },[])

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />   
    </Routes>
    </>
  )
}

export default App
