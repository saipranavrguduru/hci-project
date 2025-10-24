import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('Mock Google sign-in...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data
      const mockUser = {
        uid: 'mock-user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://via.placeholder.com/150'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      console.log('Mock sign-in successful');
    } catch (error) {
      console.error('Mock sign-in error:', error);
      alert('Mock sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      console.log('Mock user signed out');
    } catch (error) {
      console.error('Mock sign-out error:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
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
