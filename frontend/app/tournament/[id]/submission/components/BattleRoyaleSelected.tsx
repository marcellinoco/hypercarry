"use client";

import { useAtom } from "jotai";
import { Crown, X } from "lucide-react";
import { motion, Reorder } from "motion/react";

import { playersAtom } from "@/app/atoms";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import AnimatedOrdinal from "./AnimatedOrdinal";

interface Player {
  id: string;
  name: string;
}

interface PlayerState {
  selected: Player[];
  unselected: Player[];
}

export default function BattleRoyaleSelected() {
  const [playerState, setPlayerState] = useAtom<PlayerState>(playersAtom);

  const handleUnselectPlayer = (playerId: string, playerName: string): void => {
    setPlayerState((prev) => ({
      unselected: [...prev.unselected, { id: playerId, name: playerName }],
      selected: prev.selected.filter((p) => p.id !== playerId),
    }));
  };

  const handleReorder = (reorderedPlayers: Player[]): void => {
    setPlayerState((prev) => ({
      ...prev,
      selected: reorderedPlayers,
    }));
  };

  return (
    <aside className="flex basis-1/5 flex-col items-center gap-2">
      <Reorder.Group
        axis="y"
        values={playerState.selected}
        onReorder={handleReorder}
        className="flex flex-col items-center gap-2"
      >
        {playerState.selected.map((player, index) => (
          <Reorder.Item
            key={player.id}
            value={player}
            as="div"
            className={cn(
              "group relative flex w-[120px] cursor-grab items-center justify-center rounded-xl border border-transparent bg-slate-700 py-3 shadow-inner-sm shadow-white/20 transition-colors active:cursor-grabbing",
              index === 0 && "border-indigo-700 bg-indigo-500",
              index === 1 && "border-indigo-900 bg-indigo-700",
              index === 2 && "border-indigo-950 bg-indigo-900",
            )}
            layoutId={player.id}
            transition={{
              type: "spring",
              bounce: 0.25,
              duration: 1.2,
            }}
          >
            {index === 0 && (
              <Crown className="opacity-in-[0%] motion-preset-seesaw absolute -top-4 size-6 fill-yellow-500 text-yellow-500 motion-scale-in-[0.5] motion-translate-y-in-[-150%] motion-blur-in-[8px] motion-ease-spring-bouncier" />
            )}
            <motion.button
              onClick={() => handleUnselectPlayer(player.id, player.name)}
              className="absolute -left-3 top-1/2 size-6 !-translate-y-1/2 items-center rounded-full bg-white/15 pt-0.5 text-center text-sm shadow-inner-sm shadow-white/15 backdrop-blur motion-translate-x-in-[-50%] motion-translate-y-in-[0%] motion-blur-in-[8px] motion-duration-700 motion-delay-150 motion-ease-spring-bouncy"
              layout
            >
              <NumberFlow
                value={index + 1}
                continuous={false}
                willChange={true}
                className="transition duration-300 group-hover:opacity-0 group-hover:blur"
              />
              <X className="absolute left-1 top-1/2 size-4 -translate-y-1/2 opacity-0 blur-md transition duration-300 group-hover:opacity-100 group-hover:blur-0" />
            </motion.button>
            {player.name}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <motion.div
        layout
        className="flex h-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-600 px-5"
      >
        Select the <AnimatedOrdinal number={playerState.selected.length + 1} />{" "}
        position
      </motion.div>
    </aside>
  );
}
