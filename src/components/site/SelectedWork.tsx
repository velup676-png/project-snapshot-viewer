import { useEffect, useRef } from "react";
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
  delay,
}: {
  project: (typeof PROJECTS)[number];
  delay: number;
}) {
  const { ref, shown } = useReveal<HTMLElement>(0.18);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  /* Very gentle scroll parallax on the image inside its fixed frame. */
  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        (window.innerHeight / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      img.style.setProperty("--parallax", `${(clamped * 2.4).toFixed(2)}%`);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const ease = "var(--ease-cinematic)";

  return (
    <article
      ref={ref}
      className={cn("group", project.span === "wide" && "md:col-span-2")}
    >
      <div
        ref={frameRef}
        className="relative overflow-hidden bg-card"
        style={{
          clipPath: shown ? "inset(0% 0 0 0)" : "inset(14% 0 0 0)",
          opacity: shown ? 1 : 0,
          transition: `clip-path 1400ms ${ease} ${delay}ms, opacity 1100ms ${ease} ${delay}ms`,
        }}
      >
        <img
          ref={imgRef}
          src={project.image}
          alt={`${project.title} — ${project.category} by Draft Bin`}
          loading="lazy"
          className={cn(
            "w-full object-cover",
            project.span === "wide"
              ? "aspect-[16/9] md:aspect-[21/9]"
              : "aspect-[4/5] md:aspect-[4/5]",
            "grayscale-[0.25] md:group-hover:grayscale-0",
          )}
          style={{
            transform: `scale(${shown ? 1.06 : 1.14}) translate3d(0, var(--parallax, 0%), 0)`,
            transition: `transform 1800ms ${ease} ${delay}ms, filter 1200ms ${ease}`,
            willChange: "transform",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-background/20 transition-opacity duration-700 md:group-hover:opacity-0"
        />
      </div>

      <div
        className="hairline-t mt-4 flex items-start justify-between gap-6 pt-3"
        style={{
          clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 1200ms ${ease} ${delay + 220}ms`,
        }}
      >
        <div className="min-w-0">
          <h3
            className="display text-[clamp(1.5rem,3.4vw,2.5rem)] md:group-hover:translate-x-2"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(0.5rem)",
              transition: `opacity 900ms ${ease} ${delay + 300}ms, transform 900ms ${ease} ${delay + 300}ms`,
            }}
          >
            {project.title}
          </h3>
          <p
            className="meta-label mt-2"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(0.375rem)",
              transition: `opacity 900ms ${ease} ${delay + 420}ms, transform 900ms ${ease} ${delay + 420}ms`,
            }}
          >
            {project.category}
          </p>
        </div>
        <span
          className="meta-label shrink-0"
          style={{
            opacity: shown ? 1 : 0,
            transition: `opacity 900ms ${ease} ${delay + 520}ms`,
          }}
        >
          {project.year}
        </span>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="shell py-20 md:py-32">
      <SectionHeading index="04" label="Selected Work" />

      <div className="mt-8 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 140} />
        ))}
      </div>

      <p className="meta-label mt-12 md:mt-16">{"\n"}</p>
    </section>
  );
}
