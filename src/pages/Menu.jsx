import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const menuItems = [
    {
      title: 'Mini Tryout',
      description: 'Latihan singkat dengan soal-soal pilihan',
      path: '/mini-tryout',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: 'Tryout',
      description: 'Simulasi ujian lengkap dengan waktu terbatas',
      path: '/tryout',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Selamat Datang di Anonymath
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex items-start space-x-4"
            >
              <div className="flex-shrink-0 bg-black rounded-lg p-3 text-white">
                {item.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Statistik Anda
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Mini Tryout Selesai</p>
              <p className="text-2xl font-bold text-black">0</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tryout Selesai</p>
              <p className="text-2xl font-bold text-black">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
