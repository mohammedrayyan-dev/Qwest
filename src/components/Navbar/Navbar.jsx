import QwestLogo from "/src/assets/QwestLogo.png"
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  
  return (
    <nav>
      <div class="flex justify-between items-center bg-gray-50 border-b border-gray-200 px-6 py-4 sm:py-3">

      {/* Logo + Title */}
      <div class="flex flex-start items-center space-x-2 sm:py-2">
        <img src={QwestLogo} alt="QwestLogo" class="w-4 h-4 sm:w-7 sm:h-7" />
        <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Qwest</h1>
      </div>
      
      {/* Sign in + Join Free */}
      <div class="sm:flex sm:items-center sm:space-x-3">
        <Link to="/signin" class="text-sm text-gray-800 hover:text-gray-900 font-medium sm:text-lg">
          Sign In
        </Link>
        <button
        onClick={() => navigate("/signup")}
        class="hidden sm:block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 transition-transform duration-150 ease-out">
         Join Free
        </button>
      </div>
      </div>

    </nav>
  )
}

export default Navbar;