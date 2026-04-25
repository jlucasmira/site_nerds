"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="glass-panel rounded-xl p-8 max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">Erro inesperado</h1>
        <p className="text-slate-300">
          Ocorreu uma falha ao carregar esta página. Tente novamente ou volte para o painel.
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
          >
            Tentar novamente
          </button>
          <Link
            href="/research"
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 border border-white/10"
          >
            Ir para Research
          </Link>
        </div>
      </section>
    </main>
  );
}
