import NewUserForm from "../components/NewUserForm";

export default async function AccountCreationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
      <NewUserForm />
    </main>
  );
}
