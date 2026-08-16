import { SectionHeading } from "@/components/site/SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/** Real Draft Bin reel frames. Add projects here as new media lands. */
export const PROJECTS: {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  span: "wide" | "tall";
}[] = [
  {
    id: "01",
    title: "Lightning",
    category: "Short-form edit",
    year: "2026",
    image: "/assets/work/work-01.jpg",
    span: "wide",
  },
  {
    id: "02",
    title: "Echoes",
    category: "Cinematic edit",
    year: "2026",
    image: "/assets/work/work-02.jpg",
    span: "tall",
  },
  {
    id: "03",
    title: "Kinetic Type",
    category: "Motion graphics",
    year: "2026",
    image: "/assets/work/work-03.jpg",
    span: "tall",
  },
];

function ProjectCard({
  project,
  shown,
  delay,
}: {
  project: (typeof PROJECTS)[number];
  shown: boolean;
  delay: number;
}) {
  return (
    <article
      className={cn(
        "group",
        project.span === "wide" && "md:col-span-2",
        "transition-[transform,opacity] duration-[900ms]",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{
        transitionTimingFunction: "var(--ease-cinematic)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative overflow-hidden bg-card">
        <img
          src={project.image}
          alt={`${project.title} — ${project.category} by Draft Bin`}
          loading="lazy"
          className={cn(
            "w-full object-cover transition-[transform,filter] duration-[1200ms]",
            project.span === "wide"
              ? "aspect-[16/9] md:aspect-[21/9]"
              : "aspect-[4/5] md:aspect-[4/5]",
            "grayscale-[0.25] md:group-hover:scale-[1.03] md:group-hover:grayscale-0",
          )}
          style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-background/20 transition-opacity duration-700 md:group-hover:opacity-0" />
      </div>

      <div className="hairline-t mt-4 flex items-start justify-between gap-6 pt-3">
        <div className="min-w-0">
          <h3 className="display text-[clamp(1.5rem,3.4vw,2.5rem)] transition-transform duration-500 md:group-hover:translate-x-2"
            style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
          >
            {project.title}
          </h3>
          <p className="meta-label mt-2">{project.category}</p>
        </div>
        <span className="meta-label shrink-0">{project.year}</span>
      </div>
    </article>
  );
}

export function SelectedWork() {
  const { ref, shown } = useReveal<HTMLElement>(0.08);

  return (
    <section ref={ref} id="work" className="shell py-20 md:py-32">
      <SectionHeading index="04" label="Selected Work" />

      <div className="mt-8 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            shown={shown}
            delay={i * 120}
          />
        ))}
      </div>

      <p className="meta-label mt-12 md:mt-16">{"\n"}</p>
    </section>
  );
}
