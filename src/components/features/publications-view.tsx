"use client";

import { useMemo, useState } from "react";
import { allPublications, memberById } from "@/lib/content";

export function PublicationsView() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return allPublications;
    }
    return allPublications.filter((publication) => {
      const indexBlob = [
        publication.title,
        publication.venue,
        publication.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return indexBlob.includes(normalized);
    });
  }, [query]);

  return (
    <section className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-4xl font-bold">Publications</h1>
      <p className="text-slate-400">
        Autoridade acadêmica do grupo em IA, visão computacional e sistemas
        inteligentes.
      </p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-full bg-slate-900/70 border border-white/10 px-4 py-2"
        placeholder="Filtrar publicações por título, venue ou palavra-chave"
      />
      <div className="space-y-4">
        {filtered.map((publication) => (
          <article key={publication.id} className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{publication.title}</h2>
            <p className="text-slate-300 text-sm mb-3">
              {publication.venue} ({publication.year})
            </p>
            <p className="text-slate-400 text-sm mb-4">
              {publication.authorIds
                .map((authorId) => memberById(authorId)?.name ?? "Autor")
                .join(", ")}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {publication.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs bg-slate-900/70 border border-white/10 rounded-full px-2 py-1"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
            >
              <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
              Abrir PDF
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}