import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native';

const LeaderboardItem = ({ rank, player, statValue, statType }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0d8bf2', // primary
      }}>
        {rank}
      </Text>
      <Text style={{
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#111518',
      }}>
        {player}
      </Text>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4b5563',
      }}>
        {statValue}
      </Text>
    </View>
  );
};

export default LeaderboardItem;
