import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { ResearchHubView } from "@/components/portal/research-hub-view";

export const metadata: Metadata = {
  title: "Research Hub",
  description:
    "Dashboard principal com métricas institucionais e projetos ativos do grupo NERDS.",
};

export default function ResearchPage() {
  return (
    <PortalShell>
      <ResearchHubView />
    </PortalShell>
  );
}
