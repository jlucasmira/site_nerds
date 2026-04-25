import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { memberBySlug } from "@/lib/content";

type MemberPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = memberBySlug(slug);

  if (!member) {
    return { title: "Perfil não encontrado" };
  }

  return {
    title: member.name,
    description: `Perfil acadêmico de ${member.name} no portal NERDS.`,
  };
}

export default async function MemberDetailPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = memberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <PortalShell>
      <section className="max-w-3xl mx-auto space-y-6">
        <Link href="/members" className="text-cyan-300 inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Voltar para membros
        </Link>
        <article className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src={member.avatar}
              alt={member.name}
              width={88}
              height={88}
              className="rounded-full border border-white/20"
            />
            <div>
              <h1 className="text-3xl font-bold">{member.name}</h1>
              <p className="text-cyan-300">{member.role}</p>
            </div>
          </div>
          <p className="text-slate-300">{member.bio}</p>
          <div className="flex flex-wrap gap-2">
            {member.expertise.map((item) => (
              <span
                key={item}
                className="text-xs px-2 py-1 rounded-full bg-slate-900/70 border border-white/10"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-sm">
            {member.github ? (
              <a href={member.github} target="_blank" rel="noreferrer" className="text-cyan-300">
                GitHub
              </a>
            ) : null}
            {member.lattes ? (
              <a href={member.lattes} target="_blank" rel="noreferrer" className="text-cyan-300">
                Currículo Lattes
              </a>
            ) : null}
          </div>
        </article>
      </section>
    </PortalShell>
  );
}
