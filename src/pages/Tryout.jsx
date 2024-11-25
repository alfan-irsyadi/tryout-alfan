import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizLayout from '../components/QuizLayout';

const generateDummyQuestions = (count = 10) => {
  return Array(count).fill(null).map((_, index) => ({
    question: `Soal UTBK nomor ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?`,
    options: {
      A: `Pilihan A untuk soal ${index + 1}`,
      B: `Pilihan B untuk soal ${index + 1}`,
      C: `Pilihan C untuk soal ${index + 1}`,
      D: `Pilihan D untuk soal ${index + 1}`,
      E: `Pilihan E untuk soal ${index + 1}`
    },
    correctAnswer: ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)]
  }));
};

const Tryout = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTryout, setSelectedTryout] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const tryouts = [
    {
      id: 1,
      title: 'UTBK Minggu 1',
      description: 'Simulasi UTBK lengkap dengan semua mata pelajaran',
      date: '2024-01-20',
      duration: 180,
      status: 'upcoming',
      questions: generateDummyQuestions(50)
    },
    {
      id: 2,
      title: 'UTBK Minggu 2',
      description: 'Simulasi UTBK lengkap dengan semua mata pelajaran',
      date: '2024-01-27',
      duration: 180,
      status: 'upcoming',
      questions: generateDummyQuestions(50)
    },
    {
      id: 3,
      title: 'UTBK Minggu 3',
      description: 'Simulasi UTBK lengkap dengan semua mata pelajaran',
      date: '2024-02-03',
      duration: 180,
      status: 'upcoming',
      questions: generateDummyQuestions(50)
    }
  ];

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleTryoutClick = (tryout) => {
    setSelectedTryout(tryout);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setIsQuizStarted(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTryout(null);
  };

  const handleQuizComplete = (answers) => {
    console.log('Quiz completed with answers:', answers);
  };

  if (isQuizStarted && selectedTryout) {
    return (
      <QuizLayout
        questions={selectedTryout.questions}
        duration={selectedTryout.duration}
        onComplete={handleQuizComplete}
        type="tryout"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Menu
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Tryout UTBK</h1>
          <p className="mt-2 text-gray-600">
            Jadwal tryout UTBK yang akan datang
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tryouts.map((tryout) => (
            <div
              key={tryout.id}
              onClick={() => handleTryoutClick(tryout)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tryout.title}
                  </h3>
                  <div className="bg-black text-white text-sm px-3 py-1 rounded-full">
                    {tryout.duration} menit
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{tryout.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(tryout.date)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {tryout.status === 'upcoming' ? 'Belum dikerjakan' : 'Selesai'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedTryout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Mulai Tryout?
              </h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Kamu akan mengerjakan:</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">
                    {selectedTryout.title}
                  </p>
                  <p className="text-gray-600">{selectedTryout.description}</p>
                  <p className="text-gray-600">
                    Tanggal: {formatDate(selectedTryout.date)}
                  </p>
                  <p className="text-gray-600">
                    Waktu: {selectedTryout.duration} menit
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Mulai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tryout;