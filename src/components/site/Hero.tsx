import { useEffect, useRef, useState } from "react";
import reel from "@/assets/videos/draftbin-reel.mp4.asset.json";
import poster from "@/assets/videos/draftbin-poster.jpg.asset.json";
import { cn } from "@/lib/utils";

const LINES = ["We turn", "raw footage", "into stories", "worth watching."];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  // Only play while the hero is on screen — never burn decode off-screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) void el.play().catch(() => {});
  };

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* cinematic plate */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full object-cover transition-[filter,transform] duration-[1600ms]",
            ready ? "scale-100 blur-0" : "scale-[1.04] blur-[2px]",
          )}
          src={reel.url}
          poster={poster.url}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setReady(true)}
          aria-label="Draft Bin showreel"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* content */}
      <div className="relative flex min-h-[100svh] flex-col justify-between pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="shell">
          <p className="meta-label anim-fade" style={{ animationDelay: "120ms" }}>
            Draft Bin © 2026 — Video editing &amp; creative studio
          </p>
        </div>

        <div className="shell">
          <h1 className="display text-[clamp(3.25rem,8.6vw,7.75rem)]" style={{ lineHeight: 0.92 }}>
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="anim-rise block"
                  style={{ animationDelay: `${180 + i * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="shell">
          <div
            className="anim-fade hairline-t grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 pt-5 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-10"
            style={{ animationDelay: "760ms" }}
          >
            <p className="min-w-0 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              An editing studio built on pace, rhythm and restraint — cinematic cuts,
              kinetic type and motion for creators and brands.
            </p>

            <div className="hidden md:block">
              <span className="meta-label">Showreel</span>
              <div className="film-bars mt-3 h-6 w-28 opacity-40" aria-hidden />
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className="shrink-0 group inline-flex items-center gap-3 border border-hairline px-4 py-3 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-foreground hover:text-background"
              aria-pressed={!muted}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "h-2 w-2 border border-current",
                    !muted && "bg-current",
                  )}
                />
              </span>
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-foreground/60" />
      </div>
    </section>
  );
}
