import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ResultPage from '../pages/ResultPage';

const QuizLayout = ({ questions, type = 'mini-tryout' }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [timeSpent, setTimeSpent] = useState(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleEndQuiz();
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleEndQuiz = useCallback(() => {
    setTimerActive(false);
    setIsQuizEnded(true);
    setShowConfirmEnd(false);
  }, []);

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setTimeSpent(0);
    setIsQuizEnded(false);
    setTimerActive(true);
  };

  if (isQuizEnded) {
    return (
      <ResultPage
        answers={answers}
        questions={questions}
        timeSpent={timeSpent}
        onRetry={handleRetry}
        showDiscussion={true}
        type={type}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionGroups = [];
  for (let i = 0; i < questions.length; i += 5) {
    questionGroups.push(questions.slice(i, i + 5));
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <img
              src={currentUser?.photoURL || 'https://via.placeholder.com/40'}
              alt="Profile"
              className="w-10 h-10 rounded-full mx-auto"
            />
            <p className="text-center mt-2 text-sm font-medium text-gray-900">
              {currentUser?.displayName || 'User'}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-center text-sm text-gray-600">
              Waktu: {formatTime(timeSpent)}
            </p>
          </div>
          {questionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <div className="grid grid-cols-5 gap-1">
                {group.map((_, index) => {
                  const questionNumber = groupIndex * 5 + index;
                  return (
                    <button
                      key={questionNumber}
                      onClick={() => setCurrentQuestionIndex(questionNumber)}
                      className={`w-full aspect-square rounded-lg text-sm font-medium
                        ${
                          questionNumber === currentQuestionIndex
                            ? 'bg-black text-white'
                            : answers[questionNumber] !== null
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-white border text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {questionNumber + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Soal {currentQuestionIndex + 1}
              </h2>
              <p className="mt-2 text-gray-600">{currentQuestion.question}</p>
            </div>

            <div className="space-y-3">
              {['A', 'B', 'C', 'D', 'E'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border ${
                    answers[currentQuestionIndex] === option
                      ? 'bg-black text-white border-black'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="font-medium">{option}.</span>{' '}
                  {currentQuestion.options[option]}
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Lewati
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                {currentQuestionIndex === questions.length - 1
                  ? 'Selesai'
                  : 'Simpan & Lanjutkan'}
              </button>
              <button
                onClick={() => setShowConfirmEnd(true)}
                className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100"
              >
                Akhiri Ujian
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Confirmation Modal */}
      {showConfirmEnd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Akhiri Ujian?
            </h3>
            <p className="text-gray-600 mb-6">
              Anda yakin ingin mengakhiri ujian? Jawaban yang belum disimpan akan hilang.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Batal
              </button>
              <button
                onClick={handleEndQuiz}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Ya, Akhiri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizLayout;
