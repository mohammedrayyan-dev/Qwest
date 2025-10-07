import { useState } from "react";
import { signup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import AuthLayout from "/src/components/AuthLayout/AuthLayout.jsx"

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
    <AuthLayout title="Sign Up">
      <authForm> 
        <form class="flex flex-col justify-center space-y-5" onSubmit={userAuth}> 
          <input 
          type="text"
          value={name} 
          onChange={(e) => {setName(e.target.value)}} 
          placeholder="Enter your name"
          class="w-50 px-2 py-3 text-gray-800 text-xs border rounded-lg border-gray-800 sm:w-65 sm:px-4 sm:py-3 sm:text-lg"
          />             
          <input 
          type="email"
          value={email} 
          onChange={(e) => {setEmail(e.target.value)}} 
          placeholder="Enter your email" 
          class="w-50 px-2 py-3 text-gray-800 text-xs border rounded-lg border-gray-800 sm:w-65 sm:px-4 sm:py-3 sm:text-lg"
          />
          <input 
          type="password"
          value={password} 
          onChange={(e) => {setPassword(e.target.value)}} 
          placeholder="Enter your password"
          class="w-50 px-2 py-3 text-gray-800 text-xs border rounded-lg border-gray-800 sm:w-65 sm:px-4 sm:py-3 sm:text-lg"
          />

          <button 
          type="submit"
          class="w-50 px-2 py-3 font-bold rounded-lg text-sm text-white shadow bg-[#D4AF37] hover:bg-[#B38F1D] transition-colors duration-300 sm:text-lg sm:w-65 sm:px-4 sm:py-3 sm:cursor-pointer"
          >
            Sign Up
          </button>

          <div class="pb-5 text-center">
          <p class="text-xs flex flex-col sm:text-lg sm:flex-row sm:gap-1">
            Already have an account?
            <span 
            onClick={() => navigate("/signin")} 
            class="pt-1 pb-3 text-gray-700 font-semibold sm:cursor-pointer sm:pt-0 sm:pb-0">
              Sign In
            </span>
          </p>
          </div>
        </form>
        </authForm>
    </AuthLayout>
  )
}

export default Signup