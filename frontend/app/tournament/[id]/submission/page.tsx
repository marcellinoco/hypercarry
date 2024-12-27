import { playerNames } from "@/data/tournament";
import BattleRoyaleSelected from "./components/BattleRoyaleSelected";
import PlayerPicker from "./components/PlayerPicker";

export default async function TournamentSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  const post = posts.find((post: { id: number }) => post.id === Number(id));

  const players = playerNames;

  return (
    <main className="flex min-h-svh justify-center">
      <PlayerPicker players={players} />
      <BattleRoyaleSelected />
    </main>
  );
}
