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
          class="w-50 px-2 py-3 text-gray-800 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none sm:w-65 sm:px-4 sm:py-3 sm:text-lg"
          />             
          <input 
          type="email"
          value={email} 
          onChange={(e) => {setEmail(e.target.value)}} 
          placeholder="Enter your email" 
          class="w-50 px-2 py-3 text-gray-800 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none sm:w-65 sm:px-4 sm:py-3 sm:text-lg"
          />
          <input 
          type="password"
          value={password} 
          onChange={(e) => {setPassword(e.target.value)}} 
          placeholder="Enter your password"
          class="w-50 px-2 py-3 text-gray-800 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none sm:w-65 sm:px-4 sm:py-3 sm:text-lg"
          />

          <button 
          type="submit"
          class="w-50 px-2 py-3 font-bold border border-gray-300 rounded-lg text-sm text-white shadow-md bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 sm:shadow-lg sm:text-lg sm:w-65 sm:px-4 sm:py-3 sm:cursor-pointer"
          >
            Sign Up
          </button>

          <div class="pb-5 text-center">
          <p class="text-xs flex flex-col text-gray-600 sm:text-lg sm:flex-row sm:gap-2">
            Already have an account?
            <span 
            onClick={() => navigate("/signin")} 
            class="pt-1 pb-3 text-yellow-600 hover:text-yellow-700 font-semibold sm:cursor-pointer sm:pt-0 sm:pb-0">
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