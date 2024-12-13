// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TournamentFactory} from "../src/TournamentFactory.sol";

contract DeployTournamentFactoryScript is Script {
    TournamentFactory public factory;

    function run() public {
        vm.startBroadcast();
        factory = new TournamentFactory(msg.sender);
        vm.stopBroadcast();
    }
}

contract CreateTournamentScript is Script {
    function run() public {
        address factoryAddress = vm.envAddress("FACTORY_ADDRESS");
        TournamentFactory factory = TournamentFactory(factoryAddress);

        address organizer = vm.envAddress("ORGANIZER_ADDRESS");
        uint256 startTime = block.timestamp + 1 days;
        uint256 endTime = startTime + 7 days;

        uint256 maxParticipants = 4;
        uint256 registrationFee = 0.0001 ether;
        uint256 organizerFee = 10;

        uint256[] memory prizePoolPercentages = new uint256[](3);
        prizePoolPercentages[0] = 40;
        prizePoolPercentages[1] = 30;
        prizePoolPercentages[2] = 20;

        // Get the ABI-encoded constructor arguments
        bytes memory constructorArgs = abi.encode(
            organizer,
            startTime,
            endTime,
            maxParticipants,
            registrationFee,
            organizerFee,
            prizePoolPercentages
        );

        vm.startBroadcast();
        address tournamentAddress = factory.createTournament(
            organizer,
            startTime,
            endTime,
            maxParticipants,
            registrationFee,
            organizerFee,
            prizePoolPercentages
        );
        vm.stopBroadcast();

        console.log("Tournament Address:", tournamentAddress);
        console.log("Constructor Arguments:", vm.toString(constructorArgs));
    }
}
