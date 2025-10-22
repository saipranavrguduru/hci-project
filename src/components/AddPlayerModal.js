import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native';

const AddPlayerModal = ({ visible, onClose, onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      onAddPlayer({ name: playerName.trim() });
      setPlayerName('');
      onClose();
    } else {
      Alert.alert('Error', 'Player name cannot be empty.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          width: '80%',
          maxWidth: 400,
        }}>
          <Text style={{
            marginBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#111518',
          }}>
            Add New Player
          </Text>
          <TextInput
            style={{
              height: 40,
              width: '100%',
              borderRadius: 8,
              paddingHorizontal: 10,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#d1d5db',
              backgroundColor: '#f9fafb',
              color: '#111518',
            }}
            placeholder="Player Name"
            placeholderTextColor="#6b7280"
            value={playerName}
            onChangeText={setPlayerName}
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ef4444',
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                flex: 1,
                marginHorizontal: 5,
                alignItems: 'center',
              }}
              onPress={onClose}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#0d8bf2',
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                flex: 1,
                marginHorizontal: 5,
                alignItems: 'center',
              }}
              onPress={handleAddPlayer}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlayerModal;
