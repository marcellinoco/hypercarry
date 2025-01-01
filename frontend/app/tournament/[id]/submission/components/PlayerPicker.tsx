"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { LayoutGroup, motion } from "motion/react";

import { playersAtom } from "@/app/atoms";

export default function PlayerPicker({
  participants,
}: {
  participants: string[] | undefined;
}) {
  const [playerState, setPlayerState] = useAtom(playersAtom);

  useEffect(() => {
    if (participants) {
      setPlayerState({
        unselected: participants.map((name, index) => ({
          id: index.toString(),
          name,
        })),
        selected: [],
      });
    }
  }, [participants, setPlayerState]);

  const handleSelectPlayer = (playerId: string, playerName: string) => {
    setPlayerState((prev) => ({
      unselected: prev.unselected.filter((p) => p.id !== playerId),
      selected: [...prev.selected, { id: playerId, name: playerName }],
    }));
  };

  return (
    <aside className="flex basis-1/5 flex-col items-center">
      <LayoutGroup>
        {playerState.unselected.map((player) => (
          <motion.button
            key={player.id}
            className="w-[120px] cursor-pointer rounded-xl py-3 transition-colors hover:bg-slate-800"
            layoutId={player.id}
            transition={{
              type: "spring",
              bounce: 0.25,
              duration: 1.2,
            }}
            onClick={() => handleSelectPlayer(player.id, player.name)}
          >
            {/* <motion.p layout className=""> */}
            {player.name}
            {/* </motion.p> */}
          </motion.button>
        ))}
      </LayoutGroup>
    </aside>
  );
}
