import { useState, useEffect } from 'react';
import { FaBell, FaCommentDots, FaUser, FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState('');

  // Close the dropdown if the route changes
  useEffect(() => {
    setIsDropdownOpen(false);

    console.log('loca',location)
    if(location.pathname === '/admin'){
        setUser('Admin')
    }
    else{
        setUser('Verifier')
    }
  }, [location]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleAdminClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate('/admin');
  };

  const handleVerifierClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate('/verifier');
  };

  return (
    <nav className="bg-white shadow-3xl py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Section with Logo and Hamburger Icon */}
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-[#0A512F]">CREDIT APP</h1>
          <button
            onClick={toggleDropdown}
            className="text-[#0A512F] hover:text-green-700 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Right Section with Icons */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <FaBell size={20} className="text-[#0A512F] hover:text-green-700 relative" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
          </div>

          <FaCommentDots size={20} className="text-[#0A512F] hover:text-green-700" />

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-[#0A512F] hover:text-green-700 focus:outline-none"
            >
              <FaUser size={20} />
              <span>{user}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-2 rounded-md z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleAdminClick}
                >
                  Admin
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleVerifierClick}
                >
                  Verifier
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
