import "./Landing.css";
import Navbar from "../../components/Navbar/Navbar";
import HeroPageImage from "/src/assets/HeroImage.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div class="bg-[#ffffff] h-full flex flex-col items-center w-screen sm:grid sm:grid-cols-2">

      {/* Main Details */}
      <div class="flex flex-col items-center sm:items-start pt-14 sm:pt-0">
       <h3 class="text-2xl font-bold text-[#111827] sm:text-7xl sm:text-left sm:px-15">
        Turn chaos into 
       </h3>
       <h3 class="text-2xl font-bold text-[#111827] sm:text-7xl sm:text-left sm:px-15 sm:pt-1">
       clarity.
       </h3>
       <h3 class="text-lg font-bold text-[#111827] pt-1 sm:text-4xl sm:text-left sm:px-15 sm:pt-3">
        Your day, your way
       </h3>
       <p class="text-sm text-[#4B5563] text-center pt-2 px-4 sm:text-lg sm:text-left sm:px-15 sm:pt-4">
        From work projects to personal reminders, manage everything effortlessly. 
        With real-time updates, smart organization, and a clean interface, 
        staying productive has never been easier.
       </p>
       <button
       onClick={() => navigate("/signup")}
       class="bg-[#D4AF37] hover:bg-[#B9972F] mt-3 w-45 text-sm font-bold rounded-lg px-3 py-2 text-white shadow-md cursor-pointer transition-colors duration-300 sm:mt-5 sm:w-60 sm:text-lg sm:mx-15 sm:py-3">
        Start Organizing Today
      </button>
      </div>

      {/* Hero Image */}
      <div class="mt-12 h-55 w-70 flex justify-center shadow-lg rounded-lg sm:mt-22 sm:h-130 sm:w-170">
        <img src={HeroPageImage} 
        alt="To-Do App image" 
        class="p-5 h-60 w-85 sm:h-120 sm:w-170"
        />
      </div>
      </div>
      </>
  )
}

export default Landing;