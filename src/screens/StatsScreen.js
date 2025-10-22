import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import useStore from '../store/useStore';

const StatsScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [chartType, setChartType] = useState('Bar Chart');
  
  const { players } = useStore();

  // Filter players based on search query
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImportExport = () => {
    Alert.alert('Import/Export', 'Data import/export functionality coming soon!');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f5f7f8', // background-light
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f5f7f8',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#212529',
        }}>
          Player Statistics
        </Text>
        <TouchableOpacity
          onPress={handleImportExport}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#007BFF', // primary
            borderRadius: 8,
          }}
        >
          <MaterialIcons name="import-export" size={16} color="white" />
          <Text style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '500',
          }}>
            Import/Export Data
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{
        flex: 1,
        padding: 16,
      }} showsVerticalScrollIndicator={false}>
        {/* Search and Filters */}
        <View style={{
          flexDirection: 'column',
          gap: 16,
          marginBottom: 16,
        }}>
          <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: 'row',
              width: '100%',
              height: 48,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              backgroundColor: 'white',
            }}>
              <View style={{
                width: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: '#e5e7eb',
              }}>
                <MaterialIcons name="search" size={20} color="#6b7280" />
              </View>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search players..."
                placeholderTextColor="#6b7280"
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  color: '#212529',
                }}
              />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            gap: 12,
          }}>
            <TouchableOpacity style={{
              height: 48,
              paddingHorizontal: 16,
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#212529',
              }}>
                Team
              </Text>
              <MaterialIcons name="arrow-drop-down" size={20} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity style={{
              height: 48,
              paddingHorizontal: 16,
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#212529',
              }}>
                Date Range
              </Text>
              <MaterialIcons name="arrow-drop-down" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics Table */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          marginBottom: 16,
        }}>
          {/* Table Header */}
          <View style={{
            backgroundColor: '#f9fafb',
            flexDirection: 'row',
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}>
            <View style={{ flex: 1 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Player
                </Text>
                <MaterialIcons name="unfold-more" size={14} color="#6b7280" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Goals
                </Text>
                <MaterialIcons name="unfold-more" size={14} color="#6b7280" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Assists
                </Text>
                <MaterialIcons name="unfold-more" size={14} color="#6b7280" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Blocks
                </Text>
                <MaterialIcons name="unfold-more" size={14} color="#6b7280" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Turnovers
                </Text>
                <MaterialIcons name="unfold-more" size={14} color="#6b7280" />
              </View>
            </View>
          </View>

          {/* Table Body */}
          {filteredPlayers.map((player, index) => (
            <View
              key={player.id}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 24,
                paddingVertical: 16,
                backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#212529',
                }}>
                  {player.name}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  {player.goals}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  {player.assists}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  {player.blocks}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  {player.turnovers}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <View style={{
          flexDirection: 'column',
          gap: 16,
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <View style={{
              height: 40,
              width: 300,
              backgroundColor: '#e5e7eb',
              borderRadius: 8,
              padding: 2,
              flexDirection: 'row',
            }}>
              <TouchableOpacity
                onPress={() => setChartType('Bar Chart')}
                style={{
                  flex: 1,
                  height: 36,
                  backgroundColor: chartType === 'Bar Chart' ? 'white' : 'transparent',
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: chartType === 'Bar Chart' ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: chartType === 'Bar Chart' ? 2 : 0,
                }}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: chartType === 'Bar Chart' ? '#007BFF' : '#6b7280',
                }}>
                  Bar Chart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChartType('Line Chart')}
                style={{
                  flex: 1,
                  height: 36,
                  backgroundColor: chartType === 'Line Chart' ? 'white' : 'transparent',
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: chartType === 'Line Chart' ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: chartType === 'Line Chart' ? 2 : 0,
                }}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: chartType === 'Line Chart' ? '#007BFF' : '#6b7280',
                }}>
                  Line Chart
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Chart */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            padding: 24,
            minHeight: 300,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#212529',
              marginBottom: 8,
            }}>
              Player Goal Progression
            </Text>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#FFA500', // secondary
              marginBottom: 8,
            }}>
              25 Goals
            </Text>
            <View style={{
              flexDirection: 'row',
              gap: 4,
              marginBottom: 24,
            }}>
              <Text style={{
                fontSize: 16,
                color: '#6b7280',
              }}>
                Last 5 games
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#16a34a',
              }}>
                +12%
              </Text>
            </View>
            
            {/* Simple Bar Chart Representation */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'end',
              height: 180,
              gap: 24,
              paddingHorizontal: 12,
            }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 20,
                  height: '40%',
                  backgroundColor: 'rgba(0, 123, 255, 0.2)',
                  borderRadius: 2,
                  marginBottom: 8,
                }} />
                <Text style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#6b7280',
                  letterSpacing: 0.015,
                }}>
                  Game 1
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 20,
                  height: '60%',
                  backgroundColor: 'rgba(0, 123, 255, 0.2)',
                  borderRadius: 2,
                  marginBottom: 8,
                }} />
                <Text style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#6b7280',
                  letterSpacing: 0.015,
                }}>
                  Game 2
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 20,
                  height: '50%',
                  backgroundColor: 'rgba(0, 123, 255, 0.2)',
                  borderRadius: 2,
                  marginBottom: 8,
                }} />
                <Text style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#6b7280',
                  letterSpacing: 0.015,
                }}>
                  Game 3
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 20,
                  height: '80%',
                  backgroundColor: 'rgba(0, 123, 255, 0.2)',
                  borderRadius: 2,
                  marginBottom: 8,
                }} />
                <Text style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#6b7280',
                  letterSpacing: 0.015,
                }}>
                  Game 4
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 20,
                  height: '95%',
                  backgroundColor: '#FFA500', // secondary
                  borderRadius: 2,
                  marginBottom: 8,
                }} />
                <Text style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#6b7280',
                  letterSpacing: 0.015,
                }}>
                  Game 5
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;
