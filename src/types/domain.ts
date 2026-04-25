export type ProjectStatus = "PHASE_1" | "PHASE_2" | "PHASE_3" | "FIELD_TEST";

export type Project = {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  techStack: string[];
  leader: string;
  memberCount: number;
  repoUrl: string;
  documentationUrl?: string;
  tags: string[];
};

export type Member = {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  expertise: string[];
  github?: string;
  lattes?: string;
};

export type Metric = {
  id: string;
  label: string;
  value: number | string;
  trend?: string;
  unit?: string;
  progress?: number;
};

export type Publication = {
  id: string;
  title: string;
  authorIds: string[];
  venue: string;
  year: number;
  pdfUrl: string;
  keywords: string[];
};

export type RepositorySubmission = {
  title: string;
  repositoryUrl: string;
  summary: string;
  stack: string;
  owner: string;
};
