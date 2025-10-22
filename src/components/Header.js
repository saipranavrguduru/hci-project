import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

const Header = ({ teamName, teamLogo, onSettingsPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      <View style={{
        width: 48,
        alignItems: 'flex-end',
      }}>
        <TouchableOpacity
          onPress={onSettingsPress}
          style={{
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons
            name="settings"
            size={24}
            color="#111518"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
