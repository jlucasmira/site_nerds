import type { Metadata } from "next";
import { PortfolioPage } from "@/components/ui/starfall-portfolio-landing";

export const metadata: Metadata = {
  title: "NERDS UFC - Núcleo de Engenharia, Robótica e Desenvolvimento de Software",
  description:
    "Inovação tecnológica e pesquisa de ponta na UFC. Explore nossos projetos de IA, visão computacional, robótica e desenvolvimento de software.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <PortfolioPage />;
}
