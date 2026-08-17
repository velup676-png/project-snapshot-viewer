import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { AfterHeroMouseMove } from "@/components/site/AfterHeroMouseMove";
import { StudioStatement } from "@/components/site/StudioStatement";
import { ServiceList } from "@/components/site/ServiceList";
import { AboutSection } from "@/components/site/AboutSection";
import { SelectedWork } from "@/components/site/SelectedWork";

const TITLE = "Draft Bin — Video Editing Studio by Srihari";
const DESCRIPTION =
  "Draft Bin is a cinematic video editing and creative studio founded by Srihari, creating video edits, motion graphics and visual content for creators, brands and businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://draftbinedits.vercel.app/" },
      { property: "og:image", content: "https://draftbinedits.vercel.app/assets/brand/draftbin-logo.png" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://draftbinedits.vercel.app/assets/brand/draftbin-logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://draftbinedits.vercel.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <AfterHeroMouseMove />
        <StudioStatement />
        <ServiceList />
        <SelectedWork />
        <AboutSection />
        {/* Phase 3+ sections mount here: SelectedWork, Portfolio, Elsewhere,
            ContactCTA, Footer. */}
      </main>
    </>
  );
}
