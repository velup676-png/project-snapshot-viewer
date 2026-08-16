import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { StudioStatement } from "@/components/site/StudioStatement";
import { ServiceList } from "@/components/site/ServiceList";
import { AboutSection } from "@/components/site/AboutSection";
import { SelectedWork } from "@/components/site/SelectedWork";


const TITLE = "Draft Bin — Video Editing & Creative Studio";
const DESCRIPTION =
  "Draft Bin is a creative editing studio creating video edits, motion graphics, thumbnails and visual content for creators, brands and businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
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

