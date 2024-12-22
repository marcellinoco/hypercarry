import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <Link href="/account-creation">Create account</Link>
    </main>
  );
}
