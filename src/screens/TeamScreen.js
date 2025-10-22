import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import PlayerCard from '../components/PlayerCard';
import LeaderboardItem from '../components/LeaderboardItem';
import AddPlayerModal from '../components/AddPlayerModal';
import useStore from '../store/useStore';

const TeamScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  
  const {
    teamName,
    teamLogo,
    games,
    players,
    selectedLeaderboardTab,
    addPlayer,
    removePlayer,
    setSelectedLeaderboardTab,
    importGameData,
  } = useStore();

  const handleAddPlayer = (playerData) => {
    addPlayer(playerData);
    Alert.alert('Success', 'Player added successfully!');
  };

  const handleRemovePlayer = (playerId) => {
    Alert.alert(
      'Remove Player',
      'Are you sure you want to remove this player?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removePlayer(playerId) },
      ]
    );
  };

  const handleGameDetails = (game) => {
    Alert.alert('Game Details', `${game.opponent} - ${game.teamScore} vs ${game.opponentScore}`);
  };

  const handleImportData = () => {
    importGameData();
    Alert.alert('Import', 'CSV data import simulation completed!');
  };

  // Sort players by selected stat for leaderboard
  const sortedPlayers = [...players].sort((a, b) => b[selectedLeaderboardTab.toLowerCase()] - a[selectedLeaderboardTab.toLowerCase()]);

  const leaderboardTabs = ['Goals', 'Assists', 'Blocks'];

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f5f7f8', // background-light
    }}>
      <Header
        teamName={teamName}
        teamLogo={teamLogo}
        onSettingsPress={() => Alert.alert('Settings', 'Settings screen coming soon!')}
      />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Recent Games Section */}
        <View style={{ padding: 16 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#111518',
            marginBottom: 8,
            letterSpacing: -0.015,
          }}>
            Recent Games
          </Text>
          <View style={{ gap: 16 }}>
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onDetailsPress={handleGameDetails}
              />
            ))}
          </View>
        </View>

        {/* Players Section */}
        <View style={{ padding: 16 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111518',
              letterSpacing: -0.015,
            }}>
              Players
            </Text>
            <TouchableOpacity
              onPress={() => setShowAddPlayerModal(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#0d8bf2',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <MaterialIcons name="add" size={16} color="white" />
              <Text style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '500',
              }}>
                Add Player
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 12 }}>
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onRemove={handleRemovePlayer}
              />
            ))}
          </View>
        </View>

        {/* Data Management Section */}
        <View style={{ padding: 16 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#111518',
            marginBottom: 8,
            letterSpacing: -0.015,
          }}>
            Data Management
          </Text>
          <TouchableOpacity
            onPress={handleImportData}
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'rgba(13, 139, 242, 0.2)',
              borderRadius: 8,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <MaterialIcons name="upload-file" size={20} color="#0d8bf2" />
            <Text style={{
              color: '#0d8bf2',
              fontSize: 16,
              fontWeight: '500',
            }}>
              Import Game Data from CSV
            </Text>
          </TouchableOpacity>
        </View>

        {/* Leaderboard Section */}
        <View style={{ padding: 16 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#111518',
            marginBottom: 12,
            letterSpacing: -0.015,
          }}>
            Leaderboard
          </Text>
          
          {/* Leaderboard Tabs */}
          <View style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb',
            marginBottom: 16,
          }}>
            {leaderboardTabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedLeaderboardTab(tab)}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  alignItems: 'center',
                  borderBottomWidth: selectedLeaderboardTab === tab ? 2 : 0,
                  borderBottomColor: selectedLeaderboardTab === tab ? '#0d8bf2' : 'transparent',
                }}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: selectedLeaderboardTab === tab ? '#0d8bf2' : '#6b7280',
                }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Leaderboard Items */}
          <View style={{ gap: 12 }}>
            {sortedPlayers.slice(0, 3).map((player, index) => (
              <LeaderboardItem
                key={player.id}
                rank={index + 1}
                player={player.name}
                statValue={player[selectedLeaderboardTab.toLowerCase()]}
                statType={selectedLeaderboardTab}
              />
            ))}
          </View>
        </View>

        {/* Bottom spacing for navigation */}
        <View style={{ height: 64 }} />
      </ScrollView>


      <AddPlayerModal
        visible={showAddPlayerModal}
        onClose={() => setShowAddPlayerModal(false)}
        onAddPlayer={handleAddPlayer}
      />
    </View>
  );
};

export default TeamScreen;
