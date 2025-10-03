import { useState } from "react";
import QwestLogo from "/src/assets/QwestLogo.png";
import { signup } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userAuth = async (event) => {
    event.preventDefault();
      await signup(name, email, password);
  }

  return (
    <>
    <div class="flex items-center text-left pl-8 py-4 space-x-3">
      <h1
      onClick={() => navigate("/")} 
      class="text-3xl font-semibold text-[#111827] cursor-pointer">
        Qwest
      </h1>
    </div>

    <div class="mt-20 flex items-center justify-center">
      <div class="grid grid-cols-2 h-120 w-240 rounded-lg shadow-md">
        <div class="bg-[#FFFFFF] relative flex flex-col items-center justify-center">
        <img src={QwestLogo} alt="QwestLogo" class="w-35 h-45" />
        <h3 class="text-4xl font-semibold text-[#111827] pt-6">
          Your day,
        </h3>
        <h3 class="text-4xl font-semibold text-[#111827] pb-20">
          your way! 
        </h3>
        <h3 class="absolute text-gray-500 text-sm position bottom-8 left-8 ">
          © 2025 Qwest, Inc.
        </h3>
        </div>

        <div class="bg-[#F3F4F6] flex flex-col items-center justify-center">
        <h3 class="text-3xl font-semibold text-[#111827] pb-6">
          Sign Up
        </h3>

        <form class="pl-27 space-x-4 space-y-5 ">
          <input 
          type="text"
          value={name} 
          onChange={(e) => {setName(e.target.value)}} 
          placeholder="Enter your name"
          class="w-65 px-4 py-3 border rounded-lg border-gray-800 text-gray-800" 
          />
          
          <input 
          type="email"
          value={email} 
          onChange={(e) => {setEmail(e.target.value)}} 
          placeholder="Enter your email" 
          class="w-65 px-4 py-3 border rounded-lg border-gray-800 text-gray-800"
          />
          <input 
          type="password"
          value={password} 
          onChange={(e) => {setPassword(e.target.value)}} 
          placeholder="Enter your password"
          class="w-65 px-4 py-3 border rounded-lg border-gray-800 text-gray-800"
          />

          <button 
          type="submit"
          onClick={userAuth}
          class="bg-[#D4AF37] hover:bg-[#B38F1D] transition-colors duration-300 flex gap-2 justify-center w-65 font-bold rounded-lg px-4 py-3 text-white shadow"
          >
            Sign Up
          </button>

          <div class="pl-3 pt-1">
          <p class="text-gray-400 flex gap-1">
            Already have an account? 
            <span 
            onClick={() => navigate("/signin")} 
            class="text-gray-700 font-semibold cursor-pointer">
              Sign In
            </span>
          </p>
          </div>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup