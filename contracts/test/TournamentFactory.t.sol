// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {TournamentFactory} from "../src/TournamentFactory.sol";
import {Tournament} from "../src/Tournament.sol";

contract TournamentFactoryTest is Test {
    TournamentFactory public factory;
    address public owner;
    address public organizer;
    address public player1;
    address public player2;
    address public player3;
    address public player4;

    uint256 public startTime;
    uint256 public endTime;
    uint256 public maxParticipants;
    uint256 public registrationFee;
    uint256 public organizerFee;
    uint256[] public prizePoolPercentages;

    function setUp() public {
        owner = address(this);
        organizer = makeAddr("organizer");
        player1 = makeAddr("player1");
        player2 = makeAddr("player2");
        player3 = makeAddr("player3");
        player4 = makeAddr("player4");

        // Initialize tournament parameters
        startTime = block.timestamp + 1 hours;
        endTime = startTime + 1 days;
        maxParticipants = 4;
        registrationFee = 0.1 ether;
        organizerFee = 10; // 10%

        // Prize pool: 1st: 50%, 2nd: 25%, 3rd: 15% (total 90% + 10% organizer fee = 100%)
        prizePoolPercentages = new uint256[](3);
        prizePoolPercentages[0] = 50;
        prizePoolPercentages[1] = 25;
        prizePoolPercentages[2] = 15;

        factory = new TournamentFactory(owner);

        // Fund players
        vm.deal(player1, 1 ether);
        vm.deal(player2, 1 ether);
        vm.deal(player3, 1 ether);
        vm.deal(player4, 1 ether);
    }

    function test_CreateTournament() public {
        address tournamentAddr = factory.createTournament(
            organizer, startTime, endTime, maxParticipants, registrationFee, organizerFee, prizePoolPercentages
        );

        assertTrue(tournamentAddr != address(0));
        Tournament tournament = Tournament(tournamentAddr);

        assertEq(tournament.organizer(), organizer);
        assertEq(tournament.startTime(), startTime);
        assertEq(tournament.maxParticipants(), maxParticipants);
        assertEq(tournament.registrationFee(), registrationFee);
    }

    function testFail_CreateTournamentNotOwner() public {
        vm.prank(address(0xdead));
        factory.createTournament(
            organizer, startTime, endTime, maxParticipants, registrationFee, organizerFee, prizePoolPercentages
        );
    }

    function test_HeadToHeadTournament() public {
        // Create tournament with 2-player prize pool
        uint256[] memory twoPlayerPrizes = new uint256[](2);
        twoPlayerPrizes[0] = 70; // Winner gets 70%
        twoPlayerPrizes[1] = 20; // Runner-up gets 20%
        // Total 90% + 10% organizer fee = 100%

        address tournamentAddr = factory.createTournament(
            organizer,
            startTime,
            endTime,
            2, // max 2 participants for head-to-head
            registrationFee,
            organizerFee,
            twoPlayerPrizes
        );
        Tournament tournament = Tournament(tournamentAddr);

        // Register players
        vm.prank(player1);
        tournament.register{value: registrationFee}();

        vm.prank(player2);
        tournament.register{value: registrationFee}();

        // Start tournament
        vm.prank(organizer);
        tournament.startTournament();

        // Submit match result
        address[] memory players = new address[](2);
        players[0] = player1;
        players[1] = player2;

        uint256[] memory scores = new uint256[](2);
        scores[0] = 10; // player1 wins
        scores[1] = 5; // player2 loses

        vm.prank(organizer);
        tournament.submitMatchResult(1, players, scores);

        // End tournament and distribute prizes
        vm.prank(organizer);
        tournament.endTournament();

        // Verify winner
        assertEq(tournament.positions(0), player1);
        assertEq(tournament.positions(1), player2);
    }

    function test_FreeForAllTournament() public {
        // Create tournament
        address tournamentAddr = factory.createTournament(
            organizer, startTime, endTime, maxParticipants, registrationFee, organizerFee, prizePoolPercentages
        );
        Tournament tournament = Tournament(tournamentAddr);

        // Register all players
        vm.prank(player1);
        tournament.register{value: registrationFee}();

        vm.prank(player2);
        tournament.register{value: registrationFee}();

        vm.prank(player3);
        tournament.register{value: registrationFee}();

        vm.prank(player4);
        tournament.register{value: registrationFee}();

        // Start tournament
        vm.prank(organizer);
        tournament.startTournament();

        // Submit multiple match results
        address[] memory players = new address[](4);
        players[0] = player1;
        players[1] = player2;
        players[2] = player3;
        players[3] = player4;

        uint256[] memory scores = new uint256[](4);
        scores[0] = 100; // player1 highest score
        scores[1] = 75; // player2 second
        scores[2] = 50; // player3 third
        scores[3] = 25; // player4 last

        vm.prank(organizer);
        tournament.submitMatchResult(1, players, scores);

        // End tournament
        vm.prank(organizer);
        tournament.endTournament();

        // Verify final positions
        assertEq(tournament.positions(0), player1);
        assertEq(tournament.positions(1), player2);
        assertEq(tournament.positions(2), player3);
        assertEq(tournament.positions(3), player4);

        // Test prize withdrawal
        uint256 totalPrizePool = 4 * registrationFee; // 0.4 ether
        uint256 expectedFirstPrize = (totalPrizePool * 50) / 100; // 50% of prize pool
        uint256 organizerAmount = (totalPrizePool * organizerFee) / 100; // 10% of total
        expectedFirstPrize = totalPrizePool - organizerAmount; // Adjust for organizer fee
        expectedFirstPrize = (expectedFirstPrize * 50) / 100; // Take 50% of remaining prize pool

        uint256 player1BalanceBefore = player1.balance;
        
        vm.prank(player1);
        tournament.withdrawPrize();
        
        assertEq(player1.balance - player1BalanceBefore, expectedFirstPrize);
    }

    function testFail_RegisterAfterStart() public {
        address tournamentAddr = factory.createTournament(
            organizer, startTime, endTime, maxParticipants, registrationFee, organizerFee, prizePoolPercentages
        );
        Tournament tournament = Tournament(tournamentAddr);

        // Start tournament
        vm.prank(organizer);
        tournament.startTournament();

        // Try to register after start (should fail)
        vm.prank(player1);
        tournament.register{value: registrationFee}();
    }

    function testFail_InvalidMatchResult() public {
        address tournamentAddr = factory.createTournament(
            organizer, startTime, endTime, maxParticipants, registrationFee, organizerFee, prizePoolPercentages
        );
        Tournament tournament = Tournament(tournamentAddr);

        // Register players
        vm.prank(player1);
        tournament.register{value: registrationFee}();

        vm.prank(player2);
        tournament.register{value: registrationFee}();

        // Start tournament
        vm.prank(organizer);
        tournament.startTournament();

        // Try to submit invalid match result (scores array length mismatch)
        address[] memory players = new address[](2);
        players[0] = player1;
        players[1] = player2;

        uint256[] memory scores = new uint256[](1); // Only one score for two players
        scores[0] = 10;

        vm.prank(organizer);
        tournament.submitMatchResult(1, players, scores);
    }
}
