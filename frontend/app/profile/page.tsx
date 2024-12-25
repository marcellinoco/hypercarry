import { ProfilePreviewCard } from "../components/ProfilePreviewCard";

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
      <p className="absolute left-1/2 top-8 -translate-x-1/2 font-cursive text-lg font-500 text-slate-400/70">
        OpenArena
      </p>
      <ProfilePreviewCard />
    </main>
  );
}
