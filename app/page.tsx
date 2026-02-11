import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoreFeaturesSection from "@/components/landing/CoreFeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LandingCTA from "@/components/landing/LandingCTA";
import LandingHero from "@/components/landing/LandingHero";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-500">
      <Header />

      <main>
        <LandingHero />
        <ProblemSolutionSection />
        <CoreFeaturesSection />
        <HowItWorksSection />
        <LandingCTA />
      </main>

      <Footer />
    </div>
  );
}
