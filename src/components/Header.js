import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const Header = ({ teamName, teamLogo }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    console.log('Logout button pressed');
    
    // Use browser confirm for web compatibility
    const confirmed = window.confirm('Are you sure you want to sign out?');
    
    if (confirmed) {
      console.log('User confirmed logout');
      signOut();
    } else {
      console.log('User cancelled logout');
    }
  };

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    }}>
      <View style={{
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image
          source={{ uri: teamLogo }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
      </View>
      <Text style={{
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111518',
        textAlign: 'center',
        letterSpacing: -0.015,
      }}>
        {teamName}
      </Text>
      
      {/* User info and logout button */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}>
        {user && (
          <View style={{
            alignItems: 'flex-end',
            marginRight: 8,
          }}>
            <Text style={{
              fontSize: 14,
              color: '#111518',
              fontWeight: '600',
            }}>
              {user.displayName || user.email?.split('@')[0] || 'User'}
            </Text>
            <Text style={{
              fontSize: 11,
              color: '#6b7280',
            }}>
              {user.email}
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            padding: 8,
            borderRadius: 6,
            backgroundColor: '#f3f4f6',
            minWidth: 36,
            minHeight: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#d1d5db',
          }}
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
