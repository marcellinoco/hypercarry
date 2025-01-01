import {
  getTournamentById,
  getTournamentParticipants,
} from "@/app/actions/tournament";
import { playerNames } from "@/data/tournament";
import BattleRoyaleSelected from "./components/BattleRoyaleSelected";
import PlayerPicker from "./components/PlayerPicker";
import { TournamentBracket } from "./components/TournamentBracket";

export default async function TournamentSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const dataTournament = await getTournamentById(id);
  const dataParticipants = await getTournamentParticipants(id);
  const format = dataTournament.tournament?.format;
  const participants = dataParticipants.participants;

  return (
    <main className="flex min-h-svh justify-center p-8">
      {format === "Battle Royale" ? (
        <>
          <PlayerPicker participants={participants} />
          <BattleRoyaleSelected />
        </>
      ) : (
        <TournamentBracket players={playerNames} />
      )}
    </main>
  );
}
