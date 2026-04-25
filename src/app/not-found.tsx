import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="glass-panel rounded-xl p-8 max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-slate-300">
          A página solicitada não foi encontrada no NERDS Portal.
        </p>
        <Link
          href="/research"
          className="inline-flex items-center gap-1 text-cyan-300 font-semibold"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          Voltar ao Research Hub
        </Link>
      </section>
    </main>
  );
}
