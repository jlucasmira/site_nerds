import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nerds-portal.vercel.app"),
  title: {
    default: "NERDS Portal",
    template: "%s | NERDS Portal",
  },
  description:
    "Portal institucional para projetos, publicações e membros do grupo NERDS.",
  keywords: [
    "NERDS",
    "pesquisa",
    "IA",
    "publicações",
    "universidade",
    "open source",
  ],
  openGraph: {
    title: "NERDS Portal",
    description:
      "Hub acadêmico para visualização de projetos, publicações e métricas de pesquisa.",
    type: "website",
    url: "/",
    siteName: "NERDS Portal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
