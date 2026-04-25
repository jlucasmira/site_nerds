import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { PortalShell } from "@/components/layout/portal-shell";

const PublicationsView = dynamic(
  () => import("@/components/features/publications-view").then((mod) => mod.PublicationsView),
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
