import PricingHero from "@/components/pricing/PricingHero";
import PricingGrid from "@/components/pricing/PricingGrid";

export default function PricingPage() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-20">
      <PricingHero />
      <PricingGrid />
    </main>
  );
}
