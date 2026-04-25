import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { PublicationsView } from "@/components/portal/publications-view";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Lista filtrável de publicações acadêmicas do NERDS com acesso rápido a PDF.",
};

export default function PublicationsPage() {
  return (
    <PortalShell>
      <PublicationsView />
    </PortalShell>
  );
}
