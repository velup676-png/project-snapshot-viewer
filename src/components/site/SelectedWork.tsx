import { useEffect, useState } from "react";

const PROJECTS = [
  { id: "01", title: "Lightning", category: "Short-form edit", year: "2026", image: "/assets/work/work-01.jpg" },
  { id: "02", title: "Echoes", category: "Cinematic edit", year: "2026", image: "/assets/work/work-02.jpg" },
  { id: "03", title: "Kinetic Type", category: "Motion graphics", year: "2026", image: "/assets/work/work-03.jpg" },
];

export function SelectedWork() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % PROJECTS.length), 1500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-background py-4 md:py-8">
      <div className="relative mx-auto h-[340px] w-full max-w-[1320px] overflow-hidden border-y border-hairline bg-background sm:h-[420px] md:h-[560px]">
        <div className="absolute left-7 top-7 z-20 flex items-center gap-8 text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground/70 md:left-12 md:top-10 md:text-[10px]">
          <span className="grid h-5 w-5 grid-cols-2 gap-[3px]" aria-hidden><i className="block bg-foreground" /><i /><i /><i className="block bg-foreground" /></span>
          <span>Draft Bin</span>
        </div>
        <div className="absolute right-7 top-7 z-20 flex gap-6 text-[9px] font-semibold uppercase tracking-[0.08em] text-foreground/60 md:right-12 md:top-10 md:text-[10px]">
          {PROJECTS.map((project, index) => <button key={project.id} type="button" onClick={() => setActive(index)} className="transition-colors duration-300 hover:text-foreground" aria-label={`Show work ${index + 1}`} aria-current={active === index ? "true" : undefined}>Page #{index + 1}</button>)}
        </div>
        {PROJECTS.map((project, index) => {
          const isActive = index === active;
          return (
            <article key={project.id} className="absolute inset-0" style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(3%)", pointerEvents: isActive ? "auto" : "none", transition: "opacity 650ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)" }} aria-hidden={!isActive}>
              <div className="absolute inset-x-0 top-1/2 h-px bg-hairline" /><div className="absolute inset-y-0 left-1/2 hidden w-px bg-hairline md:block" />
              <div className="absolute left-[7%] top-[36%] z-10 md:left-[10%] md:top-[34%]">
                <h2 className="display text-[clamp(2.7rem,6vw,6rem)] leading-[0.84] tracking-[-0.055em]">{project.title}</h2>
                <p className="mt-3 text-[9px] tracking-wide text-muted-foreground md:text-[10px]">{project.category}</p>
                <p className="mt-1 text-[9px] tracking-wide text-muted-foreground/70 md:text-[10px]">Draft Bin — {project.year}</p>
                <button type="button" className="mt-8 inline-flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.08em] text-foreground/80 md:mt-10 md:text-[10px]" onClick={() => setActive((index + 1) % PROJECTS.length)}>Go to Page #{(index + 1) % PROJECTS.length + 1}<span className="block h-px w-8 bg-current" aria-hidden /></button>
              </div>
              <div className="absolute left-1/2 top-1/2 h-[58%] w-[31%] min-w-[150px] max-w-[370px] -translate-x-1/2 -translate-y-[43%] overflow-hidden bg-card md:h-[62%]">
                <img src={project.image} alt={`${project.title} — ${project.category}`} className="h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"} /><div className="absolute inset-0 bg-background/15" />
              </div>
              <div className="absolute right-[9%] top-[30%] hidden max-w-[120px] text-[10px] leading-relaxed text-muted-foreground md:block"><p>Work #{index + 1}</p><p>Simple</p><p>Interaction</p></div>
              <div className="absolute bottom-7 right-7 text-right md:bottom-10 md:right-12"><span className="display text-[clamp(1.3rem,2.2vw,2rem)] text-foreground/85">(Page #{index + 1})</span></div>
            </article>
          );
        })}
        <div className="absolute bottom-0 left-0 z-30 flex h-[2px] w-full bg-foreground/10">
          {PROJECTS.map((project, index) => <span key={project.id} className="h-full flex-1 origin-left bg-foreground/70" style={{ transform: index === active ? "scaleX(1)" : "scaleX(0)", transition: index === active ? "transform 1500ms linear" : "transform 300ms ease" }} />)}
        </div>
      </div>
    </section>
  );
}
