import { Instagram, MessageCircle, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/918778484070";
const INSTAGRAM_URL = "https://www.instagram.com/draft__bin/";

const CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 877 848 4070",
    href: WHATSAPP_URL,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@draft__bin",
    href: INSTAGRAM_URL,
  },
];

const TOOLKIT = [
  {
    category: "Video Editing",
    tools: [
      "CapCut",
      "VN Video Editor",
      "InShot",
      "LumaFusion",
      "KineMaster",
      "PowerDirector",
      "DaVinci Resolve",
    ],
  },
  {
    category: "Photo Editing",
    tools: ["Snapseed", "Adobe Lightroom Mobile", "Picsart", "VSCO"],
  },
];

export function AboutSection() {
  const { ref, shown } = useReveal<HTMLElement>(0.15);

  return (
    <section ref={ref} id="about" className="hairline-t">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 md:gap-0 md:py-20">
        {/* About */}
        <div
          className={cn(
            "transition-[transform,opacity] duration-[900ms] md:pr-16",
            shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
        >
          <span className="meta-label">About us</span>
          <h2 className="display mt-4 text-[clamp(1.9rem,5.2vw,3.1rem)] leading-[1.04]">
            Draft Bin is where raw footage meets curiosity, creativity and
            constant learning.
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Built and edited by Sri Hari, Draft Bin is an independent creative
              editing space focused on turning footage, ideas and visual
              concepts into content worth watching.
            </p>
            <p>
              Still in the learning phase. Always experimenting. Always
              improving.
            </p>
          </div>

          <div className="mt-12">
            <span className="meta-label">Editing Toolkit</span>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {TOOLKIT.map(({ category, tools }) => (
                <div key={category}>
                  <h3 className="meta-label mb-3">{category}</h3>
                  <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="display mt-14 max-w-[20ch] text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.04]">
            Learning the tools.
            <br />
            Refining the craft.
            <br />
            Building something worth watching.
          </p>
        </div>

        {/* Get in touch */}
        <div
          className={cn(
            "transition-[transform,opacity] duration-[900ms] md:border-l md:border-hairline md:pl-16",
            shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          style={{
            transitionTimingFunction: "var(--ease-cinematic)",
            transitionDelay: "160ms",
          }}
        >
          <span className="meta-label">Get in touch</span>

          <ul className="mt-5">
            {CONTACTS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="hairline-t">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 py-4 transition-colors duration-300 hover:text-foreground"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-hairline">
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm md:text-base">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    strokeWidth={1.4}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 flex items-center justify-center border border-hairline px-6 py-4 text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Let&apos;s make something worth watching.
          </a>
        </div>
      </div>

      {/* footer bar */}
      <div className="hairline-t">
        <div className="shell flex items-center justify-between py-4">
          <span className="text-sm font-semibold">Draft Bin</span>
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Draft Bin on Instagram"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.4} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Draft Bin on WhatsApp"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
