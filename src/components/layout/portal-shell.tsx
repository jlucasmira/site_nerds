"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Footer } from "@/components/layout/footer";
import { SideNav } from "@/components/layout/side-nav";
import { TopBar } from "@/components/layout/top-bar";
import { usePortalStore } from "@/store/portal-store";

const SubmitRepositoryModal = dynamic(
  () => import("@/components/features/submit-repository-modal").then((mod) => mod.SubmitRepositoryModal),
  {
    ssr: false,
  },
);

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: false,
});

type PortalShellProps = {
  children: React.ReactNode;
};

export function PortalShell({ children }: PortalShellProps) {
  const theme = usePortalStore((state) => state.theme);
  const isMobileMenuOpen = usePortalStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = usePortalStore((state) => state.closeMobileMenu);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SideNav />
      <TopBar />

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60" onClick={closeMobileMenu}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-slate-950/95"
            onClick={(event) => event.stopPropagation()}
          >
            <SideNav mobile />
          </div>
        </div>
      ) : null}

      <main id="main-content" className="flex-1 md:ml-64 pt-12 px-4 md:px-8 pb-16">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
      <SubmitRepositoryModal />
    </div>
  );
}