"use client";

import { useState } from "react";

import { Address, formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

import {
  useReadTournamentEndTime,
  useReadTournamentFactoryTournaments,
  useReadTournamentFactoryTournamentsCount,
  useReadTournamentMaxParticipants,
  useReadTournamentOrganizerFee,
  useReadTournamentParticipants,
  useReadTournamentRegistrationFee,
  useReadTournamentStartTime,
  useWriteTournamentEndTournament,
  useWriteTournamentFactoryCreateTournament,
  useWriteTournamentRegister,
  useWriteTournamentStartTournament,
  useWriteTournamentSubmitMatchResult,
  useWriteTournamentWithdrawPrize,
} from "@/contracts";

function CreateTournamentForm() {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    maxParticipants: "",
    registrationFee: "",
    organizerFee: "",
    prizePoolPercentages: "",
  });

  const { address } = useAccount();
  const { writeContract } = useWriteTournamentFactoryCreateTournament();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !writeContract) return;

    const endTimeUnix = Math.floor(new Date(formData.endTime).getTime() / 1000);
    const startTimeUnix = Math.floor(
      new Date(formData.startTime).getTime() / 1000,
    );

    writeContract({
      address: process.env.NEXT_PUBLIC_TOURNAMENT_FACTORY_ADDRESS as Address,
      args: [
        address,
        BigInt(startTimeUnix),
        BigInt(endTimeUnix),
        BigInt(formData.maxParticipants),
        parseEther(formData.registrationFee),
        BigInt(formData.organizerFee),
        formData.prizePoolPercentages.split(",").map((x) => BigInt(x.trim())),
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create Tournament</h2>
      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={formData.startTime}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, startTime: e.target.value }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={formData.endTime}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, endTime: e.target.value }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>Max Participants</label>
        <input
          type="number"
          value={formData.maxParticipants}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              maxParticipants: e.target.value,
            }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>Registration Fee (ETH)</label>
        <input
          type="text"
          value={formData.registrationFee}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              registrationFee: e.target.value,
            }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>Organizer Fee (%)</label>
        <input
          type="number"
          value={formData.organizerFee}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, organizerFee: e.target.value }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>Prize Pool Percentages (comma-separated)</label>
        <input
          type="text"
          value={formData.prizePoolPercentages}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              prizePoolPercentages: e.target.value,
            }))
          }
          className="block w-full border p-2"
          placeholder="50,30,20"
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Create Tournament
      </button>
    </form>
  );
}

function TournamentList() {
  const { data: count } = useReadTournamentFactoryTournamentsCount({
    address: process.env.NEXT_PUBLIC_TOURNAMENT_FACTORY_ADDRESS as Address,
  });

  const indices = Array.from({ length: Number(count || 0) }, (_, i) => i);
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">
        Tournaments ({count?.toString() || 0})
      </h2>
      <ul className="mt-4 space-y-2">
        {indices.map((index) => (
          <li key={index} className="rounded border p-4">
            <TournamentActions index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ParticipantItem({
  tournamentAddress,
  index,
}: {
  tournamentAddress: Address;
  index: number;
}) {
  const { data: participant } = useReadTournamentParticipants({
    address: tournamentAddress,
    args: [BigInt(index)],
  });

  if (
    !participant ||
    participant === "0x0000000000000000000000000000000000000000"
  ) {
    return null;
  }

  return <li className="text-sm">{participant}</li>;
}

function TournamentActions({ index }: { index: number }) {
  const { data: tournamentAddress } = useReadTournamentFactoryTournaments({
    address: process.env.NEXT_PUBLIC_TOURNAMENT_FACTORY_ADDRESS as Address,
    args: [BigInt(index)],
  });

  const { data: startTime } = useReadTournamentStartTime({
    address: tournamentAddress,
  });
  const { data: endTime } = useReadTournamentEndTime({
    address: tournamentAddress,
  });
  const { data: registrationFee } = useReadTournamentRegistrationFee({
    address: tournamentAddress,
  });
  const { data: organizerFee } = useReadTournamentOrganizerFee({
    address: tournamentAddress,
  });
  const { data: maxParticipants } = useReadTournamentMaxParticipants({
    address: tournamentAddress,
  });

  const { writeContract: register } = useWriteTournamentRegister();
  const { writeContract: startTournament } =
    useWriteTournamentStartTournament();
  const { writeContract: submitResult } = useWriteTournamentSubmitMatchResult();
  const { writeContract: endTournament } = useWriteTournamentEndTournament();
  const { writeContract: withdrawPrize } = useWriteTournamentWithdrawPrize();

  const [matchData, setMatchData] = useState({
    matchId: "",
    players: "",
    scores: "",
  });

  const handleSubmitMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitResult || !tournamentAddress) return;

    const players = matchData.players
      .split(",")
      .map((p) => p.trim()) as `0x${string}`[];
    const scores = matchData.scores.split(",").map((s) => BigInt(s.trim()));

    submitResult({
      address: tournamentAddress,
      args: [BigInt(matchData.matchId), players, scores],
    });
  };

  const participantIndices = maxParticipants
    ? Array.from({ length: Number(maxParticipants) }, (_, i) => i)
    : [];

  if (!tournamentAddress) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p>Tournament Address: {tournamentAddress}</p>
        <p>
          Start Time:{" "}
          {startTime
            ? new Date(Number(startTime) * 1000).toLocaleString()
            : "Loading..."}
        </p>
        <p>
          End Time:{" "}
          {endTime
            ? new Date(Number(endTime) * 1000).toLocaleString()
            : "Loading..."}
        </p>
        <p>
          Registration Fee:{" "}
          {registrationFee
            ? formatEther(registrationFee) + " ETH"
            : "Loading..."}
        </p>
        <p>
          Organizer Fee:{" "}
          {organizerFee ? Number(organizerFee) + "%" : "Loading..."}
        </p>
        <p>
          Max Participants:{" "}
          {maxParticipants ? Number(maxParticipants) : "Loading..."}
        </p>

        <div>
          <h3 className="mt-4 font-bold">Participants</h3>
          <ul className="mt-2 list-disc pl-5">
            {participantIndices.map((i) => (
              <ParticipantItem
                key={i}
                tournamentAddress={tournamentAddress}
                index={i}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="space-x-2">
        <button
          onClick={() =>
            register?.({
              address: tournamentAddress,
              value: registrationFee,
              args: [],
            })
          }
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Register
        </button>

        <button
          onClick={() =>
            startTournament?.({ address: tournamentAddress, args: [] })
          }
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Start Tournament
        </button>

        <button
          onClick={() =>
            endTournament?.({ address: tournamentAddress, args: [] })
          }
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          End Tournament
        </button>

        <button
          onClick={() =>
            withdrawPrize?.({ address: tournamentAddress, args: [] })
          }
          className="rounded bg-purple-500 px-4 py-2 text-white"
        >
          Withdraw Prize
        </button>
      </div>

      <form onSubmit={handleSubmitMatch} className="space-y-2">
        <h3 className="font-bold">Submit Match Result</h3>
        <div>
          <label>Match ID</label>
          <input
            type="number"
            value={matchData.matchId}
            onChange={(e) =>
              setMatchData((prev) => ({ ...prev, matchId: e.target.value }))
            }
            className="block w-full border p-2"
          />
        </div>
        <div>
          <label>Players (comma-separated addresses)</label>
          <input
            type="text"
            value={matchData.players}
            onChange={(e) =>
              setMatchData((prev) => ({ ...prev, players: e.target.value }))
            }
            className="block w-full border p-2"
          />
        </div>
        <div>
          <label>Scores (comma-separated)</label>
          <input
            type="text"
            value={matchData.scores}
            onChange={(e) =>
              setMatchData((prev) => ({ ...prev, scores: e.target.value }))
            }
            className="block w-full border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-yellow-500 px-4 py-2 text-white"
        >
          Submit Result
        </button>
      </form>
    </div>
  );
}

export default function DevPage() {
  const { address } = useAccount();

  if (!address) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-8 text-2xl font-bold">Tournament Dev Page</h1>
      <CreateTournamentForm />
      <TournamentList />
    </main>
  );
}
