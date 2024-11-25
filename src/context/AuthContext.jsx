// src/context/AuthContext.js

import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const db = getFirestore();

  const checkUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      return userDoc.exists();
    } catch (error) {
      console.error('Error checking user profile:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const hasProfile = await checkUserProfile(currentUser.uid);
        setHasCompletedProfile(hasProfile);
      } else {
        setHasCompletedProfile(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setHasCompletedProfile(false);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const hasProfile = await checkUserProfile(result.user.uid);
      setHasCompletedProfile(hasProfile);
      return { user: result.user, hasProfile };
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };

  const value = {
    currentUser: user,
    loading,
    logout,
    loginWithGoogle,
    hasCompletedProfile,
    setHasCompletedProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};