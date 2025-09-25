import { Link } from "react-router-dom";
import homeIcon from "/img/home.svg";
import favIcon from "/img/fav.svg";

const Navbar = () => {
  return (
    <nav className="w-full p-5 mb-6">
      <div className="flex justify-center space-x-8">
        <Link 
          to="/" 
          className="flex items-center space-x-2 "
        >
          <img src={homeIcon} alt="Home" className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link 
          to="/fav" 
          className="flex items-center space-x-2 text-white hover:text-[#768d91] transition-colors duration-200 font-medium"
        >
          <img src={favIcon} alt="Favorites" className="w-5 h-5" />
          <span>Favorites</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;