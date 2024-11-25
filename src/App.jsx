import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import MiniTryout from './pages/MiniTryout';
import Tryout from './pages/Tryout';
import PrivateRoute from './components/PrivateRoute';

const AppContent = () => {
  const location = useLocation();
  const isQuizActive = location.pathname.includes('/quiz/');

  return (
    <div className="min-h-screen bg-white">
      {!isQuizActive && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        />
        <Route
          path="/mini-tryout/*"
          element={
            <PrivateRoute>
              <MiniTryout />
            </PrivateRoute>
          }
        />
        <Route
          path="/tryout/*"
          element={
            <PrivateRoute>
              <Tryout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;