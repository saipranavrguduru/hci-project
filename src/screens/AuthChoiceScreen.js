import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const AuthChoiceScreen = () => {
  const [authMode, setAuthMode] = useState('choice'); // 'choice', 'signin', 'signup'

  if (authMode === 'signin') {
    return <SignInScreen onSwitchToSignUp={() => setAuthMode('signup')} />;
  }

  if (authMode === 'signup') {
    return <SignUpScreen onSwitchToSignIn={() => setAuthMode('signin')} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="sports-basketball" size={80} color="#007BFF" />
          </View>
          <Text style={styles.title}>Gainesville Ultimate Stats</Text>
          <Text style={styles.subtitle}>Track your team's performance</Text>
        </View>

        {/* Auth Options */}
        <View style={styles.authContainer}>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => setAuthMode('signin')}
          >
            <MaterialIcons name="login" size={24} color="white" />
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authButton, styles.signUpButton]}
            onPress={() => setAuthMode('signup')}
          >
            <MaterialIcons name="person-add" size={24} color="white" />
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What you can do:</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="sports" size={20} color="#007BFF" />
              <Text style={styles.featureText}>Track game statistics</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="group" size={20} color="#007BFF" />
              <Text style={styles.featureText}>Manage team rosters</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="analytics" size={20} color="#007BFF" />
              <Text style={styles.featureText}>View performance analytics</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="file-download" size={20} color="#007BFF" />
              <Text style={styles.featureText}>Export data to CSV</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  authContainer: {
    marginBottom: 48,
    gap: 16,
  },
  authButton: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: '#28a745',
  },
  authButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
});

export default AuthChoiceScreen;
