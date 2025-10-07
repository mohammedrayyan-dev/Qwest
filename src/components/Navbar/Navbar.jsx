import QwestLogo from "/src/assets/QwestLogo.png"
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  
  return (
    <nav>
      <div class="flex justify-between items-center bg-gray-100 p-4 sm:py-2">

      {/* Logo + Title */}
      <div class="flex flex-start items-center space-x-2 sm:py-2">
        <img src={QwestLogo} alt="QwestLogo" class="w-4 h-4 sm:w-7 sm:h-7" />
        <h1 class="text-xl font-semibold text-[#111827] sm:text-3xl">Qwest</h1>
      </div>
      
      {/* Sign in + Join Free */}
      <div class="sm:flex sm:items-center sm:space-x-3">
        <Link to="/signin" class="text-sm text-[#111827] font-semibold sm:text-lg">
          Sign In
        </Link>
        <button
        onClick={() => navigate("/signup")}
        class="hidden sm:p-2 sm:text-md sm:font-semibold sm:rounded-xl sm:border sm:border-[#D4AF37] sm:block sm:text-lg sm:text-[#D4AF37] sm:hover:bg-[#D4AF37] sm:hover:text-black sm:cursor-pointer sm:transition-colors sm:duration-300 ">
         Join Free
        </button>
      </div>
      </div>

    </nav>
  )
}

export default Navbar;