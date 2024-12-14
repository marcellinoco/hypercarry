// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITournament {
    struct Match {
        uint256 matchId;
        address[] players;
        uint256[] scores;
        bool isPlayed;
    }

    struct PlayerStats {
        uint256 totalScore;
        uint256 matchesPlayed;
        uint256 averagePosition;
    }

    // Events
    event TournamentCreated(uint256 indexed tournamentId, address indexed organizer);
    event TournamentStarted(uint256 indexed tournamentId, uint256 startTime);
    event TournamentEnded(uint256 indexed tournamentId, uint256 endTime);

    event PlayerRegistered(uint256 indexed tournamentId, address indexed player);
    event MatchResultSubmitted(
        uint256 indexed tournamentId, uint256 indexed matchId, address[] players, uint256[] scores
    );

    event PrizeDistributed(uint256 indexed tournamentId, address indexed player, uint256 position, uint256 amount);
    event PrizeWithdrawn(uint256 indexed tournamentId, address indexed player, uint256 amount);
    event FeeWithdrawn(uint256 indexed tournamentId, address indexed organizer, uint256 amount);

    // Errors
    error InvalidTimestamp();
    error InvalidParticipants();
    error InvalidPrizePool();
    error InvalidFee();

    error TournamentNotStarted();
    error TournamentNotEnded();
    error TournamentAlreadyStarted();
    error TournamentAlreadyEnded();

    error AlreadyRegistered();
    error MaxParticipantsReached();
    error InvalidRegistrationFee();

    error InvalidPlayers();
    error InvalidPlayerCount();
    error PlayerScoreMismatch();
    error MatchAlreadyPlayed();

    error NoFeeToWithdraw();
    error NoPrizeToWithdraw();
    error WithdrawFailed();

    // Functions
    function initialize(
        uint256 _tournamentId,
        address _organizer,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _maxParticipants,
        uint256 _registrationFee,
        uint256 _organizerFee,
        uint256[] memory _prizePoolPercentages
    ) external;

    function startTournament() external;
    function endTournament() external;

    function register() external payable;

    function withdrawPrize() external;
    function withdrawFee() external;
}
