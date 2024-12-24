// data/landing.ts

export type Tournament = {
  id: string;
  title: string;
  game: string;
  gameImage: string; // URL for game logo
  prizePool: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed";
  registeredTeams: number;
  maxTeams: number;
  format: string;
  region: string;
  organizer: {
    name: string;
    verified: boolean;
  };
  featured: boolean;
  entryFee: number;
  platforms: string[];
};

export const featuredTournaments: Tournament[] = [
  {
    id: "val-champions-2024",
    title: "VALORANT Champions Tour 2024",
    game: "VALORANT",
    gameImage: "/games/valorant.png",
    prizePool: 1000000,
    startDate: "2024-02-15",
    endDate: "2024-03-03",
    status: "ongoing",
    registeredTeams: 16,
    maxTeams: 16,
    format: "Double Elimination",
    region: "Global",
    organizer: {
      name: "Riot Games",
      verified: true,
    },
    featured: true,
    entryFee: 0,
    platforms: ["PC"],
  },
  {
    id: "csgo-blast-premier",
    title: "BLAST Premier: Spring Finals 2024",
    game: "Counter-Strike 2",
    gameImage: "/games/cs2.png",
    prizePool: 425000,
    startDate: "2024-06-12",
    endDate: "2024-06-18",
    status: "upcoming",
    registeredTeams: 8,
    maxTeams: 8,
    format: "Double Elimination",
    region: "Europe",
    organizer: {
      name: "BLAST",
      verified: true,
    },
    featured: true,
    entryFee: 0,
    platforms: ["PC"],
  },
];

export const upcomingTournaments: Tournament[] = [
  {
    id: "dota2-esl-one",
    title: "ESL One Birmingham 2024",
    game: "Dota 2",
    gameImage: "/games/dota2.png",
    prizePool: 500000,
    startDate: "2024-04-22",
    endDate: "2024-04-28",
    status: "upcoming",
    registeredTeams: 12,
    maxTeams: 12,
    format: "Group Stage + Playoffs",
    region: "Europe",
    organizer: {
      name: "ESL Gaming",
      verified: true,
    },
    featured: false,
    entryFee: 0,
    platforms: ["PC"],
  },
  {
    id: "rl-rlcs-spring",
    title: "RLCS 2024 Spring Split",
    game: "Rocket League",
    gameImage: "/games/rocket-league.png",
    prizePool: 300000,
    startDate: "2024-04-05",
    endDate: "2024-05-19",
    status: "upcoming",
    registeredTeams: 24,
    maxTeams: 24,
    format: "Swiss System",
    region: "North America",
    organizer: {
      name: "Psyonix",
      verified: true,
    },
    featured: false,
    entryFee: 0,
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
  },
  {
    id: "cod-cdl-major",
    title: "Call of Duty League Major 4",
    game: "Call of Duty: Modern Warfare III",
    gameImage: "/games/cod-mw3.png",
    prizePool: 500000,
    startDate: "2024-05-16",
    endDate: "2024-05-19",
    status: "upcoming",
    registeredTeams: 12,
    maxTeams: 12,
    format: "Double Elimination",
    region: "North America",
    organizer: {
      name: "Activision",
      verified: true,
    },
    featured: false,
    entryFee: 0,
    platforms: ["PC", "PlayStation", "Xbox"],
  },
];

export const communityTournaments: Tournament[] = [
  {
    id: "apex-community-cup",
    title: "Apex Community Cup Spring 2024",
    game: "Apex Legends",
    gameImage: "/games/apex-legends.png",
    prizePool: 5000,
    startDate: "2024-04-13",
    endDate: "2024-04-14",
    status: "upcoming",
    registeredTeams: 45,
    maxTeams: 60,
    format: "Battle Royale Points System",
    region: "Europe",
    organizer: {
      name: "ApexCommunity",
      verified: false,
    },
    featured: false,
    entryFee: 10,
    platforms: ["PC", "PlayStation", "Xbox"],
  },
  {
    id: "fortnite-cash-cup",
    title: "Fortnite Weekend Cash Cup",
    game: "Fortnite",
    gameImage: "/games/fortnite.png",
    prizePool: 7500,
    startDate: "2024-03-23",
    endDate: "2024-03-24",
    status: "upcoming",
    registeredTeams: 82,
    maxTeams: 100,
    format: "Battle Royale Points System",
    region: "Global",
    organizer: {
      name: "Epic Games",
      verified: true,
    },
    featured: false,
    entryFee: 0,
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
  },
  {
    id: "lol-amateur-league",
    title: "Amateur League Spring Split",
    game: "League of Legends",
    gameImage: "/games/league-of-legends.png",
    prizePool: 2000,
    startDate: "2024-03-30",
    endDate: "2024-05-15",
    status: "upcoming",
    registeredTeams: 28,
    maxTeams: 32,
    format: "Round Robin + Playoffs",
    region: "North America",
    organizer: {
      name: "Amateur Esports League",
      verified: false,
    },
    featured: false,
    entryFee: 25,
    platforms: ["PC"],
  },
];

// Helper function to get all tournaments
export const getAllTournaments = () => {
  return [
    ...featuredTournaments,
    ...upcomingTournaments,
    ...communityTournaments,
  ];
};

// Helper function to get tournament by ID
export const getTournamentById = (id: string) => {
  return getAllTournaments().find((tournament) => tournament.id === id);
};
