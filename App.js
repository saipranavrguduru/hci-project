import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthGuard from './src/components/AuthGuard';

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  console.log('App component rendering...');

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AuthProvider>
        <AuthGuard>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthGuard>
      </AuthProvider>
    </SafeAreaProvider>
  );
}