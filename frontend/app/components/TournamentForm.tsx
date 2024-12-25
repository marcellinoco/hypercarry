"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Address, parseEther } from "viem";
import { opBNBTestnet } from "viem/chains";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

import {
  useSimulateTournamentFactoryCreateTournament,
  useWriteTournamentFactoryCreateTournament,
} from "@/contracts";
import { CreateTournamentSpec } from "@/contracts/tournament";
import { Tournament } from "@/db/types";
import { oppCode } from "@/libs/constant";
import { uploadFileTournament } from "../actions/file";
import { createTournament } from "../actions/tournament";
import { getUser } from "../actions/user";

const TournamentForm = () => {
  const [formData, setFormData] = useState<CreateTournamentSpec>({
    startTime: "2024-12-25T20:00:00",
    endTime: "2024-12-25T20:30:00",
    maxParticipants: "10",
    registrationFee: "1000000000000000",
    organizerFee: "5",
    prizePoolPercentages: "50,30,15",
    format: "Battle Royale",
    game: "Fortnite",
    tournamentImage: null,
    prizePool: "10000000000000000",
    region: "Indonesia",
    title: "Wow Cup",
  });

  const { address } = useAccount();

  const endTimeUnix = Math.floor(new Date(formData.endTime).getTime() / 1000);
  const startTimeUnix = Math.floor(
    new Date(formData.startTime).getTime() / 1000,
  );

  const { data: simulateData } = useSimulateTournamentFactoryCreateTournament({
    chainId: opBNBTestnet.id,
    address: process.env.NEXT_PUBLIC_TOURNAMENT_FACTORY_ADDRESS as Address,
    args: [
      address ?? "0x",
      BigInt(startTimeUnix || 0),
      BigInt(endTimeUnix || 0),
      BigInt(formData.maxParticipants),
      parseEther(formData.registrationFee),
      BigInt(formData.organizerFee),
      formData.prizePoolPercentages.split(",").map((x) => BigInt(x.trim())),
    ],
  });

  const { data: hash, writeContractAsync } =
    useWriteTournamentFactoryCreateTournament();

  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!simulateData?.request || !writeContractAsync) return;
    await writeContractAsync(simulateData.request);
  };

  console.log(!address || !simulateData?.request || !writeContractAsync);
  console.log(!address);
  console.log(!simulateData?.request);
  console.log(!writeContractAsync);

  useEffect(() => {
    if (!isSuccess) return;

    // (async () => {
    //   const user = await getUser(address ?? "");
    //   if (user.code === oppCode.SUCCESS && user.user) {
    //     const tournamentImageId = uuid();
    //     const tournament: Tournament = {
    //       id: uuid(),
    //       authorId: user.user.id,
    //       startTimeUnix: startTimeUnix,
    //       endTimeUnix: endTimeUnix,
    //       maxParticipants: Number(formData.maxParticipants),
    //       prizePoolPercentages: Number(formData.prizePoolPercentages),
    //       organizerFee: Number(formData.organizerFee),
    //       registrationFee: Number(formData.registrationFee),
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       registeredPlayers: undefined,
    //       format: "Battle Royale",
    //       game: formData.game,
    //       tournamentImageId: formData.tournamentImage
    //         ? tournamentImageId
    //         : null,
    //       prizePool: Number(formData.prizePool),
    //       region: formData.region,
    //       title: formData.title,
    //     };

    //     const fileTournamentForm = new FormData();
    //     if (formData.tournamentImage) {
    //       fileTournamentForm.append(
    //         "tournamentPicture",
    //         formData.tournamentImage,
    //       );
    //       fileTournamentForm.append("tournamentPictureId", tournamentImageId);
    //       await uploadFileTournament(fileTournamentForm);
    //     }

    //     const response = await createTournament(tournament);
    //     if (response.code === oppCode.SUCCESS) {
    //       toast("Tournament has successfully created");
    //       return;
    //     }
    //   }
    //   toast("Create tournament failed");
    // })();
  }, [isSuccess]);

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
        disabled={!address || !simulateData?.request || !writeContractAsync}
      >
        Create Tournament
      </button>
    </form>
  );
};

TournamentForm.displayName = "TournamentForm";

export { TournamentForm };
