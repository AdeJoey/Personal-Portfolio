import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ServicesSection } from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";
import { AnimatedCursor } from "@/components/AnimatedCursor";

export default function Home() {
  return (
    <>
      <AnimatedCursor />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
       
        <FeaturedProjects />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
