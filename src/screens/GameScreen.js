import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import useStore from '../store/useStore';

const GameScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showAssistModal, setShowAssistModal] = useState(false);
  const [scoringPlayerId, setScoringPlayerId] = useState(null);
  
  const {
    currentGame,
    currentGamePlayerStats,
    updateCurrentGameScore,
    updateCurrentGamePlayerStats,
    startNewGame,
    finishGame,
  } = useStore();

  const handleScoreUpdate = (team, increment) => {
    if (increment > 0 || currentGame[team] > 0) {
      updateCurrentGameScore(team, increment);
    }
  };

  const handlePlayerStatUpdate = (playerId, statType, increment) => {
    const player = currentGamePlayerStats.find(p => p.id === playerId);
    if (increment > 0 || player[statType] > 0) {
      updateCurrentGamePlayerStats(playerId, statType, increment);
      
      // If it's a goal, update team score and show assist modal
      if (statType === 'goals' && increment > 0) {
        updateCurrentGameScore('teamAScore', 1);
        setScoringPlayerId(playerId);
        setShowAssistModal(true);
      }
    }
  };

  const handleAssistSelection = (assistingPlayerId) => {
    if (assistingPlayerId) {
      updateCurrentGamePlayerStats(assistingPlayerId, 'assists', 1);
    }
    setShowAssistModal(false);
    setScoringPlayerId(null);
  };

  const handleFinishGame = () => {
    finishGame();
    Alert.alert('Game Finished!', 'Game stats have been saved and added to recent games.');
  };

  const handleStartNewGame = () => {
    startNewGame();
    Alert.alert('New Game Started!', 'Ready to track a new game.');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f5f7f8', // background-light
      paddingBottom: 128, // Adjusted for footer and FAB
    }}>
      {/* Header */}
      <View style={{
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
        {currentGame.isActive && (
          <View style={{
            backgroundColor: '#dc2626',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            alignSelf: 'center',
            marginBottom: 8,
          }}>
            <Text style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
              GAME IN PROGRESS
            </Text>
          </View>
        )}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#0d8bf2', // primary
            }}>
              {currentGame.teamAName}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 4,
            }}>
              <TouchableOpacity
                onPress={() => handleScoreUpdate('teamAScore', -1)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 16,
                  backgroundColor: '#f5f7f8',
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#111518',
                }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                width: 40,
                textAlign: 'center',
                color: '#111518',
              }}>
                {currentGame.teamAScore}
              </Text>
              <TouchableOpacity
                onPress={() => handleScoreUpdate('teamAScore', 1)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 16,
                  backgroundColor: '#f5f7f8',
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#111518',
                }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#9ca3af',
          }}>
            VS
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#6b7280',
            }}>
              {currentGame.teamBName}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 4,
            }}>
              <TouchableOpacity
                onPress={() => handleScoreUpdate('teamBScore', -1)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 16,
                  backgroundColor: '#f5f7f8',
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#111518',
                }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                width: 40,
                textAlign: 'center',
                color: '#111518',
              }}>
                {currentGame.teamBScore}
              </Text>
              <TouchableOpacity
                onPress={() => handleScoreUpdate('teamBScore', 1)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 16,
                  backgroundColor: '#f5f7f8',
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#111518',
                }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Player List */}
      <ScrollView style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
      }} showsVerticalScrollIndicator={false}>
        {currentGamePlayerStats.map((player) => (
          <View key={player.id} style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 2,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#111518',
              marginBottom: 12,
            }}>
              {player.name}
            </Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
            }}>
              {/* Goal */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#dcfce7', // green-100
                borderRadius: 8,
                padding: 8,
                flexBasis: '48%',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <MaterialIcons name="sports-soccer" size={20} color="#16a34a" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#16a34a',
                  }}>
                    Goal
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'goals', -1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#bbf7d0', // green-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#16a34a',
                    }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    width: 16,
                    textAlign: 'center',
                    color: '#16a34a',
                  }}>
                    {player.goals}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'goals', 1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#bbf7d0', // green-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#16a34a',
                    }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Assist */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#dbeafe', // blue-100
                borderRadius: 8,
                padding: 8,
                flexBasis: '48%',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <MaterialIcons name="assistant" size={20} color="#2563eb" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#2563eb',
                  }}>
                    Assist
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'assists', -1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#bfdbfe', // blue-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#2563eb',
                    }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    width: 16,
                    textAlign: 'center',
                    color: '#2563eb',
                  }}>
                    {player.assists}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'assists', 1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#bfdbfe', // blue-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#2563eb',
                    }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Block */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f3e8ff', // purple-100
                borderRadius: 8,
                padding: 8,
                flexBasis: '48%',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <MaterialIcons name="block" size={20} color="#7c3aed" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#7c3aed',
                  }}>
                    Block
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'blocks', -1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#e9d5ff', // purple-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#7c3aed',
                    }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    width: 16,
                    textAlign: 'center',
                    color: '#7c3aed',
                  }}>
                    {player.blocks}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'blocks', 1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#e9d5ff', // purple-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#7c3aed',
                    }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Turnover */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fee2e2', // red-100
                borderRadius: 8,
                padding: 8,
                flexBasis: '48%',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <MaterialIcons name="error" size={20} color="#dc2626" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#dc2626',
                  }}>
                    Turnover
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'turnovers', -1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#fecaca', // red-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#dc2626',
                    }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    width: 16,
                    textAlign: 'center',
                    color: '#dc2626',
                  }}>
                    {player.turnovers}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handlePlayerStatUpdate(player.id, 'turnovers', 1)}
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: '#fecaca', // red-200
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#dc2626',
                    }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>



      {/* Start New Game Button */}
      {!currentGame.isActive && (
        <TouchableOpacity 
          onPress={handleStartNewGame}
          style={{
            position: 'absolute',
            bottom: 80,
            left: 16,
            right: 16,
            height: 48,
            backgroundColor: '#16a34a',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
            Start New Game
          </Text>
        </TouchableOpacity>
      )}

      {/* Finish Game Button */}
      {currentGame.isActive && (
        <TouchableOpacity 
          onPress={handleFinishGame}
          style={{
            position: 'absolute',
            bottom: 80,
            right: 16,
            height: 56,
            width: 56,
            backgroundColor: '#dc2626',
            borderRadius: 28,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
          }}
        >
          <MaterialIcons name="flag" size={32} color="white" />
        </TouchableOpacity>
      )}

      {/* Assist Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAssistModal}
        onRequestClose={() => setShowAssistModal(false)}
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
            padding: 24,
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
              marginBottom: 20,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111518',
            }}>
              Who assisted with this goal?
            </Text>
            
            <View style={{
              width: '100%',
              gap: 12,
              marginBottom: 20,
            }}>
              <TouchableOpacity
                onPress={() => handleAssistSelection(null)}
                style={{
                  width: '100%',
                  padding: 12,
                  backgroundColor: '#f3f4f6',
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#374151',
                }}>
                  No Assist
                </Text>
              </TouchableOpacity>
              
              {currentGamePlayerStats.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  onPress={() => handleAssistSelection(player.id)}
                  style={{
                    width: '100%',
                    padding: 12,
                    backgroundColor: '#f3f4f6',
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#374151',
                  }}>
                    {player.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GameScreen;
