import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const Register = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [instansi, setInstansi] = useState('');
  const [lokasi, setLokasi] = useState('');
  const navigate = useNavigate();
  const { user, hasCompletedProfile, setHasCompletedProfile } = useContext(AuthContext);
  const db = getFirestore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (hasCompletedProfile) {
      navigate('/menu');
    } else {
      setName(user.displayName || '');
    }
  }, [user, hasCompletedProfile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userData = {
        uid: user.uid,
        name,
        email: user.email,
        photoURL: user.photoURL,
        instansi,
        lokasi,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setHasCompletedProfile(true);
      navigate('/menu');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || hasCompletedProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-['Public Sans']">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-8 text-black text-center">Complete Your Profile</h2>
        
        {/* Profile Picture */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          {/* Email (disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {/* Instansi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              type="text"
              value={instansi}
              onChange={(e) => setInstansi(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;