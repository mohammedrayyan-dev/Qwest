import QwestLogo from "/src/assets/QwestLogo.png"
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  
  return (
    <nav>
      <div class="flex items-center justify-between space-x-10 pt-2">

      {/* Logo + Title */}
      <div class="flex items-center text-left pl-8 py-2 space-x-3">
        <img src={QwestLogo} alt="QwestLogo" class="w-7 h-7" />
        <h1 class="text-3xl font-semibold text-[#111827]">Qwest</h1>
      </div>

      <div class="flex items-center space-x-5 pr-8 pt-2">
        <Link to="/signin" class="text-lg text-[#111827] font-semibold">
          Sign In
        </Link>
        <button
       onClick={() => navigate("/signup")}
       class="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black cursor-pointer transition-colors duration-300 flex justify-center items-center px-4 py-2 text-lg font-semibold rounded-lg">
        Join Free
      </button>
      </div>
      </div>

    </nav>
  )
}

export default Navbar;