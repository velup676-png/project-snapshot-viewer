import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

/**
 * Sections are declared here once. Later phases add their own entries
 * without touching the navigation markup.
 */
export const NAV_ITEMS: { label: string; href: string; index: string }[] = [
  { label: "Studio", href: "#studio", index: "\n" },
  { label: "Services", href: "#services", index: "\n" },
  { label: "Work", href: "#work", index: "\n" },
  { label: "About", href: "#about", index: "\n" },

];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-hairline bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
    >
      <div className="shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center md:h-20">
        <a href="#top" className="flex min-w-0 items-center" aria-label="Draft Bin — home">
          <Logo withWordmark />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group inline-flex items-baseline gap-2 text-sm tracking-tight text-foreground/70 transition-colors duration-300 hover:text-foreground"
            >
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-meta">
                {item.index}
              </span>
              <span className="relative">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </a>
          ))}
          <span className="meta-label hidden lg:inline">{"\n"}</span>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="shrink-0 -mr-1 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-transform duration-300",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-transform duration-300",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-t border-hairline bg-background transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0",
        )}
        style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
      >
        <nav className="shell flex flex-col py-4" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-hairline py-5 last:border-b-0"
            >
              <span className="display text-4xl">{item.label}</span>
              <span className="meta-label">{item.index}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
