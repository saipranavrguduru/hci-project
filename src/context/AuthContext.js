import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext({});

// Google OAuth configuration for Expo
const GOOGLE_CLIENT_ID = '995443239541-npnvjft6dretf4b0d3p05insm680k3rl.apps.googleusercontent.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('AuthProvider initializing...');
    console.log('Firebase auth object:', auth);
    console.log('Firebase app:', auth.app);
    
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Firebase auth state changed:', user ? 'User logged in' : 'User logged out');
      if (user) {
        console.log('User data:', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, displayName, team) => {
    try {
      setIsLoading(true);
      console.log('Creating new account:', email, 'Team:', team);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name and team
      const updates = {};
      if (displayName) {
        updates.displayName = displayName;
      }
      if (team) {
        updates.team = team;
      }
      
      if (Object.keys(updates).length > 0) {
        await result.user.updateProfile(updates);
      }
      
      console.log('Account created successfully:', result.user);
      return result.user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      console.log('Signing in:', email);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', result.user);
      return result.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Firebase authentication...');
      
      // Create a unique test account for this session
      const timestamp = Date.now();
      const email = `test${timestamp}@example.com`;
      const password = 'testpassword123';
      
      console.log('Creating test account:', email);
      
      try {
        // Create a new account
        const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Firebase account created successfully:', result.user);
        console.log('User email:', result.user.email);
        console.log('User UID:', result.user.uid);
      } catch (createError) {
        console.error('Account creation error:', createError);
        
        // If account already exists, try to sign in
        if (createError.code === 'auth/email-already-in-use') {
          console.log('Account exists, trying to sign in...');
          const result = await signInWithEmailAndPassword(auth, email, password);
          console.log('Firebase sign-in successful:', result.user);
        } else {
          throw createError;
        }
      }
    } catch (error) {
      console.error('Firebase authentication error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      alert(`Sign-in failed: ${error.message}. Please try again.`);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting sign out process...');
      await firebaseSignOut(auth);
      console.log('User signed out successfully');
      
      // Force state update
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Sign-out error:', error);
      alert('Error signing out. Please try again.');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
