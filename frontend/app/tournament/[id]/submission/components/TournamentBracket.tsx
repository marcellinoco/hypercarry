"use client";

import { useState } from "react";

import { BracketRound } from "./BracketRound";

interface TournamentBracketProps {
  players: { [key: string]: string };
}

export const TournamentBracket = ({ players }: TournamentBracketProps) => {
  const [rounds, setRounds] = useState(() => {
    const initialPlayers = Object.values(players);
    const allRounds: string[][] = [initialPlayers];

    let currentRound = initialPlayers;
    while (currentRound.length > 1) {
      const nextRound = Array(Math.ceil(currentRound.length / 2)).fill("");
      allRounds.push(nextRound);
      currentRound = nextRound;
    }

    return allRounds;
  });

  const [activeRound, setActiveRound] = useState(0);

  const handleWinnersSelected = (roundIndex: number, winners: string[]) => {
    const newRounds = [...rounds];
    newRounds[roundIndex + 1] = winners;
    setRounds(newRounds);

    if (winners.length === 1) {
      // Tournament complete!
      console.log(`Winner: ${winners[0]}`);
    } else {
      setActiveRound(roundIndex + 1);
    }
  };

  return (
    <div className="flex min-w-max gap-24 p-8">
      {rounds.map((roundPlayers, index) => (
        <div key={`round-${index}`}>
          <h2 className="mb-8 text-center font-semibold">
            {index === rounds.length - 1
              ? "Winner"
              : index === rounds.length - 2
                ? "Finals"
                : index === rounds.length - 3
                  ? "Semi-Finals"
                  : `Round ${index + 1}`}
          </h2>
          <BracketRound
            players={roundPlayers}
            roundIndex={index}
            onWinnersSelected={(winners) =>
              handleWinnersSelected(index, winners)
            }
            activeRound={activeRound}
          />
        </div>
      ))}
    </div>
  );
};
