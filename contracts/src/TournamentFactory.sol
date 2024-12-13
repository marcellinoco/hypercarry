// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Tournament.sol";

contract TournamentFactory is Ownable {
    using Clones for address;

    address public immutable implementation;

    uint256 private tournamentsCount;
    address[] public tournaments;

    event TournamentCreated(address indexed tournamentAddress, uint256 indexed tournamentId, address indexed organizer);

    constructor(address initialOwner) Ownable(initialOwner) {
        implementation = address(new Tournament());
    }

    function createTournament(
        address organizer,
        uint256 startTime,
        uint256 endTime,
        uint256 maxParticipants,
        uint256 registrationFee,
        uint256 organizerFee,
        uint256[] memory prizePoolPercentages
    ) external onlyOwner returns (address) {
        address clone = implementation.clone();

        ++tournamentsCount;
        uint256 tournamentId = tournamentsCount;

        Tournament(clone).initialize(
            tournamentId,
            organizer,
            startTime,
            endTime,
            maxParticipants,
            registrationFee,
            organizerFee,
            prizePoolPercentages
        );

        tournaments.push(clone);

        emit TournamentCreated(clone, tournamentId, organizer);
        return clone;
    }
}
