import { describe, expect, it } from "vitest";
import { repositorySubmissionSchema } from "./validation";

describe("repositorySubmissionSchema", () => {
  it("accepts valid payload", () => {
    const parsed = repositorySubmissionSchema.safeParse({
      title: "NERDS AI Project",
      repositoryUrl: "https://github.com/jlucasmira/site_nerds",
      summary: "Projeto de pesquisa para validação de arquitetura de portal.",
      stack: "Next.js, Tailwind, Zod",
      owner: "Equipe NERDS",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid repository URL", () => {
    const parsed = repositorySubmissionSchema.safeParse({
      title: "Projeto inválido",
      repositoryUrl: "github.com/no-protocol",
      summary: "Resumo mínimo para validar payload malformado.",
      stack: "Next.js",
      owner: "Nerds",
    });

    expect(parsed.success).toBe(false);
  });
});
