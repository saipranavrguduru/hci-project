import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';

const GameCard = ({ game, onDetailsPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      gap: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
    }}>
      <View style={{
        flex: 2,
        gap: 8,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#111518',
        }}>
          Team Alpha vs {game.opponent}
        </Text>
        <Text style={{
          fontSize: 14,
          color: '#60778a',
        }}>
          Score: {game.teamScore}-{game.opponentScore} ({game.result})
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#9ca3af',
        }}>
          {game.date}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onDetailsPress(game)}
        style={{
          minWidth: 84,
          height: 32,
          backgroundColor: '#0d8bf2',
          borderRadius: 8,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
        }}
      >
        <Text style={{
          color: 'white',
          fontSize: 14,
          fontWeight: '500',
        }}>
          Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameCard;
