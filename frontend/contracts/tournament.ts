export interface CreateTournamentSpec {
  startTime: string;
  endTime: string;
  maxParticipants: string;
  registrationFee: string;
  organizerFee: string;
  prizePoolPercentages: string;
  title: string;
  game: string;
  tournamentImage: File | null;
  format: string;
  region: string;
  prizePool: string;
}

export interface RegisterPlayerSpec {
  tournamentId: string;
  playerId: string;
}
