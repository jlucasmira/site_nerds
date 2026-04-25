import members from "@/data/members.json";
import metrics from "@/data/metrics.json";
import projects from "@/data/projects.json";
import publications from "@/data/publications.json";
import type { Member, Metric, Project, Publication } from "@/types/domain";

export const allProjects = projects as Project[];
export const allMembers = members as Member[];
export const allMetrics = metrics as Metric[];
export const allPublications = publications as Publication[];

export function filterProjects(query: string): Project[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return allProjects;
  }

  return allProjects.filter((project) => {
    const stack = project.techStack.join(" ").toLowerCase();
    const tags = project.tags.join(" ").toLowerCase();
    return (
      project.title.toLowerCase().includes(normalized) ||
      project.summary.toLowerCase().includes(normalized) ||
      project.leader.toLowerCase().includes(normalized) ||
      stack.includes(normalized) ||
      tags.includes(normalized)
    );
  });
}

export function memberById(id: string): Member | undefined {
  return allMembers.find((member) => member.id === id);
}

export function memberBySlug(slug: string): Member | undefined {
  return allMembers.find((member) => member.slug === slug);
}
