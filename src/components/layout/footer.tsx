"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-4 md:px-8 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-nerds.png"
            alt="NERDS"
            width={80}
            height={22}
            priority
            className="w-auto h-6 md:h-7 drop-shadow-[0_0_6px_rgba(0,241,254,0.3)]"
          />
        </div>
        <div className="text-slate-500 text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} NERDS UFC. Todos os direitos reservados.</p>
          <p className="text-xs mt-1">
            <Link href="https://github.com/jlucasmira/site_nerds" target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              Licensed under MIT
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}