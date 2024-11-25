import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      <h2 className="text-3xl font-semibold mb-4">Welcome to <span className='font-bold'>Anonymath</span></h2>
      <p className="text-lg mb-4">This is a minimalist application built with React and Firebase.</p>
      <p className="text-md">Please login or register to continue.</p>
    </div>
  );
};

export default Home;