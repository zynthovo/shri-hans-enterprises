import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { TeamAvatar } from "@/components/TeamAvatar";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function Team() {
  const { team } = await getDictionary(await getLocale());

  return (
    <section id="team" className="bg-surface-alt py-20">
      <div className="site-container px-4 sm:px-0">
        <SectionTitle
          eyebrow={team.eyebrow}
          title={team.title}
          description={team.description}
        />
        <Reveal
          stagger={0.15}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.members.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl bg-surface p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)]"
            >
              <TeamAvatar photo={m.photo} name={m.name} initials={m.initials} />
              <h4 className="mt-5 text-xl font-semibold text-heading">{m.name}</h4>
              <span className="text-sm font-medium text-brand">{m.role}</span>
              <p className="mt-3 text-sm text-muted">{m.bio}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
