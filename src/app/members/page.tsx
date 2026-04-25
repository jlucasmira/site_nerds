import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { allMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Perfis dos pesquisadores do NERDS, com foco em trajetória e capital humano.",
};

export default function MembersPage() {
  return (
    <PortalShell>
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Member Profiles</h1>
        <p className="text-slate-400">
          Conheça o time de pesquisa por trás dos projetos e publicações.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allMembers.map((member) => (
            <article key={member.id} className="glass-panel rounded-xl p-5">
              <div className="flex gap-4 items-start">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border border-white/20"
                />
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">{member.name}</h2>
                  <p className="text-cyan-300 text-sm">{member.role}</p>
                  <p className="text-sm text-slate-300">{member.bio}</p>
                  <Link
                    href={`/members/${member.slug}`}
                    className="inline-flex items-center gap-1 text-cyan-300"
                  >
                    Ver perfil
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
