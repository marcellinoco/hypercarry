"use client";

import { useState } from "react";

import { v4 as uuid } from "uuid";
import { Address, parseEther } from "viem";
import { useAccount } from "wagmi";

import { useWriteTournamentFactoryCreateTournament } from "@/contracts";
import { CreateTournamentSpec } from "@/contracts/tournament";
import { Tournament } from "@/db/types";
import { oppCode } from "@/libs/constant";
import { uploadFileTournament } from "../actions/file";
import { createTournament } from "../actions/tournament";
import { getUser } from "../actions/user";

const TournamentForm = () => {
  const [formData, setFormData] = useState<CreateTournamentSpec>({
    startTime: "",
    endTime: "",
    maxParticipants: "",
    registrationFee: "",
    organizerFee: "",
    prizePoolPercentages: "",
    format: "",
    game: "",
    tournamentImage: null,
    prizePool: "",
    region: "",
    title: "",
  });

  const { address } = useAccount();
  const { writeContract } = useWriteTournamentFactoryCreateTournament();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("masuk kan ya");
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

    const user = await getUser(address);

    if (user.code === oppCode.SUCCESS && user.user) {
      const tournamentImageId = uuid();
      const tournament: Tournament = {
        id: uuid(),
        authorId: user.user.id,
        startTimeUnix: startTimeUnix,
        endTimeUnix: endTimeUnix,
        maxParticipants: Number(formData.maxParticipants),
        prizePoolPercentages: Number(formData.prizePoolPercentages),
        organizerFee: Number(formData.organizerFee),
        registrationFee: Number(formData.registrationFee),
        createdAt: new Date(),
        updatedAt: new Date(),
        registeredPlayers: undefined,
        format: "Battle Royale",
        game: formData.game,
        tournamentImageId: formData.tournamentImage ? tournamentImageId : null,
        prizePool: Number(formData.prizePool),
        region: formData.region,
        title: formData.title,
      };

      const fileTournamentForm = new FormData();
      if (formData.tournamentImage) {
        fileTournamentForm.append(
          "tournamentPicture",
          formData.tournamentImage,
        );
        fileTournamentForm.append("tournamentPictureId", tournamentImageId);
        await uploadFileTournament(fileTournamentForm);
      }

      const response = await createTournament(tournament);
      console.log(response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-[50rem] space-y-4">
      <h2 className="text-center text-xl font-bold">Create Tournament</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="block w-full border p-2"
          />
        </div>
        <div>
          <label>Game</label>
          <input
            type="text"
            value={formData.game}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, game: e.target.value }))
            }
            className="block w-full border p-2"
          />
        </div>
      </div>
      <div>
        <label>Tournament Image</label>
        <input
          type="file"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tournamentImage: e.target.files![0],
            }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>Prize Pool</label>
        <input
          type="number"
          value={formData.prizePool}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              prizePool: e.target.value,
            }))
          }
          className="block w-full border p-2"
        />
      </div>
      <div>
        <label>Region</label>
        <input
          type="text"
          value={formData.region}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              region: e.target.value,
            }))
          }
          className="block w-full border p-2"
        />
      </div>
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
};

TournamentForm.displayName = "TournamentForm";

export { TournamentForm };
