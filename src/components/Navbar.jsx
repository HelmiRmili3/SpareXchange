import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice"; // Adjust path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };
  const handleLogout = () => dispatch(logout());

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
              Shop
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

        {/* Desktop Account or Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Messages Button */}
              <Link
                to="/messages"
                className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </Link>

              {/* Notifications Button */}
              <Link
                to="/notifications"
                className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </Link>

              {/* Shopping Bag Button */}
              <Link
                to="/cart"
                className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </Link>

              {/* Account Button with Dropdown Badge */}
              <div className="relative">
                <button
                  onClick={handleAccountClick}
                  className="bg-white text-blue-600 p-1 rounded-full hover:bg-gray-200 relative"
                >
                  <img
                    src="https://picsum.photos/40"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="absolute bottom-0 left-0 w-3 h-3 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg
                      className="w-2 h-2 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Desktop Account Dropdown */}
                {isAccountOpen && (
                  <div className="absolute top-10 mt-2 right-0 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <img
                        src="https://picsum.photos/40"
                        alt="Avatar"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{user.displayName || user.email}</span>
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
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
            Shop
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
            <div className="flex flex-col items-center space-y-4 w-full">
              {/* Mobile Authenticated Buttons */}
              <div className="flex space-x-4">
                {/* Messages Button */}
                <Link
                  to="/messages"
                  className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </Link>

                {/* Notifications Button */}
                <Link
                  to="/notifications"
                  className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </Link>

                {/* Shopping Bag Button */}
                <Link
                  to="/cart"
                  className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </Link>

                {/* Account Button with Dropdown Badge */}
                <div className="relative">
                  <button
                    onClick={handleAccountClick}
                    className="bg-white text-blue-600 p-1 rounded-full hover:bg-gray-200 relative"
                  >
                    <img
                      src="https://picsum.photos/40"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="absolute bottom-0 left-0 w-3 h-3 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg
                        className="w-2 h-2 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Mobile Account Dropdown */}
              {isAccountOpen && (
                <div className="w-full bg-white text-gray-800 rounded-lg shadow-lg py-2">
                  <Link
                    to="/account"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setIsAccountOpen(false);
                    }}
                  >
                    <img
                      src="https://picsum.photos/40"
                      alt="Avatar"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{user.displayName || user.email}</span>
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setIsAccountOpen(false);
                    }}
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                      setIsAccountOpen(false);
                    }}
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
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
