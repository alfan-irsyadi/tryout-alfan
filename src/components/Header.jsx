import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-black">
              Anonymath
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {currentUser && (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Menu
                </Link>
                <Link
                  to="/mini-tryout"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Mini Tryout
                </Link>
                <Link
                  to="/tryout"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tryout
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-sm font-medium text-gray-700">{currentUser.displayName}</span>
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {currentUser && (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                >
                  Menu
                </Link>
                <Link
                  to="/mini-tryout"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                >
                  Mini Tryout
                </Link>
                <Link
                  to="/tryout"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                >
                  Tryout
                </Link>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center px-3 py-2">
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    <span className="ml-3 text-base font-medium text-gray-700">
                      {currentUser.displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;