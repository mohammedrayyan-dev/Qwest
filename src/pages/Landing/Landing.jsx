import "./Landing.css";
import Navbar from "../../components/Navbar/Navbar";
import HeroPageImageWeb from "/src/assets/HeroImageWeb.png";
import HeroPageImageMob from "/src/assets/HeroImageMobile.png";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div class="bg-[#ffffff] h-full flex flex-col items-center transition-all duration-400 w-screen sm:grid sm:grid-cols-2">

      {/* Main Details */}
      <div class="flex justify-between px-12 flex-col items-center sm:items-start pt-6 sm:pt-0">
       <h3 class="text-2xl font-bold text-[#111827] sm:text-7xl sm:text-left ">
        Turn chaos into 
       </h3>
       <h3 class="text-2xl font-bold text-[#E0B62B] sm:text-7xl sm:text-left sm:pt-1">
       clarity.
       </h3>
       <h3 class="text-lg font-bold text-gray-600 pt-2 sm:text-4xl sm:text-left sm:pt-3">
        Your day, your way
       </h3>
       <p class="text-sm text-[#4B5563] text-center pt-2 px-4 sm:px-0 sm:text-lg sm:text-left sm:pt-4">
        From work projects to personal reminders, manage everything effortlessly. 
        With real-time updates, smart organization, and a clean interface, 
        staying productive has never been easier.
       </p>
       <button
       onClick={() => navigate("/signup")}
       class="mt-4 flex space-x-2 bg-yellow-500 hover:scale-105 hover:bg-yellow-600 text-white cursor-pointer font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <span>Start Organizing Today</span>
        <ArrowRight />
      </button>
      </div>

      {/* Hero image website */}
      <div class="hidden sm:block mt-12 h-55 w-70 flex bg-gradient-to-br from-yellow-200/40 to-yellow-400/10 rounded-2xl shadow-lg justify-center scale-105 -rotate-1 hover:rotate-0 transition-transform duration-300 sm:mt-22 sm:h-130 sm:w-170">
        <img src={HeroPageImageWeb} 
        alt="To-Do App image" 
        class="py-12 px-6 h-130 w-200"
        />
      </div>

      {/* Hero image mobile */}
      <div class="block sm:hidden mb-10 sm:mb-0 mt-12 h-100 w-70 flex bg-gradient-to-br from-yellow-200/40 to-yellow-400/10 rounded-2xl shadow-lg justify-center sm:mt-22 sm:h-130 sm:w-170">
        <img src={HeroPageImageMob} 
        alt="To-Do App image" 
        class="py-4 px-4 h-100 w-200"
        />
      </div>

      </div>
      </>
  )
}

export default Landing;