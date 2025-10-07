import { useNavigate } from "react-router-dom";
import QwestLogo from "/src/assets/QwestLogo.png";

const AuthLayout = ({
    title,
    children
}) => {
    const navigate = useNavigate();
  return (
    <>
    <div class="text-left pl-4 bg-gray-100 py-4 sm:pl-8">
      <h1
      onClick={() => navigate("/")} 
      class="text-xl font-semibold text-[#111827] sm:text-3xl sm:cursor-pointer">
        Qwest
      </h1>
    </div>

    <div class="sm:mt-25 flex items-center justify-center">
      <div class="grid grid-rows-2 h-auto w-full sm:grid-cols-2 sm:h-120 sm:w-240 sm:rounded-lg sm:shadow-md">

        {/* Desktop brand view */}
        <div class="hidden sm:block h-120 bg-gray-100 relative">
        <div class="flex flex-col items-center justify-center pt-18">
        <img src={QwestLogo} alt="QwestLogo" class="w-35 h-45" />
        <h3 class="text-4xl font-semibold text-[#111827] pt-6">
          Your day,
        </h3>
        <h3 class="text-4xl font-semibold text-[#111827]">
          your way! 
        </h3>
        </div>
        <h3 class="absolute text-xs text-gray-500 position bottom-4 left-4">
          © 2025 Qwest, Inc.
        </h3>
        </div>

        <div class="bg-[#FFFFFF] flex flex-col items-center justify-center">
        <h3 class="text-lg font-semibold text-[#111827] pt-6 pb-6 sm:text-3xl sm:pt-55 sm:pb-6">
          {title}
        </h3>
        <div>
        {children}
        </div>
        </div>

        {/* Mobile brand view */}
        <div class="block bg-gray-100 relative flex flex-col items-center justify-center sm:hidden">
        <img src={QwestLogo} alt="QwestLogo" class="w-17 h-23" />
        <h3 class="text-lg font-semibold text-[#111827]">
          Your day,
        </h3>
        <h3 class="text-lg font-semibold text-[#111827] pb-5">
          your way! 
        </h3>
        <h3 class="absolute text-xs text-gray-500 position bottom-4 left-4">
          © 2025 Qwest, Inc.
        </h3>
        </div>
        
      </div>
    </div>
    </>
  )
}
export default AuthLayout