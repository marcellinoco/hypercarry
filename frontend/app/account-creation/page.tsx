import NewUserForm from "../components/NewUserForm";

export default async function AccountCreationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
      <p className="font-cursive absolute left-1/2 top-8 -translate-x-1/2 text-lg font-500 text-slate-400/70">
        OpenArena
      </p>
      <NewUserForm />
    </main>
  );
}
