import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

const PlayerCard = ({ player, onRemove }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '500',
        color: '#111518',
      }}>
        {player.name}
      </Text>
      <TouchableOpacity onPress={() => onRemove(player.id)}>
        <MaterialIcons
          name="remove-circle-outline"
          size={24}
          color="#ef4444"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerCard;
