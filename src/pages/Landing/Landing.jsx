import "./Landing.css";
import Navbar from "../../components/Navbar/Navbar";
import HeroPageImage from "/src/assets/HeroImage.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div class="grid grid-cols-2 bg-[#ffffff] h-full w-screen">

      {/* Left Side */}

      <div class="pl-15 pt-27 flex flex-col align-center">
       <div class="flex flex-col space-y-2 pr-25">
       <h3 class="text-7xl font-bold text-[#111827]">
        Turn chaos into clarity.
       </h3>
       <h3 class="text-6xl font-bold text-[#111827] pb-6">
        Your day, your way
       </h3>
       </div>
       <p class="max-w-lg pb-6 text-[#4B5563] text-lg">
        From work projects to personal reminders, manage everything effortlessly. 
        With real-time updates, smart organization, and a clean interface, 
        staying productive has never been easier.
       </p>
       <button
       onClick={() => navigate("/signup")}
       class="bg-[#D4AF37] hover:bg-[#B9972F] cursor-pointer transition-colors duration-300 flex gap-2 justify-center w-65 font-bold text-lg rounded-lg  py-3 text-white shadow-md">
        Start Organizing Today
      </button>
      </div>

      {/* Right Side */}
      <div class="mt-25 h-130 w-170 flex items-center justify-center shadow-lg rounded-lg">
        <img src={HeroPageImage} 
        alt="To-Do App image" 
        class="p-5 h-120 w-170" />
      </div>
      </div>
      </>
  )
}

export default Landing;