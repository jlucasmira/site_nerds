"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePortalStore } from "@/store/portal-store";

const navItems = [
  { href: "/research", label: "Research", icon: "science" },
  { href: "/publications", label: "Publications", icon: "menu_book" },
  { href: "/code", label: "Code", icon: "terminal" },
  { href: "/members", label: "Members", icon: "groups" },
];

type SideNavProps = {
  mobile?: boolean;
};

export function SideNav({ mobile = false }: SideNavProps) {
  const pathname = usePathname();
  const closeMobileMenu = usePortalStore((state) => state.closeMobileMenu);
  const openSubmitModal = usePortalStore((state) => state.openSubmitModal);

  return (
    <nav
      className={`${mobile ? "w-full" : "hidden w-64 md:flex"} bg-slate-950/80 text-cyan-500 border-r border-cyan-500/20 h-full flex-col pt-16`}
      aria-label="Navegação principal"
    >
      <div className="px-6 pb-6 border-b border-white/5 mb-4">
        <Link href="/" className="block">
          <Image
            src="/assets/brand/Nerds.png"
            alt="NERDS Portal"
            width={140}
            height={40}
            priority
            className="drop-shadow-[0_0_8px_rgba(0,241,254,0.4)]"
          />
        </Link>
        <p className="text-slate-400 text-xs uppercase tracking-wider mt-2">
          Institutional AI Hub
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 py-3 px-6 transition-all ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 rounded-r-full border-l-4 border-cyan-400"
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-6 border-t border-white/5">
        <button
          type="button"
          onClick={openSubmitModal}
          aria-label="Abrir formulário de submissão de repositório"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 font-semibold py-3 rounded-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90"
        >
          <span className="material-symbols-outlined">upload</span>
          Submit Repository
        </button>
      </div>
    </nav>
  );
}