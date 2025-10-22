import { create } from 'zustand';

const useStore = create((set) => ({
  // Authentication state
  isAuthenticated: false,
  user: null,
  authenticate: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),

  // Team data
  teamName: 'Team Alpha',
  teamLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHVG3OYxiwT-GM3OqGu9f2j7gmTLxlIIJAsBzta19G05DMDdLVs2oC16HBo-BK40iXjw74woN7Hwn_mZUq6IOMDxBleXi8S8XAruzZmPWCqstCSHLlMTkicOat5oH7q6Zmx-zXtVOtQCLmQVa26laZWY2qh7_QbDRnBDBTbOixnAK8OBbR9igCGokJYrfqSOYKgQKXAkvQpeFz3mEHAIjkYuaiYtOk5WgsYyD94S9QNVzM1Pil6vNKAW1yMJMF9LBfPSycUPuHC9aG',
  
  // Players data
  players: [
    { id: '1', name: 'Alex Johnson', goals: 21, assists: 12, blocks: 5, turnovers: 8 },
    { id: '2', name: 'Maria Garcia', goals: 18, assists: 15, blocks: 2, turnovers: 10 },
    { id: '3', name: 'James Smith', goals: 15, assists: 9, blocks: 8, turnovers: 4 },
    { id: '4', name: 'Chen Wei', goals: 10, assists: 22, blocks: 1, turnovers: 6 },
    { id: '5', name: 'Samira Jones', goals: 12, assists: 11, blocks: 10, turnovers: 7 },
    { id: '6', name: 'Leo Martinez', goals: 25, assists: 5, blocks: 3, turnovers: 9 },
  ],
  addPlayer: (playerData) => set((state) => ({
    players: [...state.players, { 
      id: String(state.players.length + 1), 
      ...playerData, 
      goals: 0, 
      assists: 0, 
      blocks: 0, 
      turnovers: 0 
    }],
  })),
  removePlayer: (id) => set((state) => ({
    players: state.players.filter((player) => player.id !== id),
  })),
  
  // Games data
  games: [
    { id: '1', opponent: 'Team Beta', teamScore: 15, opponentScore: 12, result: 'Win', date: 'Oct 28, 2023' },
    { id: '2', opponent: 'Team Gamma', teamScore: 13, opponentScore: 15, result: 'Loss', date: 'Oct 21, 2023' },
  ],

  // Current game state (for in-game tracking)
  currentGame: {
    teamAName: 'Team A',
    teamBName: 'Team B',
    teamAScore: 0,
    teamBScore: 0,
    isActive: false,
  },
  currentGamePlayerStats: [
    { id: '1', name: 'Alex Johnson', goals: 0, assists: 0, blocks: 0, turnovers: 0 },
    { id: '2', name: 'Maria Garcia', goals: 0, assists: 0, blocks: 0, turnovers: 0 },
    { id: '3', name: 'James Smith', goals: 0, assists: 0, blocks: 0, turnovers: 0 },
    { id: '4', name: 'Chen Wei', goals: 0, assists: 0, blocks: 0, turnovers: 0 },
    { id: '5', name: 'Samira Jones', goals: 0, assists: 0, blocks: 0, turnovers: 0 },
    { id: '6', name: 'Leo Martinez', goals: 0, assists: 0, blocks: 0, turnovers: 0 },
  ],
  startNewGame: () => set((state) => ({
    currentGame: {
      teamAName: 'Team A',
      teamBName: 'Team B',
      teamAScore: 0,
      teamBScore: 0,
      isActive: true,
    },
    currentGamePlayerStats: state.players.map(player => ({
      id: player.id,
      name: player.name,
      goals: 0,
      assists: 0,
      blocks: 0,
      turnovers: 0,
    })),
  })),
  updateCurrentGameScore: (team, increment) => set((state) => ({
    currentGame: {
      ...state.currentGame,
      [team]: Math.max(0, state.currentGame[team] + increment),
    },
  })),
  updateCurrentGamePlayerStats: (playerId, statType, increment) => set((state) => ({
    currentGamePlayerStats: state.currentGamePlayerStats.map((player) =>
      player.id === playerId
        ? { ...player, [statType]: Math.max(0, player[statType] + increment) }
        : player
    ),
  })),
  finishGame: () => set((state) => {
    const newGame = {
      id: String(state.games.length + 1),
      opponent: state.currentGame.teamBName,
      teamScore: state.currentGame.teamAScore,
      opponentScore: state.currentGame.teamBScore,
      result: state.currentGame.teamAScore > state.currentGame.teamBScore ? 'Win' : 
              state.currentGame.teamAScore < state.currentGame.teamBScore ? 'Loss' : 'Tie',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
    };
    
    // Update player stats with current game stats
    const updatedPlayers = state.players.map(player => {
      const gameStats = state.currentGamePlayerStats.find(p => p.id === player.id);
      return gameStats ? {
        ...player,
        goals: player.goals + gameStats.goals,
        assists: player.assists + gameStats.assists,
        blocks: player.blocks + gameStats.blocks,
        turnovers: player.turnovers + gameStats.turnovers,
      } : player;
    });
    
    return {
      games: [newGame, ...state.games],
      players: updatedPlayers,
      currentGame: {
        teamAName: 'Team A',
        teamBName: 'Team B',
        teamAScore: 0,
        teamBScore: 0,
        isActive: false,
      },
      currentGamePlayerStats: state.players.map(player => ({
        id: player.id,
        name: player.name,
        goals: 0,
        assists: 0,
        blocks: 0,
        turnovers: 0,
      })),
    };
  }),

  // Leaderboard state
  selectedLeaderboardTab: 'Goals',
  setSelectedLeaderboardTab: (tab) => set({ selectedLeaderboardTab: tab }),

  // Data management
  importGameData: () => {
    // Mock CSV import functionality
    console.log('Importing game data from CSV...');
  },
}));

export default useStore;
