import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthChoiceScreen from '../screens/AuthChoiceScreen';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  console.log('AuthGuard state:', { isAuthenticated, isLoading, user: user?.email });

  // Show loading spinner while checking auth state
  if (isLoading) {
    console.log('AuthGuard: Showing loading spinner');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Show auth choice screen if not authenticated
  if (!isAuthenticated) {
    console.log('AuthGuard: Showing auth choice screen');
    return <AuthChoiceScreen />;
  }

  // Show protected content if authenticated
  console.log('AuthGuard: Showing protected content');
  
  // Add error boundary for debugging
  try {
    return children;
  } catch (error) {
    console.error('Error rendering protected content:', error);
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
          Error loading app: {error.message}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
  },
});

export default AuthGuard;
