"use client";

import { MetricCard } from "@/components/features/metric-card";
import { ProjectCard } from "@/components/features/project-card";
import { allMetrics, filterProjects } from "@/lib/content";
import { usePortalStore } from "@/store/portal-store";

export function ResearchHubView() {
  const searchQuery = usePortalStore((state) => state.searchQuery);
  const projects = filterProjects(searchQuery);

  return (
    <div className="max-w-[1600px] mx-auto space-y-12">
      <section>
        <h1 className="text-5xl font-extrabold text-white mb-2">
          Research <span className="text-gradient">Hub</span>
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Centralized node for computational intelligence, ongoing institutional
          projects, and technological extension metrics.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {allMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b border-white/10 pb-2">
          Active Projects
        </h2>
        {projects.length === 0 ? (
          <div className="glass-panel rounded-xl p-6 text-slate-300">
            Nenhum projeto encontrado para o filtro atual.
          </div>
        ) : (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        )}
      </section>
    </div>
  );
}