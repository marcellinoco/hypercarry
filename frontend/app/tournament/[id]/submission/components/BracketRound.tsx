import { BracketPairing } from "./BracketPairing";

interface BracketRoundProps {
  players: string[];
  roundIndex: number;
  onWinnersSelected: (winners: string[]) => void;
  activeRound: number;
}

export const BracketRound = ({
  players,
  roundIndex,
  onWinnersSelected,
  activeRound,
}: BracketRoundProps) => {
  const handleWinnerSelected = (pairIndex: number, winner: string) => {
    const newWinners = [...players];
    newWinners[Math.floor(pairIndex / 2) * 2] = winner;
    onWinnersSelected(newWinners.filter((p) => p !== undefined));
  };

  // Calculate spacing between pairings based on round index
  const spacingClass =
    roundIndex === 0
      ? "gap-4"
      : roundIndex === 1
        ? "gap-16"
        : roundIndex === 2
          ? "gap-32"
          : "gap-48";

  return (
    <div className={`flex flex-col ${spacingClass} relative`}>
      {Array.from({ length: Math.ceil(players.length / 2) }, (_, i) => {
        const pair = (
          <BracketPairing
            key={`round-${roundIndex}-pair-${i}`}
            player1={players[i * 2]}
            player2={players[i * 2 + 1]}
            roundIndex={roundIndex}
            pairIndex={i}
            onWinnerSelected={(winner) => handleWinnerSelected(i, winner)}
            isActive={roundIndex === activeRound}
          />
        );

        // Add vertical connector line for non-first rounds
        if (roundIndex > 0 && i % 2 === 0) {
          const prevRoundSpacing =
            roundIndex === 1 ? 16 : roundIndex === 2 ? 32 : 48;
          return (
            <div key={`round-${roundIndex}-pair-${i}`} className="relative">
              {pair}
              <div
                className="absolute left-0 w-px bg-gray-300"
                style={{
                  height: `${prevRoundSpacing * 4}px`,
                  top: "50%",
                  transform: "translateX(-2rem)",
                }}
              />
            </div>
          );
        }

        return pair;
      })}
    </div>
  );
};
