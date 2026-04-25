"use client";

import { useEffect } from "react";
import { SideNav } from "@/components/portal/side-nav";
import { SubmitRepositoryModal } from "@/components/portal/submit-modal";
import { TopBar } from "@/components/portal/top-bar";
import { usePortalStore } from "@/store/portal-store";

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
    <div className="min-h-screen flex overflow-x-hidden">
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

      <main className="flex-1 md:ml-64 pt-24 px-4 md:px-8 pb-16">{children}</main>
      <SubmitRepositoryModal />
    </div>
  );
}
