export interface CreateTournamentSpec {
  startTime: string;
  endTime: string;
  maxParticipants: string;
  registrationFee: string;
  organizerFee: string;
  prizePoolPercentages: string;
}

export interface RegisterPlayerSpec {
  tournamentId: string;
  playerId: string;
}
