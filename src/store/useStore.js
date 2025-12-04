import { create } from 'zustand';

const useStore = create((set) => ({
  // Authentication state
  isAuthenticated: false,
  user: null,
  authenticate: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),

  // Team data
  teamName: 'Team Alpha',
  teamLogo: 'file:///Users/saipranavguduru/Downloads/stitch_authentication_screen/GainesvilleUltyStats/assets/logo.png',
  
  // All league players data (our team + opponent teams)
  players: [
    // Team Alpha (Our Team)
    { id: '1', name: 'Alex Johnson', team: 'Team Alpha', goals: 21, assists: 12, blocks: 5, turnovers: 8 },
    { id: '2', name: 'Maria Garcia', team: 'Team Alpha', goals: 18, assists: 15, blocks: 2, turnovers: 10 },
    { id: '3', name: 'James Smith', team: 'Team Alpha', goals: 15, assists: 9, blocks: 8, turnovers: 4 },
    { id: '4', name: 'Chen Wei', team: 'Team Alpha', goals: 10, assists: 22, blocks: 1, turnovers: 6 },
    { id: '5', name: 'Samira Jones', team: 'Team Alpha', goals: 12, assists: 11, blocks: 10, turnovers: 7 },
    { id: '6', name: 'Leo Martinez', team: 'Team Alpha', goals: 25, assists: 5, blocks: 3, turnovers: 9 },
    
    // Team Beta
    { id: '7', name: 'David Wilson', team: 'Team Beta', goals: 19, assists: 8, blocks: 6, turnovers: 5 },
    { id: '8', name: 'Sarah Thompson', team: 'Team Beta', goals: 14, assists: 18, blocks: 4, turnovers: 7 },
    { id: '9', name: 'Mike Rodriguez', team: 'Team Beta', goals: 22, assists: 7, blocks: 9, turnovers: 3 },
    { id: '10', name: 'Lisa Chen', team: 'Team Beta', goals: 16, assists: 14, blocks: 2, turnovers: 8 },
    { id: '11', name: 'Tom Anderson', team: 'Team Beta', goals: 13, assists: 16, blocks: 5, turnovers: 6 },
    { id: '12', name: 'Emma Davis', team: 'Team Beta', goals: 20, assists: 9, blocks: 7, turnovers: 4 },
    
    // Team Gamma
    { id: '13', name: 'Chris Brown', team: 'Team Gamma', goals: 17, assists: 13, blocks: 8, turnovers: 5 },
    { id: '14', name: 'Jessica Lee', team: 'Team Gamma', goals: 23, assists: 6, blocks: 3, turnovers: 9 },
    { id: '15', name: 'Ryan Taylor', team: 'Team Gamma', goals: 11, assists: 20, blocks: 4, turnovers: 7 },
    { id: '16', name: 'Amanda White', team: 'Team Gamma', goals: 18, assists: 11, blocks: 6, turnovers: 6 },
    { id: '17', name: 'Kevin Moore', team: 'Team Gamma', goals: 15, assists: 15, blocks: 5, turnovers: 8 },
    { id: '18', name: 'Rachel Green', team: 'Team Gamma', goals: 21, assists: 8, blocks: 9, turnovers: 3 },
    
    // Team Delta
    { id: '19', name: 'Brian Johnson', team: 'Team Delta', goals: 14, assists: 17, blocks: 7, turnovers: 4 },
    { id: '20', name: 'Nicole Adams', team: 'Team Delta', goals: 19, assists: 10, blocks: 3, turnovers: 6 },
    { id: '21', name: 'Daniel Clark', team: 'Team Delta', goals: 16, assists: 12, blocks: 8, turnovers: 5 },
    { id: '22', name: 'Stephanie Hall', team: 'Team Delta', goals: 12, assists: 19, blocks: 2, turnovers: 9 },
    { id: '23', name: 'Mark Lewis', team: 'Team Delta', goals: 24, assists: 4, blocks: 6, turnovers: 7 },
    { id: '24', name: 'Jennifer King', team: 'Team Delta', goals: 17, assists: 14, blocks: 4, turnovers: 8 },
  ],
  addPlayer: (playerData) => set((state) => ({
    players: [...state.players, { 
      id: String(state.players.length + 1), 
      ...playerData, 
      team: 'Team Alpha', // New players are added to our team
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
  games: [],
  
  // Game-specific player stats (per game)
  gamePlayerStats: {},

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
  startNewGame: (opponentTeam) => set((state) => ({
    currentGame: {
      teamAName: 'Team Alpha', // Our team name
      teamBName: opponentTeam ? `Team ${opponentTeam}` : 'Team B',
      teamAScore: 0,
      teamBScore: 0,
      isActive: true,
    },
    currentGamePlayerStats: state.players
      .filter(player => player.team === 'Team Alpha') // Only include our team players
      .map(player => ({
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
    
    // Store per-game player stats
    const gameId = newGame.id;
    const gamePlayerStats = state.currentGamePlayerStats.map(player => ({
      id: player.id,
      name: player.name,
      goals: player.goals,
      assists: player.assists,
      blocks: player.blocks,
      turnovers: player.turnovers,
    }));
    
    // Update player stats with current game stats (cumulative)
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
      gamePlayerStats: {
        ...state.gamePlayerStats,
        [gameId]: gamePlayerStats,
      },
      players: updatedPlayers,
      currentGame: {
        teamAName: 'Team A',
        teamBName: 'Team B',
        teamAScore: 0,
        teamBScore: 0,
        isActive: false,
      },
      currentGamePlayerStats: state.players
        .filter(player => player.team === 'Team Alpha') // Only include our team players
        .map(player => ({
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
