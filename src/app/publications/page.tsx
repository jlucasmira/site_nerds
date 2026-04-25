import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LoadingSkeleton } from "@/components/portal/loading-skeleton";
import { PortalShell } from "@/components/portal/portal-shell";

const PublicationsView = dynamic(
  () => import("@/components/portal/publications-view").then((mod) => mod.PublicationsView),
  { loading: () => <LoadingSkeleton /> },
);

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Lista filtrável de publicações acadêmicas do NERDS com acesso rápido a PDF.",
  alternates: {
    canonical: "/publications",
  },
};

export default function PublicationsPage() {
  return (
    <PortalShell>
      <PublicationsView />
    </PortalShell>
  );
}
