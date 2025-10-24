import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import useStore from '../store/useStore';

const GameDetailsModal = ({ visible, game, onClose }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { gamePlayerStats } = useStore();

  if (!game) return null;

  // Get per-game player stats for this specific game
  const gameSpecificStats = gamePlayerStats[game.id] || [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: '#f5f7f8',
      }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          backgroundColor: 'white',
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#111518',
          }}>
            Game Details
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#f3f4f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Game Info */}
          <View style={{ padding: 16 }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#111518',
                marginBottom: 8,
              }}>
                {game.opponent}
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: game.result === 'Win' ? '#10b981' : game.result === 'Loss' ? '#ef4444' : '#6b7280',
                }}>
                  {game.teamScore} - {game.opponentScore}
                </Text>
                <View style={{
                  marginLeft: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor: game.result === 'Win' ? '#dcfce7' : game.result === 'Loss' ? '#fee2e2' : '#f3f4f6',
                }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: game.result === 'Win' ? '#059669' : game.result === 'Loss' ? '#dc2626' : '#6b7280',
                  }}>
                    {game.result}
                  </Text>
                </View>
              </View>
              <Text style={{
                fontSize: 14,
                color: '#6b7280',
              }}>
                {game.date}
              </Text>
            </View>

            {/* Player Stats */}
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111518',
              marginBottom: 12,
            }}>
              Player Statistics
            </Text>
            
            <View style={{
              backgroundColor: 'white',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              {/* Header Row */}
              <View style={{
                flexDirection: 'row',
                backgroundColor: '#f8fafc',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
              }}>
                <Text style={{ flex: 2, fontSize: 14, fontWeight: '600', color: '#374151' }}>Player</Text>
                <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#374151', textAlign: 'center' }}>Goals</Text>
                <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#374151', textAlign: 'center' }}>Assists</Text>
                <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#374151', textAlign: 'center' }}>Blocks</Text>
                <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#374151', textAlign: 'center' }}>Turnovers</Text>
              </View>

              {/* Player Rows */}
              {gameSpecificStats.map((player, index) => (
                <View
                  key={player.id}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderBottomWidth: index < gameSpecificStats.length - 1 ? 1 : 0,
                    borderBottomColor: '#f3f4f6',
                  }}
                >
                  <Text style={{ flex: 2, fontSize: 14, color: '#111518', fontWeight: '500' }}>
                    {player.name}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 14, color: '#111518', textAlign: 'center' }}>
                    {player.goals}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 14, color: '#111518', textAlign: 'center' }}>
                    {player.assists}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 14, color: '#111518', textAlign: 'center' }}>
                    {player.blocks}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 14, color: '#111518', textAlign: 'center' }}>
                    {player.turnovers}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default GameDetailsModal;
