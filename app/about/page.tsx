import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import VisionCards from "@/components/about/VisionCards";
import MissionSection from "@/components/about/MissionSection";
import TeamSection from "@/components/about/TeamSection";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-500">
      <Header />
      <AboutHero />
      <VisionCards />
      <MissionSection />
      <TeamSection />
      <Footer variant="primary" />
    </div>
  );
}
