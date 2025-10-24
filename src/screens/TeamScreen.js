import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import PlayerCard from '../components/PlayerCard';
import LeaderboardItem from '../components/LeaderboardItem';
import AddPlayerModal from '../components/AddPlayerModal';
import GameDetailsModal from '../components/GameDetailsModal';
import useStore from '../store/useStore';

const TeamScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showGameDetailsModal, setShowGameDetailsModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  
  const {
    teamName,
    teamLogo,
    games,
    players,
    selectedLeaderboardTab,
    addPlayer,
    removePlayer,
    setSelectedLeaderboardTab,
  } = useStore();

  // Filter to only show our team players
  const ourTeamPlayers = players.filter(player => player.team === 'Team Alpha');

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
    setSelectedGame(game);
    setShowGameDetailsModal(true);
  };

  // Sort our team players by selected stat for leaderboard
  const sortedPlayers = [...ourTeamPlayers].sort((a, b) => b[selectedLeaderboardTab.toLowerCase()] - a[selectedLeaderboardTab.toLowerCase()]);

  const leaderboardTabs = ['Goals', 'Assists', 'Blocks'];

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f5f7f8', // background-light
    }}>
      <Header
        teamName={teamName}
        teamLogo={teamLogo}
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
            {ourTeamPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onRemove={handleRemovePlayer}
              />
            ))}
          </View>
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
            {sortedPlayers.map((player, index) => (
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

      <GameDetailsModal
        visible={showGameDetailsModal}
        game={selectedGame}
        onClose={() => {
          setShowGameDetailsModal(false);
          setSelectedGame(null);
        }}
      />
    </View>
  );
};

export default TeamScreen;
