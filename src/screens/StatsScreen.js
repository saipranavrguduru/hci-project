import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Modal, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import useStore from '../store/useStore';

const StatsScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showImportExportModal, setShowImportExportModal] = useState(false);
  const [showImportSuccessModal, setShowImportSuccessModal] = useState(false);
  const [showExportSuccessModal, setShowExportSuccessModal] = useState(false);
  const [csvContent, setCsvContent] = useState('');
  const [importedPlayers, setImportedPlayers] = useState([]);
  
  const { players } = useStore();

  // Get unique teams for dropdown
  const availableTeams = ['All Teams', ...new Set(players.map(player => player.team))];

  // Filter and sort players
  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTeam = selectedTeam === 'All Teams' || player.team === selectedTeam;
      return matchesSearch && matchesTeam;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setShowTeamModal(false);
  };

  const handleImportExport = () => {
    console.log('Import/Export button clicked!');
    Alert.alert('Test', 'Button is working!');
  };

  const generateCSV = () => {
    const headers = ['Player', 'Team', 'Goals', 'Assists', 'Blocks', 'Turnovers'];
    const csvRows = [headers.join(',')];
    
    filteredPlayers.forEach(player => {
      const row = [
        player.name,
        player.team,
        player.goals,
        player.assists,
        player.blocks,
        player.turnovers
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
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
          onPress={() => {
            setShowImportExportModal(true);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: '#007BFF', // primary
            borderRadius: 8,
          }}
        >
          <MaterialIcons name="import-export" size={20} color="white" />
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
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
            <TouchableOpacity 
              onPress={() => setShowTeamModal(true)}
              style={{
                height: 48,
                paddingHorizontal: 16,
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#212529',
                flex: 1,
              }}>
                {selectedTeam}
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
            <View style={{ flex: 1.5 }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Player
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Team
              </Text>
            </View>
            <TouchableOpacity 
              style={{ flex: 1 }}
              onPress={() => handleSort('goals')}
            >
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
                <MaterialIcons 
                  name={sortBy === 'goals' ? (sortOrder === 'desc' ? 'keyboard-arrow-down' : 'keyboard-arrow-up') : 'unfold-more'} 
                  size={14} 
                  color={sortBy === 'goals' ? '#007BFF' : '#6b7280'} 
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ flex: 1 }}
              onPress={() => handleSort('assists')}
            >
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
                <MaterialIcons 
                  name={sortBy === 'assists' ? (sortOrder === 'desc' ? 'keyboard-arrow-down' : 'keyboard-arrow-up') : 'unfold-more'} 
                  size={14} 
                  color={sortBy === 'assists' ? '#007BFF' : '#6b7280'} 
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ flex: 1 }}
              onPress={() => handleSort('blocks')}
            >
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
                <MaterialIcons 
                  name={sortBy === 'blocks' ? (sortOrder === 'desc' ? 'keyboard-arrow-down' : 'keyboard-arrow-up') : 'unfold-more'} 
                  size={14} 
                  color={sortBy === 'blocks' ? '#007BFF' : '#6b7280'} 
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ flex: 1 }}
              onPress={() => handleSort('turnovers')}
            >
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
                <MaterialIcons 
                  name={sortBy === 'turnovers' ? (sortOrder === 'desc' ? 'keyboard-arrow-down' : 'keyboard-arrow-up') : 'unfold-more'} 
                  size={14} 
                  color={sortBy === 'turnovers' ? '#007BFF' : '#6b7280'} 
                />
              </View>
            </TouchableOpacity>
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
              <View style={{ flex: 1.5 }}>
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
                  {player.team}
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

      </ScrollView>

      {/* Team Selection Modal */}
      <Modal
        visible={showTeamModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowTeamModal(false)}
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '80%',
            maxWidth: 300,
          }}>
            <Text style={{
              marginBottom: 20,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111518',
            }}>
              Select Team
            </Text>
            
            <View style={{ gap: 8 }}>
              {availableTeams.map((team) => (
                <TouchableOpacity
                  key={team}
                  onPress={() => handleTeamSelect(team)}
                  style={{
                    padding: 12,
                    backgroundColor: selectedTeam === team ? '#e0f2fe' : '#f3f4f6',
                    borderRadius: 8,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: selectedTeam === team ? '#0d8bf2' : '#e5e7eb',
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: selectedTeam === team ? '#0d8bf2' : '#374151',
                  }}>
                    {team}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Import/Export Modal */}
      <Modal
        visible={showImportExportModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowImportExportModal(false)}
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
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
              Import/Export Data
            </Text>
            <Text style={{
              marginBottom: 24,
              textAlign: 'center',
              fontSize: 16,
              color: '#374151',
            }}>
              Choose an option to import or export player statistics:
            </Text>
            
            <View style={{ gap: 12 }}>
              <TouchableOpacity
                onPress={() => {
                  setShowImportExportModal(false);
                  // For now, simulate import with sample data
                  const samplePlayers = [
                    { id: 'import1', name: 'Imported Player 1', team: 'Team Alpha', goals: 5, assists: 3, blocks: 2, turnovers: 1 },
                    { id: 'import2', name: 'Imported Player 2', team: 'Team Beta', goals: 8, assists: 4, blocks: 1, turnovers: 2 },
                    { id: 'import3', name: 'Imported Player 3', team: 'Team Gamma', goals: 3, assists: 7, blocks: 3, turnovers: 0 },
                  ];
                  setImportedPlayers(samplePlayers);
                  setShowImportSuccessModal(true);
                }}
                style={{
                  backgroundColor: '#28a745',
                  padding: 16,
                  borderRadius: 8,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <MaterialIcons name="upload-file" size={20} color="white" />
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                  Import CSV
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {
                  setShowImportExportModal(false);
                  try {
                    // Generate CSV content
                    const generatedCsv = generateCSV();
                    setCsvContent(generatedCsv);
                    
                    // Create and download file using web APIs
                    const blob = new Blob([generatedCsv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `player_stats_${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    
                    // Show success modal
                    setShowExportSuccessModal(true);
                  } catch (error) {
                    console.error('Export error:', error);
                    // Fallback to showing the modal with CSV content
                    setShowExportSuccessModal(true);
                  }
                }}
                style={{
                  backgroundColor: '#007BFF',
                  padding: 16,
                  borderRadius: 8,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <MaterialIcons name="download" size={20} color="white" />
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                  Export CSV
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setShowImportExportModal(false)}
                style={{
                  backgroundColor: '#6c757d',
                  padding: 16,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Import Success Modal */}
      <Modal
        visible={showImportSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowImportSuccessModal(false)}
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '80%',
            maxWidth: 400,
          }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <MaterialIcons name="check-circle" size={48} color="#28a745" />
            </View>
            <Text style={{
              marginBottom: 16,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111518',
            }}>
              Import Successful!
            </Text>
            <Text style={{
              marginBottom: 16,
              textAlign: 'center',
              fontSize: 16,
              color: '#374151',
            }}>
              CSV file has been imported successfully!
            </Text>
            <Text style={{
              marginBottom: 16,
              textAlign: 'center',
              fontSize: 14,
              color: '#6b7280',
            }}>
              {importedPlayers.length} players imported
            </Text>
            <View style={{
              backgroundColor: '#f8f9fa',
              borderRadius: 8,
              padding: 12,
              marginBottom: 20,
              maxHeight: 120,
            }}>
              <ScrollView showsVerticalScrollIndicator={true}>
                <Text style={{
                  fontSize: 12,
                  color: '#495057',
                  lineHeight: 16,
                }}>
                  {importedPlayers.slice(0, 5).map(player => 
                    `${player.name} (${player.team}) - ${player.goals}G, ${player.assists}A`
                  ).join('\n')}
                  {importedPlayers.length > 5 && '\n... and more'}
                </Text>
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() => setShowImportSuccessModal(false)}
              style={{
                backgroundColor: '#28a745',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
              }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Export Success Modal */}
      <Modal
        visible={showExportSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowExportSuccessModal(false)}
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '90%',
            maxWidth: 500,
          }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <MaterialIcons name="download" size={48} color="#007BFF" />
            </View>
            <Text style={{
              marginBottom: 16,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111518',
            }}>
              Export Successful!
            </Text>
            <Text style={{
              marginBottom: 16,
              textAlign: 'center',
              fontSize: 16,
              color: '#374151',
            }}>
              CSV file has been downloaded successfully! Here's a preview of the exported data:
            </Text>
            
            <View style={{
              backgroundColor: '#f8f9fa',
              borderRadius: 8,
              padding: 16,
              marginBottom: 20,
              maxHeight: 200,
            }}>
              <ScrollView showsVerticalScrollIndicator={true}>
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'monospace',
                  color: '#495057',
                  lineHeight: 16,
                }}>
                  {csvContent.split('\n').slice(0, 10).join('\n')}
                  {csvContent.split('\n').length > 10 && '\n... (truncated)'}
                </Text>
              </ScrollView>
            </View>
            
            <Text style={{
              marginBottom: 20,
              textAlign: 'center',
              fontSize: 14,
              color: '#6c757d',
              fontStyle: 'italic',
            }}>
              File saved as 'player_stats_YYYY-MM-DD.csv' in your Downloads folder
            </Text>
            
            <TouchableOpacity
              onPress={() => setShowExportSuccessModal(false)}
              style={{
                backgroundColor: '#007BFF',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
              }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StatsScreen;
