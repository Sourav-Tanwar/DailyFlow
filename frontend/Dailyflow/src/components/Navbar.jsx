import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();


  const logOutHandle = () => {
    setIsMenuOpen(false)
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("authToken");
    dispatch(logout());

    navigate("/");
  };

  // const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600 w-full z-20 top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
          DailyFlow
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Main Navigation */}
        <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 p-4 md:p-0 rounded-lg">
            <li>
              <Link to="/expense" onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400">
                Expenses
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Login / Logout Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button
              onClick={logOutHandle}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile view login/logout button */}
      {isMenuOpen && (
        <div className="block md:hidden px-4 pb-4">
          {isLoggedIn ? (
            <button
              onClick={logOutHandle}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button onClick={() => setIsMenuOpen(false)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
