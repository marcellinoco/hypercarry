import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type WalletAddress = string;
type GameId = string;
type TeamId = string;

type UserProfile = {
  walletAddress?: WalletAddress;
  username?: string;
  name?: string;
  profilePicture?: string;
  preferredGames?: GameId[];
  skillLevels?: Record<GameId, number>;
  teams?: TeamId[];
  eloRating?: number;
};

type MatchResult = "win" | "loss" | "pending";

type Match = {
  matchId: string;
  opponent: WalletAddress;
  result: MatchResult;
  timestamp: number;
};

type TournamentParticipation = {
  tournamentId: string;
  position?: number;
  matchResults?: Match[];
};

type UserState = {
  profile: UserProfile;
  isAuthenticated: boolean;
  tournaments: TournamentParticipation[];
  nftRewards?: string[];
  lastUpdated?: number;
};

// Default state matching your requirements
const defaultUserState: UserState = {
  profile: {},
  isAuthenticated: false,
  tournaments: [],
};

// Persist user state in localStorage
export const userAtom = atomWithStorage<UserState>("user", defaultUserState);

// Derived atoms for specific pieces of user state
export const walletAddressAtom = atom(
  (get) => get(userAtom).profile.walletAddress,
  (get, set, newAddress: string) => {
    const currentUser = get(userAtom);
    set(userAtom, {
      ...currentUser,
      profile: {
        ...currentUser.profile,
        walletAddress: newAddress,
      },
      isAuthenticated: true,
      lastUpdated: Date.now(),
    });
  },
);

// Tournament participation atom
export const userTournamentsAtom = atom(
  (get) => get(userAtom).tournaments,
  (get, set, newTournament: TournamentParticipation) => {
    const currentUser = get(userAtom);
    set(userAtom, {
      ...currentUser,
      tournaments: [...currentUser.tournaments, newTournament],
      lastUpdated: Date.now(),
    });
  },
);

// ELO rating atom with update handler
export const eloRatingAtom = atom(
  (get) => get(userAtom).profile.eloRating,
  (get, set, newRating: number) => {
    const currentUser = get(userAtom);
    set(userAtom, {
      ...currentUser,
      profile: {
        ...currentUser.profile,
        eloRating: newRating,
      },
      lastUpdated: Date.now(),
    });
  },
);

// Reset user state
export const resetUserAtom = atom(null, (get, set) => {
  set(userAtom, defaultUserState);
});

export const playersAtom = atom<{
  unselected: { id: string; name: string }[];
  selected: { id: string; name: string }[];
}>({
  unselected: [],
  selected: [],
});

export const selectedBattleRoyalePlayersAtom = atom<{
  unselected: { id: string; name: string }[];
  selected: { id: string; name: string }[];
}>({
  unselected: [],
  selected: [],
});

