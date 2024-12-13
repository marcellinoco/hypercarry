// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Tournament is Initializable, AccessControlUpgradeable {
    // Structs
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

    // Roles
    bytes32 public constant ORGANIZER_ROLE = keccak256("ORGANIZER_ROLE");

    // States
    uint256 public tournamentId;
    address public organizer;

    uint256 public startTime;
    uint256 public endTime;

    uint256 public maxParticipants;
    uint256 public registrationFee;
    uint256 public organizerFee;
    uint256[] public prizePoolPercentages;

    address[] public participants;
    mapping(address => bool) public isParticipant;
    mapping(address => uint256) public prizeBalance;
    uint256 public feeBalance;

    address[] public positions;
    mapping(uint256 => Match) public matches;
    mapping(address => PlayerStats) public playerStats;

    bool public isStarted;
    bool public isEnded;

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

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        uint256 _tournamentId,
        address _organizer,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _maxParticipants,
        uint256 _registrationFee,
        uint256 _organizerFee,
        uint256[] memory _prizePoolPercentages
    ) external initializer {
        __AccessControl_init();

        if (_startTime <= block.timestamp) revert InvalidTimestamp();
        if (_endTime <= _startTime) revert InvalidTimestamp();
        if (_organizerFee > 100) revert InvalidFee();

        if (_maxParticipants == 0) revert InvalidParticipants();
        if (_maxParticipants < _prizePoolPercentages.length) revert InvalidParticipants();

        uint256 totalPrizePercentage;
        for (uint256 i = 0; i < _prizePoolPercentages.length; i++) {
            totalPrizePercentage += _prizePoolPercentages[i];
        }

        if (totalPrizePercentage + _organizerFee != 100) revert InvalidPrizePool();

        tournamentId = _tournamentId;
        organizer = _organizer;

        startTime = _startTime;
        endTime = _endTime;

        maxParticipants = _maxParticipants;
        registrationFee = _registrationFee;

        organizerFee = _organizerFee;
        prizePoolPercentages = _prizePoolPercentages;

        _grantRole(DEFAULT_ADMIN_ROLE, _organizer);
        _grantRole(ORGANIZER_ROLE, _organizer);

        emit TournamentCreated(tournamentId, _organizer);
    }

    function register() external payable virtual {
        if (block.timestamp >= startTime || isStarted || isEnded) revert TournamentAlreadyStarted();

        if (participants.length >= maxParticipants) revert MaxParticipantsReached();
        if (msg.value != registrationFee) revert InvalidRegistrationFee();

        if (isParticipant[msg.sender]) revert AlreadyRegistered();

        participants.push(msg.sender);
        isParticipant[msg.sender] = true;

        emit PlayerRegistered(tournamentId, msg.sender);
    }

    function startTournament() external virtual onlyRole(ORGANIZER_ROLE) {
        if (isStarted) revert TournamentAlreadyStarted();

        isStarted = true;
        emit TournamentStarted(tournamentId, block.timestamp);
    }

    function endTournament() external virtual onlyRole(ORGANIZER_ROLE) {
        if (!isStarted) revert TournamentNotStarted();
        if (isEnded) revert TournamentAlreadyEnded();

        isEnded = true;
        _distributePrizes();

        emit TournamentEnded(tournamentId, block.timestamp);
    }

    function withdrawPrize() external virtual {
        if (!isEnded) revert TournamentNotEnded();

        uint256 amount = prizeBalance[msg.sender];
        if (amount == 0) revert NoPrizeToWithdraw();

        prizeBalance[msg.sender] = 0;
        (bool success,) = msg.sender.call{value: amount}("");

        if (!success) revert WithdrawFailed();
        emit PrizeWithdrawn(tournamentId, msg.sender, amount);
    }

    function withdrawFee() external virtual onlyRole(ORGANIZER_ROLE) {
        if (!isEnded) revert TournamentNotEnded();

        uint256 amount = feeBalance;
        if (amount == 0) revert NoFeeToWithdraw();

        feeBalance = 0;
        (bool success,) = msg.sender.call{value: amount}("");

        if (!success) revert WithdrawFailed();
        emit FeeWithdrawn(tournamentId, organizer, amount);
    }

    function submitMatchResult(uint256 matchId, address[] calldata players, uint256[] calldata scores)
        external
        onlyRole(ORGANIZER_ROLE)
    {
        if (!isStarted) revert TournamentNotStarted();
        if (isEnded) revert TournamentAlreadyEnded();

        if (players.length < 2) revert InvalidPlayerCount();
        if (players.length != scores.length) revert PlayerScoreMismatch();

        for (uint256 i = 0; i < players.length; i++) {
            if (!isParticipant[players[i]]) revert InvalidPlayers();
        }

        if (matches[matchId].isPlayed) revert MatchAlreadyPlayed();

        Match memory newMatch = Match({matchId: matchId, players: players, scores: scores, isPlayed: true});

        matches[matchId] = newMatch;
        _updatePlayerStats(players, scores);

        emit MatchResultSubmitted(tournamentId, matchId, players, scores);
    }

    function _updatePlayerStats(address[] memory players, uint256[] memory scores) internal {
        for (uint256 i = 0; i < players.length; i++) {
            PlayerStats storage stats = playerStats[players[i]];
            stats.totalScore += scores[i];
            stats.matchesPlayed++;

            // Calculate position (1-based index, lower score = better position)
            uint256 position = 1;
            for (uint256 j = 0; j < scores.length; j++) {
                if (scores[j] > scores[i]) {
                    position++;
                }
            }

            stats.averagePosition =
                (stats.averagePosition * (stats.matchesPlayed - 1) + position * 1e18) / stats.matchesPlayed;
        }

        _updatePositions();
    }

    function _updatePositions() internal {
        address[] memory currentParticipants = participants;
        positions = new address[](currentParticipants.length);

        for (uint256 i = 0; i < currentParticipants.length; i++) {
            positions[i] = currentParticipants[i];
        }

        for (uint256 i = 0; i < positions.length; i++) {
            for (uint256 j = i + 1; j < positions.length; j++) {
                if (_shouldSwapPositions(positions[i], positions[j])) {
                    address temp = positions[i];
                    positions[i] = positions[j];
                    positions[j] = temp;
                }
            }
        }
    }

    function _shouldSwapPositions(address a, address b) internal view returns (bool) {
        PlayerStats memory statsA = playerStats[a];
        PlayerStats memory statsB = playerStats[b];

        if (statsA.matchesPlayed == 0) return true;
        if (statsB.matchesPlayed == 0) return false;

        // Higher score is better
        if (statsB.totalScore != statsA.totalScore) {
            return statsB.totalScore > statsA.totalScore;
        }

        // Lower average position is better
        return statsB.averagePosition < statsA.averagePosition;
    }

    function _distributePrizes() internal {
        if (positions.length == 0) {
            _updatePositions();
        }

        uint256 balance = address(this).balance;
        uint256 fee = (balance * organizerFee) / 100;
        uint256 prizePool = balance - fee;

        for (uint256 i = 0; i < prizePoolPercentages.length && i < positions.length; i++) {
            address winner = positions[i];
            uint256 prize = (prizePool * prizePoolPercentages[i]) / 100;

            prizeBalance[winner] = prize;
            emit PrizeDistributed(tournamentId, winner, i + 1, prize);
        }
    }
}
