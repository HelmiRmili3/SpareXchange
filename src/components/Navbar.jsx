import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Access the authentication state from Redux
  const { user } = useSelector((state) => state.auth); // Assuming `user` is in the auth slice
  const isAuthenticated = !!user; // Check if the user is authenticated

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">SpareXchange</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/sell" className="hover:text-gray-300">
              Sell
            </Link>
          </li>
          <li>
            <Link to="/exchange" className="hover:text-gray-300">
              Exchange
            </Link>
          </li>
          <li>
            <Link to="/donate" className="hover:text-gray-300">
              Donate
            </Link>
          </li>
          <li>
            <Link to="/freelance" className="hover:text-gray-300">
              Freelance
            </Link>
          </li>
          <li>
            <Link to="/transport" className="hover:text-gray-300">
              Transport
            </Link>
          </li>
        </ul>

        {/* Account or Auth Buttons */}
        <div className="hidden md:flex">
          {isAuthenticated ? (
            <Link
              to="/account"
              className="flex items-center bg-white text-blue-600 px-1 pr-4 py-1 rounded-full hover:bg-gray-200 shadow-md"
            >
              <img
                src="https://picsum.photos/40"
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{user.displayName || user.email}</span>{" "}
              {/* Display user's name or email */}
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 flex flex-col items-center py-4 mt-4 space-y-4">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/sell"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Sell
          </Link>
          <Link
            to="/exchange"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Exchange
          </Link>
          <Link
            to="/donate"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Donate
          </Link>
          <Link
            to="/freelance"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Freelance
          </Link>
          <Link
            to="/transport"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Transport
          </Link>

          {isAuthenticated ? (
            <Link
              to="/account"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
