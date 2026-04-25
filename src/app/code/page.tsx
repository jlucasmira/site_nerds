import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { allProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Code Repo",
  description:
    "Galeria de repositórios GitHub dos projetos do NERDS para colaboração open source.",
  alternates: {
    canonical: "/code",
  },
};

export default function CodePage() {
  return (
    <PortalShell>
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Code Repository</h1>
        <p className="text-slate-400">
          Open source, colaboração e transferência tecnológica em um catálogo único.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allProjects.map((project) => (
            <article key={project.id} className="glass-panel rounded-xl p-5">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-sm text-slate-400 my-2">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Acessar repositório
              </a>
            </article>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
