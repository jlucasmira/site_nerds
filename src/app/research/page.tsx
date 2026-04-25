import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { PortalShell } from "@/components/layout/portal-shell";

const ResearchHubView = dynamic(
  () => import("@/components/features/research-hub-view").then((mod) => mod.ResearchHubView),
  { loading: () => <LoadingSkeleton /> },
);

export const metadata: Metadata = {
  title: "Research Hub",
  description:
    "Dashboard principal com métricas institucionais e projetos ativos do grupo NERDS.",
  alternates: {
    canonical: "/research",
  },
};

export default function ResearchPage() {
  return (
    <PortalShell>
      <ResearchHubView />
    </PortalShell>
  );
}
