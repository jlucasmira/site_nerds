import { z } from "zod";

const stripUnsafe = (value: string) =>
  value.replace(/[<>`"'\\]/g, "").trim().slice(0, 400);

export const repositorySubmissionSchema = z.object({
  title: z.string().min(4).max(100).transform(stripUnsafe),
  repositoryUrl: z.url().max(240).transform(stripUnsafe),
  summary: z.string().min(15).max(400).transform(stripUnsafe),
  stack: z.string().min(2).max(120).transform(stripUnsafe),
  owner: z.string().min(3).max(80).transform(stripUnsafe),
});

export type RepositorySubmissionInput = z.input<typeof repositorySubmissionSchema>;
export type RepositorySubmissionOutput = z.output<typeof repositorySubmissionSchema>;
