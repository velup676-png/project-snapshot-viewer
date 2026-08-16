import { SectionHeading } from "@/components/site/SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { ref, shown } = useReveal<HTMLElement>(0.15);

  return (
    <section ref={ref} id="about" className="shell py-20 md:py-32">
      <SectionHeading index="03" label="About" />

      <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] md:gap-16">
        <h2 className="display text-[clamp(3.5rem,12vw,9rem)]">
          <span className="block overflow-hidden">
            <span
              className={cn(
                "block transition-[transform,opacity] duration-[900ms]",
                shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
              )}
              style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
            >
              Draft Bin
            </span>
          </span>
        </h2>

        <div
          className={cn(
            "space-y-5 self-end transition-[transform,opacity] duration-[900ms]",
            shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          style={{
            transitionTimingFunction: "var(--ease-cinematic)",
            transitionDelay: "180ms",
          }}
        >
          <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
            Draft Bin is an editing studio working across video, motion and design.
            We take raw footage, rough ideas and half-formed concepts and shape them
            into finished pieces with a clear rhythm and point of view.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            The approach is simple: understand the intent, cut away everything that
            doesn't serve it, then obsess over pacing, sound and frame. The output
            ranges from short-form edits and long-form YouTube work to motion
            graphics, thumbnails and creative visuals.
          </p>
          <p className="meta-label">Placeholder copy — easy to replace</p>
        </div>
      </div>
    </section>
  );
}
