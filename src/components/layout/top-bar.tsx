"use client";

import { usePortalStore } from "@/store/portal-store";

export function TopBar() {
  const searchQuery = usePortalStore((state) => state.searchQuery);
  const setSearchQuery = usePortalStore((state) => state.setSearchQuery);
  const toggleMobileMenu = usePortalStore((state) => state.toggleMobileMenu);
  const isMobileSearchOpen = usePortalStore((state) => state.isMobileSearchOpen);
  const toggleMobileSearch = usePortalStore((state) => state.toggleMobileSearch);
  const closeMobileSearch = usePortalStore((state) => state.closeMobileSearch);
  const theme = usePortalStore((state) => state.theme);
  const setTheme = usePortalStore((state) => state.setTheme);

  return (
    <header className="bg-slate-950/50 backdrop-blur-lg border-b border-white/10 px-4 md:px-6 py-3 fixed top-0 right-0 left-0 md:left-64 z-40 h-12 md:h-12">
      <div className="flex justify-between items-center h-full gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden text-slate-300"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="text-sm font-semibold tracking-widest text-slate-400 hidden md:inline-block">
            HUB_Dashboard // SYS.ONLINE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleMobileSearch}
            className="sm:hidden text-slate-300"
            aria-label="Abrir busca"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="bg-surface-container-highest/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 w-64 transition-all"
              placeholder="Buscar projetos..."
              type="text"
              aria-label="Buscar projetos"
            />
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-slate-300"
            aria-label="Alternar tema"
          >
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
        </div>
      </div>
      {isMobileSearchOpen ? (
        <div className="sm:hidden mt-3 flex items-center gap-2">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex-1 bg-surface-container-highest/50 border border-white/10 rounded-full py-1.5 px-4 text-sm text-white focus:outline-none focus:border-cyan-400"
            placeholder="Buscar projetos..."
            type="text"
            aria-label="Buscar projetos no mobile"
          />
          <button
            type="button"
            onClick={closeMobileSearch}
            className="text-slate-300"
            aria-label="Fechar busca"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      ) : null}
    </header>
  );
}