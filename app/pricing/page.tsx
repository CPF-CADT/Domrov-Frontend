import Header from "@/components/Header";
import PricingHero from "@/components/pricing/PricingHero";
import PricingGrid from "@/components/pricing/PricingGrid";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-500">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <PricingHero />
        <PricingGrid />
      </main>
    </div>
  );
}
