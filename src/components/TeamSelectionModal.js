import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TeamSelectionModal = ({ visible, onClose, onSelectTeam, selectedTeam, isUserTeamSelection = false }) => {
  const [searchText, setSearchText] = useState('');

  // Teams available for selection
  const predefinedTeams = isUserTeamSelection 
    ? ['Alpha', 'Beta', 'Gamma', 'Delta'] // All teams for user selection
    : ['Beta', 'Gamma', 'Delta']; // Only opponent teams for game selection

  const filteredTeams = predefinedTeams.filter(team =>
    team.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleTeamSelect = (team) => {
    onSelectTeam(team);
    onClose();
  };


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {isUserTeamSelection ? 'Choose Your Team' : 'Choose Opponent Team'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={isUserTeamSelection 
                ? "Search teams (Alpha, Beta, Gamma, Delta)..." 
                : "Search opponent teams (Beta, Gamma, Delta)..."}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>


          {/* Team List */}
          <ScrollView style={styles.teamList} showsVerticalScrollIndicator={false}>
            {filteredTeams.map((team, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.teamItem,
                  selectedTeam === team && styles.selectedTeamItem
                ]}
                onPress={() => handleTeamSelect(team)}
              >
                <View style={styles.teamItemContent}>
                  <View style={styles.teamIcon}>
                    <Text style={styles.teamIconText}>
                      {team[0]}
                    </Text>
                  </View>
                  <Text style={[
                    styles.teamName,
                    selectedTeam === team && styles.selectedTeamName
                  ]}>
                    {team}
                  </Text>
                </View>
                {selectedTeam === team && (
                  <MaterialIcons name="check" size={20} color="#007BFF" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Selected Team Display */}
          {selectedTeam && (
            <View style={styles.selectedTeamContainer}>
              <Text style={styles.selectedTeamLabel}>
                {isUserTeamSelection ? 'Selected Team:' : 'Selected Opponent:'}
              </Text>
              <Text style={styles.selectedTeamText}>Team {selectedTeam}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  teamList: {
    maxHeight: 300,
    paddingHorizontal: 20,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedTeamItem: {
    backgroundColor: '#eff6ff',
    borderColor: '#007BFF',
  },
  teamItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teamIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamIconText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  teamName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  selectedTeamName: {
    color: '#007BFF',
    fontWeight: '600',
  },
  selectedTeamContainer: {
    padding: 20,
    backgroundColor: '#f0f9ff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  selectedTeamLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  selectedTeamText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
});

export default TeamSelectionModal;