import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildHomeJsonLdGraph } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeJsonLdGraph()} />
      <main id="main" className="min-w-0 flex-1 overflow-x-clip" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <HowWeWork />
        <Reviews />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
