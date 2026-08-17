import { SectionHeading } from "@/components/site/SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const WORDS =
  "Draft Bin is a creative editing studio turning footage, ideas and visual concepts into content built to be watched.".split(
    " ",
  );

export function StudioStatement() {
  const { ref, shown } = useReveal<HTMLElement>(0.15);

  return (
    <section ref={ref} id="studio" className="shell py-24 md:py-36">
      <SectionHeading index="01" label="Studio" />

      <h2 className="display mt-10 max-w-[22ch] leading-[0.80] text-[clamp(2.25rem,6.2vw,5.5rem)] md:mt-16">
        {WORDS.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span
              className={cn(
                "inline-block transition-[transform,opacity] duration-[1500ms]",
                shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
              )}
              style={{
                transitionTimingFunction: "var(--ease-cinematic)",
                transitionDelay: `${i * 55}ms`,
              }}
            >
              {word}
              {"\u00A0"}
            </span>
          </span>
        ))}
      </h2>

      <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="film-bars h-6 w-full max-w-md opacity-25" aria-hidden />
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground transition-opacity duration-1000 md:text-base",
            shown ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "420ms" }}
        >
          {"\n"}
        </p>
      </div>
    </section>
  );
}
