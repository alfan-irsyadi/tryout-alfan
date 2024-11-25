// src/components/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="flex flex-col justify-center p-4 bg-white text-black">
      {/* Welcome Card */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-5xl font-bold mb-2">Welcome!</h2>
        <p className="text-lg">
          We're glad to have you here. Choose one of the options below to get started with your tryout!
        </p>
      </div>

      {/* Description Card */}
      <div className="p-6 rounded-lg w-full  mb-6 text-xl">
        <p className="text-md">
          <span className='font-bold'>Anonymath</span> is a tryout platform designed specifically for the "UJI Kompetensi Statistisi." 
          Our platform provides you with the tools to assess your statistical knowledge and skills 
          through a series of interactive quizzes. Get ready to test your understanding and improve 
          your competencies in statistics!
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link to="/mini-tryout" className="block px-4 py-2 text-black hover:bg-gray-200 rounded transition">
              Mini Tryout
            </Link>
          </li>
          <li>
            <Link to="/tryout" className="block px-4 py-2 text-black hover:bg-gray-200 rounded transition">
              Tryout
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;