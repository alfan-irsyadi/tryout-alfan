import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = ({ 
  answers, 
  questions, 
  timeSpent, 
  onRetry, 
  showDiscussion = false, 
  type = 'mini-tryout' 
}) => {
  const navigate = useNavigate();
  const [showAllLeaderboard, setShowAllLeaderboard] = useState(false);

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    answers.forEach((answer, index) => {
      if (answer === null) {
        empty++;
      } else if (answer === questions[index].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = (correct / questions.length) * 100;

    return {
      correct,
      wrong,
      empty,
      score: Math.round(score * 100) / 100
    };
  };

  const results = calculateResults();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const fullLeaderboardData = [
    { rank: 1, name: "Siswa A", score: 95.5 },
    { rank: 2, name: "Siswa B", score: 92.0 },
    { rank: 3, name: "Siswa C", score: 88.5 },
    { rank: 4, name: "Siswa D", score: 85.0 },
    { rank: 5, name: "Siswa E", score: 82.5 },
    { rank: 6, name: "Siswa F", score: 80.0 },
    { rank: 7, name: "Siswa G", score: 78.5 },
    { rank: 8, name: "Siswa H", score: 75.0 },
    { rank: 9, name: "Siswa I", score: 72.5 },
    { rank: 10, name: "Siswa J", score: 70.0 },
  ];

  const displayedLeaderboard = showAllLeaderboard 
    ? fullLeaderboardData 
    : fullLeaderboardData.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-6">
            <h1 className="text-2xl font-bold">Hasil {type === 'mini-tryout' ? 'Mini Tryout' : 'Tryout'}</h1>
            <p className="text-gray-300 mt-2">Waktu pengerjaan: {formatTime(timeSpent)}</p>
          </div>

          {/* Score Summary */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Jumlah Benar</p>
                <p className="text-3xl font-bold text-green-600">{results.correct}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Jumlah Salah</p>
                <p className="text-3xl font-bold text-red-600">{results.wrong}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Jumlah Kosong</p>
                <p className="text-3xl font-bold text-gray-600">{results.empty}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Skor</p>
                <p className="text-3xl font-bold text-black">{results.score}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={onRetry}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Ulangi Ujian
              </button>
              {showDiscussion && (
                <button
                  onClick={() => {/* Handle discussion */}}
                  className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Pembahasan
                </button>
              )}
            </div>

            {/* Leaderboard */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Leaderboard</h2>
              </div>
              <div className="divide-y">
                {displayedLeaderboard.map((item) => (
                  <div
                    key={item.rank}
                    className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 
                        ${item.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          item.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          item.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-50 text-gray-600'}`}
                      >
                        {item.rank}
                      </span>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="font-semibold text-black">{item.score}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t">
                <button
                  onClick={() => setShowAllLeaderboard(!showAllLeaderboard)}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {showAllLeaderboard ? 'Tampilkan Lebih Sedikit' : 'Selengkapnya'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
