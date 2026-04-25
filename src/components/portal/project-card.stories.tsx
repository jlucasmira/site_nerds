import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProjectCard } from "./project-card";

const meta = {
  title: "Portal/ProjectCard",
  component: ProjectCard,
  args: {
    project: {
      id: "demo",
      title: "Quantum-Neural Interface Modeling",
      summary:
        "Developing hybrid models for predictive analytics in complex systems.",
      status: "PHASE_3",
      techStack: ["PyTorch", "Qiskit", "Data Vis"],
      leader: "Dr. Silva",
      memberCount: 5,
      repoUrl: "https://github.com/jlucasmira/site_nerds",
      tags: ["AI", "Quantum"],
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
