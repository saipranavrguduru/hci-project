import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useAuth } from '../context/AuthContext';

const AuthScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { signInWithGoogle, isLoading } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f5f7f8', // background-light
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <View style={{
        width: '100%',
        maxWidth: 380,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
      }}>
        {/* Logo */}
        <View style={{
          width: 96,
          height: 96,
          marginBottom: 16,
          backgroundColor: '#f5f7f8',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Title */}
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#111518',
          textAlign: 'center',
          marginBottom: 32,
          lineHeight: 40,
          letterSpacing: -0.015,
        }}>
          Gainesville Ulty Stats
        </Text>

        {/* Google Sign-In Button */}
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            height: 48,
            backgroundColor: isLoading ? '#ccc' : '#0d8bf2', // primary
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 32,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <>
              {/* Google Logo SVG representation */}
              <View style={{
                width: 24,
                height: 24,
                marginRight: 8,
                backgroundColor: 'white',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: '#4285F4', fontSize: 14, fontWeight: 'bold' }}>G</Text>
              </View>
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                letterSpacing: 0.015,
              }}>
                Sign in with Google
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 16,
        }}>
          <TouchableOpacity>
            <Text style={{
              color: '#60778a',
              fontSize: 14,
              textDecorationLine: 'underline',
            }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{
              color: '#60778a',
              fontSize: 14,
              textDecorationLine: 'underline',
            }}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
