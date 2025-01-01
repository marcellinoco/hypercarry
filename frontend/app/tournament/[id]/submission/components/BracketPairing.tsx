import { motion } from "motion/react";

interface BracketPairingProps {
  player1: string;
  player2: string;
  roundIndex: number;
  pairIndex: number;
  onWinnerSelected: (winner: string) => void;
  isActive: boolean;
}

export const BracketPairing = ({
  player1,
  player2,
  roundIndex,
  pairIndex,
  onWinnerSelected,
  isActive,
}: BracketPairingProps) => {
  if (!player1 || !player2) return null;

  return (
    <div className="relative">
      <div className="flex flex-col rounded border bg-white p-2">
        <motion.button
          layoutId={`player-${player1}`}
          onClick={() => isActive && onWinnerSelected(player1)}
          className={`border-b px-4 py-2 text-left ${
            isActive
              ? "cursor-pointer hover:bg-blue-100"
              : "cursor-not-allowed opacity-70"
          }`}
          animate={{ opacity: isActive ? 1 : 0.7 }}
        >
          {player1}
        </motion.button>
        <motion.button
          layoutId={`player-${player2}`}
          onClick={() => isActive && onWinnerSelected(player2)}
          className={`px-4 py-2 text-left ${
            isActive
              ? "cursor-pointer hover:bg-blue-100"
              : "cursor-not-allowed opacity-70"
          }`}
          animate={{ opacity: isActive ? 1 : 0.7 }}
        >
          {player2}
        </motion.button>
      </div>
      {/* Connector lines */}
      <div className="absolute -right-8 top-1/2 h-px w-8 -translate-y-1/2 bg-gray-300" />
      {roundIndex > 0 && (
        <div className="absolute -left-8 top-1/2 h-px w-8 -translate-y-1/2 bg-gray-300" />
      )}
    </div>
  );
};
