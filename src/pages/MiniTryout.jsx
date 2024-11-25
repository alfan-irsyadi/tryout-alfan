import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizLayout from '../components/QuizLayout';

const generateDummyQuestions = (topic) => {
  return Array(10).fill(null).map((_, index) => ({
    question: `Soal ${topic} nomor ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?`,
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

const MiniTryout = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const sections = [
    {
      title: 'Matematika Dasar',
      cards: [
        {
          title: 'Aljabar',
          description: '10 soal pilihan ganda',
          duration: 20,
          questions: generateDummyQuestions('Aljabar')
        },
        {
          title: 'Geometri',
          description: '10 soal pilihan ganda',
          duration: 20,
          questions: generateDummyQuestions('Geometri')
        },
        {
          title: 'Trigonometri',
          description: '10 soal pilihan ganda',
          duration: 20,
          questions: generateDummyQuestions('Trigonometri')
        },
      ],
    },
    {
      title: 'Matematika IPA',
      cards: [
        {
          title: 'Kalkulus',
          description: '10 soal pilihan ganda',
          duration: 20,
          questions: generateDummyQuestions('Kalkulus')
        },
        {
          title: 'Vektor',
          description: '10 soal pilihan ganda',
          duration: 20,
          questions: generateDummyQuestions('Vektor')
        },
        {
          title: 'Matriks',
          description: '10 soal pilihan ganda',
          duration: 20,
          questions: generateDummyQuestions('Matriks')
        },
      ],
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setIsQuizStarted(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleQuizComplete = (answers) => {
    console.log('Quiz completed with answers:', answers);
  };

  if (isQuizStarted && selectedCard) {
    return (
      <QuizLayout
        questions={selectedCard.questions}
        duration={selectedCard.duration}
        onComplete={handleQuizComplete}
        type="mini-tryout"
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
          <h1 className="text-3xl font-bold text-gray-900">Mini Tryout</h1>
          <p className="mt-2 text-gray-600">Pilih topik yang ingin kamu pelajari</p>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  onClick={() => handleCardClick(card)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                      <div className="bg-black text-white text-sm px-3 py-1 rounded-full">
                        {card.duration} menit
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Belum dikerjakan
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {isModalOpen && selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Mulai Mini Tryout?
              </h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Kamu akan mengerjakan:</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">{selectedCard.title}</p>
                  <p className="text-gray-600">{selectedCard.description}</p>
                  <p className="text-gray-600">Waktu: {selectedCard.duration} menit</p>
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

export default MiniTryout;