import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import useStore from '../store/useStore';

const AuthScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { authenticate } = useStore();

  const handleGoogleSignIn = () => {
    // Mock Google Sign-In - in a real app, this would integrate with Google OAuth
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://via.placeholder.com/150',
    };
    
    authenticate(mockUser);
    Alert.alert('Success', 'Signed in successfully!');
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
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATg1ltPaIrimbP5266IYxieC1kmmzt9URkg9HYuHTjkn7SAUO5CIYzCh48NEFZxjt8raCAm7NnaPWB8ZosUaFwAKUgnGpbha-ZFQp4kSVEDId-e9q13mQf7467CqggBefpC4jusrno72QPhbe5HKBz50jLbsI3dWBZm_sX37Bp5-q3jLvnDZtDv3dphCQiXGPlXCPHIGth2qev226t1yNhq_njuJg1HKySBgClwr9PwI8I4zfI6O4pl6TX6Wel9Hh3LqxMoV_3-zvv' }}
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
          style={{
            width: '100%',
            height: 48,
            backgroundColor: '#0d8bf2', // primary
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 32,
          }}
        >
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
