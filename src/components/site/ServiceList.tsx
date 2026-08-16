import { SectionHeading } from "@/components/site/SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/** Single source of truth for services — edit this array only. */
export const SERVICES: { index: string; title: string; note: string }[] = [
  { index: "01", title: "Video Editing", note: "Narrative cuts, pacing, sound" },
  { index: "02", title: "Short-Form / Reels", note: "Vertical edits built to retain" },
  { index: "03", title: "YouTube Editing", note: "Long-form structure & rhythm" },
  { index: "04", title: "Motion Graphics", note: "Kinetic type, titles, overlays" },
  { index: "05", title: "Thumbnail Design", note: "Frames that earn the click" },
  { index: "06", title: "Creative Graphics", note: "Posters, key art, brand visuals" },
];

function ServiceItem({
  service,
  shown,
  delay,
}: {
  service: (typeof SERVICES)[number];
  shown: boolean;
  delay: number;
}) {
  return (
    <li
      className={cn(
        "group border-b border-hairline transition-[transform,opacity] duration-700",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      style={{
        transitionTimingFunction: "var(--ease-cinematic)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 md:gap-8 md:py-8">
        <span className="meta-label">{service.index}</span>

        <div className="min-w-0">
          <h3 className="display text-[clamp(1.75rem,4.6vw,3.5rem)] transition-transform duration-500 md:group-hover:translate-x-3"
            style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
          >
            {service.title}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground md:text-sm md:opacity-60 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
            {service.note}
          </p>
        </div>

        <span
          aria-hidden
          className="text-lg text-meta transition-[transform,opacity,color] duration-500 md:opacity-0 md:-translate-x-2 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-hover:text-foreground"
          style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
        >
          ↗
        </span>
      </div>
    </li>
  );
}

export function ServiceList() {
  const { ref, shown } = useReveal<HTMLElement>(0.1);

  return (
    <section ref={ref} id="services" className="shell py-20 md:py-32">
      <SectionHeading index="02" label="Services" />
      <ul className="mt-8 border-t border-hairline md:mt-12">
        {SERVICES.map((service, i) => (
          <ServiceItem
            key={service.index}
            service={service}
            shown={shown}
            delay={i * 70}
          />
        ))}
      </ul>
    </section>
  );
}
