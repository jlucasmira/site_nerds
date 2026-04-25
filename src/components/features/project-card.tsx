"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/domain";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-panel p-6 rounded-xl border border-transparent hover:border-cyan-500/30"
    >
      <div className="flex justify-between items-start mb-4 gap-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <p className="text-sm text-slate-400">{project.summary}</p>
        </div>
        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20 font-bold tracking-wider">
          {project.status.replace("_", " ")}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-surface-container-highest rounded text-xs text-slate-300 border border-white/5"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-slate-400 text-sm"
            aria-hidden="true"
          >
            groups
          </span>
          <span className="text-sm text-slate-400">
            Led by {project.leader} + {project.memberCount - 1} members
          </span>
        </div>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir repositório do projeto ${project.title}`}
          className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 flex items-center gap-1"
        >
          View Repository{" "}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_forward
          </span>
        </a>
      </div>
    </motion.article>
  );
}